import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  Container,
  Header,
  CardGrid,
  Card,
  ActionRow,
  FormGroup,
  PointRow,
  AddBtn,
  SaveBtn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseBtn,
  UploadHint,
  PreviewMedia,
  ActionButtons,
  EditBtn,
  DeleteBtn,
} from "./style";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-sections`;

/* ================= TYPES ================= */

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface HomeSection {
  _id?: string;
  title: string;
  description: string;
  points: string[];
  media: MediaItem[];
  isActive?: boolean;
}

/* ================= COMPONENT ================= */

const HomeSectionAdmin = () => {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<HomeSection>({
    title: "",
    description: "",
    points: [],
    media: [],
  });

  /* ===== VIDEO STATE ===== */

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({});

  /* ================= EFFECTS ================= */

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* ================= API CALLS ================= */

  const fetchSections = async () => {
    try {
      const res = await axios.get(API_URL);
      setSections(res.data?.result || res.data?.data || []);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  /* ================= FORM ================= */

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      points: [],
      media: [],
    });
    setEditingId(null);
  };

  /* ================= FILE UPLOAD ================= */

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const form = new FormData();
    form.append("file", file);

    setUploading(true);

    try {
      const res = await axios.post(`${API_URL}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileType: "image" | "video" = file.type.startsWith("video")
        ? "video"
        : "image";

      const uploadedUrl = res.data?.result?.url;

      if (!uploadedUrl) {
        alert("Invalid upload response");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, { type: fileType, url: uploadedUrl }],
      }));
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  /* ================= VIDEO CONTROLS ================= */

  const togglePlay = (id: string) => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;

      if (key === id) {
        if (video.paused) {
          video.play();
          setPlayingId(id);
        } else {
          video.pause();
          setPlayingId(null);
        }
      } else {
        video.pause();
      }
    });
  };

  const toggleMute = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    const nextMuted = !(mutedMap[id] ?? true);
    video.muted = nextMuted;

    setMutedMap((prev) => ({
      ...prev,
      [id]: nextMuted,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      formData.media.length === 0
    ) {
      alert("Title, description and media are required");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      setOpen(false);
      resetForm();
      fetchSections();
    } catch {
      alert("Save failed");
    }
  };

  /* ================= RENDER ================= */

  return (
    <Container>
      <Header>
        <h2>Home Sections</h2>
        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          + Add Section
        </button>
      </Header>

      <CardGrid>
        {sections.map((item) => (
          <Card key={item._id}>
            {item.media?.length > 0 &&
              (item.media[0].type === "image" ? (
                <img src={item.media[0].url} alt="" />
              ) : (
                <div style={{ position: "relative" }}>
                  <video
                    ref={(el) => {
                      videoRefs.current[item._id!] = el;
                    }}
                    src={item.media[0].url}
                    muted={mutedMap[item._id!] ?? true}
                    style={{
                      width: "100%",
                      borderRadius: 14,
                      maxHeight: 220,
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <button
                      onClick={() => togglePlay(item._id!)}
                      style={controlBtn}
                    >
                      {playingId === item._id ? "⏸" : "▶"}
                    </button>

                    <button
                      onClick={() => toggleMute(item._id!)}
                      style={controlBtn}
                    >
                      {(mutedMap[item._id!] ?? true) ? "🔇" : "🔊"}
                    </button>
                  </div>
                </div>
              ))}

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            {item.points?.length > 0 && (
              <ul>
                {item.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}

            <ActionRow>
              <ActionButtons>
                <EditBtn
                  onClick={() => {
                    setFormData(item);
                    setEditingId(item._id!);
                    setOpen(true);
                  }}
                >
                  <EditOutlined />
                  <span>Edit</span>
                </EditBtn>

                <DeleteBtn
                  onClick={() =>
                    axios.delete(`${API_URL}/${item._id}`).then(fetchSections)
                  }
                >
                  <DeleteOutlined />
                  <span>Delete</span>
                </DeleteBtn>
              </ActionButtons>
            </ActionRow>
          </Card>
        ))}
      </CardGrid>

      {open && (
        <Modal onClick={() => setOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>{editingId ? "Edit Home Section" : "Create Home Section"}</h3>
              <CloseBtn onClick={() => setOpen(false)}>✕</CloseBtn>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>Title *</label>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <label>Description *</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <label>Upload Image / Video *</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
                <UploadHint>
                  {uploading
                    ? "Uploading to S3..."
                    : "You can upload image or video"}
                </UploadHint>

                {formData.media.length > 0 && (
                  <PreviewMedia>
                    {formData.media.map((m, i) => (
                      <div key={i}>
                        {m.type === "image" ? (
                          <img src={m.url} alt="Media preview" />
                        ) : (
                          <video src={m.url} muted controls />
                        )}
                        <DeleteOutlined onClick={() => removeMedia(i)} />
                      </div>
                    ))}
                  </PreviewMedia>
                )}
              </FormGroup>

              <FormGroup>
                <label>Points (Optional)</label>
                {formData.points.map((p, i) => (
                  <PointRow key={i}>
                    <input
                      value={p}
                      onChange={(e) => {
                        const pts = [...formData.points];
                        pts[i] = e.target.value;
                        setFormData({ ...formData, points: pts });
                      }}
                    />
                    <DeleteOutlined
                      onClick={() =>
                        setFormData({
                          ...formData,
                          points: formData.points.filter(
                            (_, idx) => idx !== i,
                          ),
                        })
                      }
                    />
                  </PointRow>
                ))}
                <AddBtn
                  onClick={() =>
                    setFormData({
                      ...formData,
                      points: [...formData.points, ""],
                    })
                  }
                >
                  <PlusOutlined /> Add Point
                </AddBtn>
              </FormGroup>

              <SaveBtn onClick={handleSubmit} disabled={uploading}>
                {editingId ? "Update Section" : "Save Section"}
              </SaveBtn>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default HomeSectionAdmin;

/* ================= VIDEO BUTTON STYLE ================= */

const controlBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  background: "rgba(15,23,42,0.75)",
  color: "#fff",
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};