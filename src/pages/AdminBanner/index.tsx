import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  CardGrid,
  Card,
  CardActions,
  FormBox,
  SectionTitle,
  InputRow,
  VideoPreview,
  PrimaryActionButton,
  Spacer30,
} from "./style";

import { uploadFileToS3 } from "../API/s3Upload";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-content`;

/* ================= TYPES ================= */

interface HomeContent {
  _id: string;
  heroTitle: string;
  description: string;
  points: string[];
  videos: string[];
  buttonText?: string;
  buttonRoute?: string;
}

/* ================= INITIAL ================= */

const initialForm = {
  heroTitle: "",
  description: "",
  points: [] as string[],
  videos: [] as File[],
  buttonText: "",
  buttonRoute: "",
};

/* ================= COMPONENT ================= */

const AdminBanner: React.FC = () => {
  const [items, setItems] = useState<HomeContent[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data?.result || []);
    } catch {
      toast.error("Failed to load banners ❌");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= CANCEL ================= */

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
    setExistingVideos([]);
  };

  /* ================= POINT ACTIONS ================= */

  const addPoint = () => {
    setForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const updatePoint = (index: number, value: string) => {
    const updated = [...form.points];
    updated[index] = value;
    setForm({ ...form, points: updated });
  };

  const removePoint = (index: number) => {
    setForm({
      ...form,
      points: form.points.filter((_, i) => i !== index),
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.heroTitle.trim()) {
      toast.error("Hero title is required");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (form.videos.length === 0 && existingVideos.length === 0) {
      toast.error("At least one video is required");
      return;
    }

    setLoading(true);

    try {
      const uploadedVideos = await Promise.all(
        form.videos.map((file) => uploadFileToS3(file)),
      );

      const cleanedPoints = form.points.map((p) => p.trim()).filter(Boolean);

      const payload = {
        heroTitle: form.heroTitle.trim(),
        description: form.description.trim(),
        points: cleanedPoints,
        videos:
          uploadedVideos.length > 0
            ? uploadedVideos // replace
            : existingVideos, // keep old if no new upload
        buttonText: form.buttonText.trim(),
        buttonRoute: form.buttonRoute.trim(),
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        toast.success("Banner updated successfully ✅");
      } else {
        await axios.post(API_URL, payload);
        toast.success("Banner created successfully 🎉");
      }

      handleCancel();
      loadData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save banner ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item: HomeContent) => {
    setEditingId(item._id);
    setExistingVideos(item.videos || []);
    setForm({
      heroTitle: item.heroTitle,
      description: item.description,
      points: item.points || [],
      videos: [],
      buttonText: item.buttonText || "",
      buttonRoute: item.buttonRoute || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Banner deleted successfully 🗑️");
      loadData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete banner ❌");
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      <Spacer30 />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Home Banner</SectionTitle>
        <PrimaryActionButton
          onClick={() => {
            setShowForm(true);
            setForm(initialForm);
            setEditingId(null);
            setExistingVideos([]);
          }}
        >
          + Create Banner
        </PrimaryActionButton>
      </div>

      {showForm && (
        <FormBox onSubmit={handleSubmit}>
          <input
            placeholder="Hero Title"
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Button Text (optional)"
            value={form.buttonText}
            onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
          />

          <input
            placeholder="Button Route (e.g. /contact)"
            value={form.buttonRoute}
            onChange={(e) => setForm({ ...form, buttonRoute: e.target.value })}
          />

          <SectionTitle>Optional Points</SectionTitle>

          {form.points.map((point, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <input
                placeholder={`Point ${index + 1}`}
                value={point}
                onChange={(e) => updatePoint(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removePoint(index)}
                style={{ color: "red", marginLeft: 10 }}
              >
                Remove
              </button>
            </div>
          ))}

          <InputRow>
            <button type="button" onClick={addPoint}>
              + Add Point
            </button>
          </InputRow>

          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) =>
              setForm({
                ...form,
                videos: Array.from(e.target.files || []),
              })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Banner"
                  : "Save Banner"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={{ background: "#ccc" }}
            >
              Cancel
            </button>
          </div>
        </FormBox>
      )}

      <CardGrid>
        {items.map((item) => (
          <Card key={item._id}>
            <h3>{item.heroTitle}</h3>

            <p style={{ fontSize: 14 }}>{item.description.slice(0, 120)}...</p>

            {item.buttonText && (
              <p style={{ fontSize: 13, opacity: 0.7 }}>
                Button: {item.buttonText}
              </p>
            )}

            {item.videos?.[0] && (
              <VideoPreview>
                <video src={item.videos[0]} controls />
              </VideoPreview>
            )}

            <CardActions>
              <button onClick={() => handleEdit(item)}>Edit</button>

              <button
                onClick={() => handleDelete(item._id)}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </CardActions>
          </Card>
        ))}
      </CardGrid>
    </>
  );
};

export default AdminBanner;
