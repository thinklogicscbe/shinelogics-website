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

interface Expert {
  _id: string;
  name: string;
  role: string;
  image: string;
}

const API_URL = "https://www.shinelogics.com/api/experts";

const ExpertAdmin: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  /* ================= FETCH EXPERTS ================= */
  const fetchExperts = async () => {
    try {
      const res = await axios.get(API_URL);
      // ✅ FIX: backend sends `result`, not `data`
      setExperts(res.data.result || []);
    } catch (error) {
      console.error("Failed to fetch experts", error);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setName("");
    setRole("");
    setImageFile(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchExperts();
    } catch (error) {
      console.error("Failed to save expert", error);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (expert: Expert) => {
    setEditingId(expert._id);
    setName(expert.name);
    setRole(expert.role);
    setImageFile(null);
    setOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this expert?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExperts();
    } catch (error) {
      console.error("Failed to delete expert", error);
    }
  };

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

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
                  setImageFile(e.target.files ? e.target.files[0] : null)
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
