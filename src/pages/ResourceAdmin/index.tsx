import { useEffect, useState } from "react";
import axios from "axios";
import {
  PageWrapper,
  HeaderRow,
  Title,
  CreateButton,
  CardGrid,
  Card,
  CardType,
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
  TextArea,
  Select,
} from "./style";

interface Resource {
  _id: string;
  title: string;
  description?: string;
  type: "CHECKLIST" | "WEBINAR" | "BLOG";
  items?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/resources`;

const ResourcesAdmin = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Resource>({
    _id: "",
    title: "",
    description: "",
    type: "WEBINAR",
    items: [],
    ctaText: "",
    ctaLink: "",
  });

  /* ================= FETCH ================= */
  const fetchResources = async () => {
    const res = await axios.get(API_URL);
    setResources(res.data.data || []);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setForm({
      _id: "",
      title: "",
      description: "",
      type: "WEBINAR",
      items: [],
      ctaText: "",
      ctaLink: "",
    });
  };

  const addItem = () => {
    setForm({ ...form, items: [...(form.items || []), ""] });
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = [...(form.items || [])];
    updatedItems[index] = value;
    setForm({ ...form, items: updatedItems });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(form.items || [])];
    updatedItems.splice(index, 1);
    setForm({ ...form, items: updatedItems });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      type: form.type,
      items:
        form.type === "BLOG" || form.type === "CHECKLIST"
          ? form.items
          : [],
      ctaText: form.ctaText,
      ctaLink: form.ctaLink,
    };

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, payload);
    } else {
      await axios.post(API_URL, payload);
    }

    resetForm();
    fetchResources();
  };

  /* ================= EDIT ================= */
  const handleEdit = (resource: Resource) => {
    setEditingId(resource._id);
    setForm({
      ...resource,
      items: resource.items || [],
    });
    setOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this resource?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchResources();
  };

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <PageWrapper>
      {/* HEADER */}
      <HeaderRow>
        <Title>Resources (Admin)</Title>
        <CreateButton onClick={() => setOpen(true)}>
          + Create Resource
        </CreateButton>
      </HeaderRow>

      {/* CARDS */}
      <CardGrid>
        {resources.map(resource => (
          <Card key={resource._id}>
            <CardType>{resource.type}</CardType>

            <CardTitle>{resource.title}</CardTitle>

            {resource.description && (
              <CardText>{resource.description}</CardText>
            )}

            {resource.type === "WEBINAR" &&
              resource.ctaText &&
              resource.ctaLink && (
                <a
                  href={resource.ctaLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>{resource.ctaText}</Button>
                </a>
              )}

            <CardActions>
              <SecondaryButton onClick={() => handleEdit(resource)}>
                Edit
              </SecondaryButton>
              <DangerButton onClick={() => handleDelete(resource._id)}>
                Delete
              </DangerButton>
            </CardActions>
          </Card>
        ))}
      </CardGrid>

      {/* MODAL */}
      {open && (
        <ModalBackdrop onClick={resetForm}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalTitle>
              {editingId ? "Edit Resource" : "Create Resource"}
            </ModalTitle>

            <Form onSubmit={handleSubmit}>
              <Input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />

              <TextArea
                placeholder="Description"
                value={form.description}
                onChange={e =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <Select
                value={form.type}
                onChange={e =>
                  setForm({ ...form, type: e.target.value as any })
                }
              >
                <option value="CHECKLIST">Checklist</option>
                <option value="WEBINAR">Webinar</option>
                <option value="BLOG">Blog</option>
              </Select>

              {/* ITEMS */}
              {(form.type === "BLOG" || form.type === "CHECKLIST") && (
                <>
                  <Title style={{ fontSize: "14px", marginTop: "12px" }}>
                    Items
                  </Title>

                  {form.items?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <Input
                        placeholder={`Item ${index + 1}`}
                        value={item}
                        onChange={e =>
                          updateItem(index, e.target.value)
                        }
                      />
                      <DangerButton
                        type="button"
                        onClick={() => removeItem(index)}
                      >
                        ✕
                      </DangerButton>
                    </div>
                  ))}

                  <SecondaryButton type="button" onClick={addItem}>
                    + Add Item
                  </SecondaryButton>
                </>
              )}

              <Input
                placeholder="CTA Text"
                value={form.ctaText}
                onChange={e =>
                  setForm({ ...form, ctaText: e.target.value })
                }
              />

              <Input
                placeholder="CTA Link"
                value={form.ctaLink}
                onChange={e =>
                  setForm({ ...form, ctaLink: e.target.value })
                }
              />

              <Button type="submit">
                {editingId ? "Update Resource" : "Create Resource"}
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

export default ResourcesAdmin;
