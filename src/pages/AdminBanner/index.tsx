import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-content`;

/* ================= TYPES ================= */

interface HomeContent {
  _id: string;
  heroTitle: string;
  mainDescription: string;
  subDescription: string;
  primaryCtaText?: string;
  primaryCtaRoute?: string;
  secondaryCtaText?: string;
  secondaryCtaRoute?: string;
  videos?: string[];
}

interface FormState {
  heroTitle: string;
  mainDescription: string;
  subDescription: string;
  primaryCtaText: string;
  primaryCtaRoute: string;
  secondaryCtaText: string;
  secondaryCtaRoute: string;
  videos: File[];
}

/* ================= INITIAL FORM ================= */

const initialForm: FormState = {
  heroTitle: "",
  mainDescription: "",
  subDescription: "",
  primaryCtaText: "",
  primaryCtaRoute: "",
  secondaryCtaText: "",
  secondaryCtaRoute: "",
  videos: [],
};

const AdminBanner: React.FC = () => {
  const [items, setItems] = useState<HomeContent[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setItems(Array.isArray(res.data?.result) ? res.data.result : []);
    } catch {
      setError("Failed to load banner content.");
      toast.error("Failed to load banner content ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FORM HANDLERS ================= */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setForm((prev) => ({
      ...prev,
      videos: Array.from(files),
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedVideoUrls = await Promise.all(
        form.videos.map((file) => uploadFileToS3(file))
      );

      const payload = {
        heroTitle: form.heroTitle,
        mainDescription: form.mainDescription,
        subDescription: form.subDescription,
        primaryCtaText: form.primaryCtaText,
        primaryCtaRoute: form.primaryCtaRoute,
        secondaryCtaText: form.secondaryCtaText,
        secondaryCtaRoute: form.secondaryCtaRoute,
        videos: [...uploadedVideoUrls, ...existingVideos],
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        toast.success("Banner updated successfully ✅");
      } else {
        await axios.post(API_URL, payload);
        toast.success("Banner created successfully 🎉");
      }

      setForm(initialForm);
      setExistingVideos([]);
      setEditingId(null);
      setShowForm(false);
      loadData();
    } catch {
      toast.error("Failed to save banner ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item: HomeContent) => {
    toast.info("Editing banner ✏️");

    setEditingId(item._id);
    setExistingVideos(item.videos || []);
    setForm({
      heroTitle: item.heroTitle,
      mainDescription: item.mainDescription,
      subDescription: item.subDescription,
      primaryCtaText: item.primaryCtaText || "",
      primaryCtaRoute: item.primaryCtaRoute || "",
      secondaryCtaText: item.secondaryCtaText || "",
      secondaryCtaRoute: item.secondaryCtaRoute || "",
      videos: [],
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Banner deleted successfully 🗑️");
      loadData();
    } catch {
      toast.error("Failed to delete banner ❌");
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      <Spacer30 />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SectionTitle>Home Banner</SectionTitle>

        <PrimaryActionButton
          onClick={() => {
            setForm(initialForm);
            setExistingVideos([]);
            setEditingId(null);
            setShowForm(true);
          }}
        >
          + Create Banner
        </PrimaryActionButton>
      </div>

      {/* FORM */}
      {showForm && (
        <FormBox onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Banner" : "Create Banner"}</h3>

          <input
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            placeholder="Hero Title"
            required
          />

          <textarea
            name="mainDescription"
            value={form.mainDescription}
            onChange={handleChange}
            placeholder="Main Description"
            required
          />

          <textarea
            name="subDescription"
            value={form.subDescription}
            onChange={handleChange}
            placeholder="Sub Description"
            required
          />

          <InputRow>
            <input
              name="primaryCtaText"
              value={form.primaryCtaText}
              onChange={handleChange}
              placeholder="Primary CTA"
            />
            <input
              name="secondaryCtaText"
              value={form.secondaryCtaText}
              onChange={handleChange}
              placeholder="Secondary CTA"
            />
          </InputRow>

          <input type="file" accept="video/*" multiple onChange={handleFileChange} />

          <button type="submit" disabled={loading}>
            {editingId ? "Update Banner" : "Create Banner"}
          </button>

          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </FormBox>
      )}

      {/* LIST */}
      <CardGrid>
        {items.map((item) => (
          <Card key={item._id}>
            <h3>{item.heroTitle}</h3>

            {item.videos?.length ? (
              <VideoPreview>
                <video key={item.videos[0]} src={item.videos[0]} controls />
              </VideoPreview>
            ) : null}

            <CardActions>
              <button className="edit" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(item._id)}>
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
