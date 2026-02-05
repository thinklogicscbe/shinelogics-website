import { useEffect, useState } from "react";
import axios from "axios";
import {
  PageWrapper,
  HeaderRow,
  Title,
  CreateButton,
  CardGrid,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button,
  SecondaryButton,
  DangerButton,
  ModalBackdrop,
  Modal,
  ModalTitle,
  Form,
  Input,
} from "./style";

import { uploadFileToS3 } from "../API/s3Upload";

/* ================= TYPES ================= */

interface Expert {
  _id: string;
  name: string;
  role: string;
  image: string;
}

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/experts`;

const ExpertAdmin: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");

  /* ================= FETCH ================= */

  const fetchExperts = async () => {
    try {
      const res = await axios.get(API_URL);
      setExperts(res.data.result || []);
    } catch (err) {
      console.error("Failed to fetch experts", err);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  /* ================= RESET ================= */

  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setName("");
    setRole("");
    setImageFile(null);
    setExistingImage("");
  };

  /* ================= SUBMIT (PRESIGNED UPLOAD) ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Upload image if new
      let imageUrl = existingImage;

      if (imageFile) {
        imageUrl = await uploadFileToS3(imageFile);
      }

      if (!imageUrl) {
        alert("Image is required");
        return;
      }

      // 2️⃣ Send JSON payload
      const payload = {
        name,
        role,
        image: imageUrl,
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      resetForm();
      fetchExperts();
    } catch (err) {
      console.error("Failed to save expert", err);
      alert("Failed to save expert");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (expert: Expert) => {
    setEditingId(expert._id);
    setName(expert.name);
    setRole(expert.role);
    setExistingImage(expert.image);
    setImageFile(null);
    setOpen(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this expert?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExperts();
    } catch (err) {
      console.error("Failed to delete expert", err);
    }
  };

  /* ================= LOCK BODY SCROLL ================= */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  /* ================= UI ================= */

  return (
    <PageWrapper>
      {/* HEADER */}
      <HeaderRow>
        <Title>Experts (Admin)</Title>
        <CreateButton onClick={() => setOpen(true)}>
          + Add Expert
        </CreateButton>
      </HeaderRow>

      {/* CARDS */}
      <CardGrid>
        {experts.length === 0 && <p>No experts added yet.</p>}

        {experts.map((expert) => (
          <Card key={expert._id}>
            <img
              src={expert.image}
              alt={expert.name}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "12px",
                objectFit: "cover",
              }}
            />

            <CardTitle>{expert.name}</CardTitle>
            <CardText>{expert.role}</CardText>

            <CardActions>
              <SecondaryButton onClick={() => handleEdit(expert)}>
                Edit
              </SecondaryButton>
              <DangerButton onClick={() => handleDelete(expert._id)}>
                Delete
              </DangerButton>
            </CardActions>
          </Card>
        ))}
      </CardGrid>

      {/* MODAL */}
      {open && (
        <ModalBackdrop onClick={resetForm}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {editingId ? "Edit Expert" : "Create Expert"}
            </ModalTitle>

            <Form onSubmit={handleSubmit}>
              <Input
                placeholder="Expert Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                placeholder="Role (e.g. Web Developer, UX Designer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files?.[0] || null)
                }
                required={!editingId}
              />

              <Button type="submit">
                {editingId ? "Update Expert" : "Create Expert"}
              </Button>

              <SecondaryButton type="button" onClick={resetForm}>
                Cancel
              </SecondaryButton>
            </Form>
          </Modal>
        </ModalBackdrop>
      )}
    </PageWrapper>
  );
};

export default ExpertAdmin;
