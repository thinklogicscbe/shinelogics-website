import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  CardGrid,
  Card,
  CardActions,
  FormBox,
  SectionTitle,
  InputRow,
  VideoPreview,
} from "./style";

// 🔹 API URL
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-content`;

// 🔹 Types
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

// 🔹 Initial form
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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /* ================= LOAD DATA ================= */

const loadData = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await axios.get(API_URL);

    const list: HomeContent[] = Array.isArray(res.data?.result)
      ? res.data.result
      : [];

    setItems(list);
  } catch (err) {
    console.error("Load error:", err);
    setItems([]);
    setError("Failed to load banner content.");
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

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("heroTitle", form.heroTitle);
      formData.append("mainDescription", form.mainDescription);
      formData.append("subDescription", form.subDescription);
      formData.append("primaryCtaText", form.primaryCtaText);
      formData.append("primaryCtaRoute", form.primaryCtaRoute);
      formData.append("secondaryCtaText", form.secondaryCtaText);
      formData.append("secondaryCtaRoute", form.secondaryCtaRoute);

      form.videos.forEach((file) => {
        formData.append("videos", file);
      });

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save banner");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item: HomeContent) => {
    setEditingId(item._id);
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
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete banner");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div>
      {/* ===== TOP BAR ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <SectionTitle>Home Banner</SectionTitle>

        <button
          onClick={() => {
            setForm(initialForm);
            setEditingId(null);
            setShowForm(true);
          }}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Create Banner
        </button>
      </div>

      {/* ===== FORM ===== */}
      {showForm && (
        <FormBox onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Banner" : "Create New Banner"}</h3>

          <input
            name="heroTitle"
            placeholder="Hero Title"
            value={form.heroTitle}
            onChange={handleChange}
            required
          />

          <textarea
            name="mainDescription"
            placeholder="Main Description"
            value={form.mainDescription}
            onChange={handleChange}
            required
          />

          <textarea
            name="subDescription"
            placeholder="Sub Description"
            value={form.subDescription}
            onChange={handleChange}
            required
          />

          <InputRow>
            <input
              name="primaryCtaText"
              placeholder="Primary CTA Text"
              value={form.primaryCtaText}
              onChange={handleChange}
            />

            <input
              name="secondaryCtaText"
              placeholder="Secondary CTA Text"
              value={form.secondaryCtaText}
              onChange={handleChange}
            />
          </InputRow>

          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileChange}
          />

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit">
              {editingId ? "Update Banner" : "Create Banner"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: "#e5e7eb",
                color: "#111827",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
          </div>
        </FormBox>
      )}

      {/* ===== STATUS ===== */}
      {loading && <p>Loading banner content...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ===== CARDS ===== */}
      <CardGrid>
        {items.length === 0 && !loading ? (
          <p>No banner content found.</p>
        ) : (
          items.map((item) => (
            <Card key={item._id}>
              <h3>{item.heroTitle}</h3>
              <p>{item.mainDescription.slice(0, 120)}...</p>

              {item.videos && item.videos.length > 0 && (
                <VideoPreview>
                  <video src={item.videos[0]} controls />
                </VideoPreview>
              )}

              <CardActions>
                <button className="edit" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </CardActions>
            </Card>
          ))
        )}
      </CardGrid>
    </div>
  );
};

export default AdminBanner;
