import { useCallback, useEffect, useState } from "react";
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
  FeatureList,
  CardActions,
  SecondaryButton,
  DangerButton,
  ModalBackdrop,
  Modal,
  ModalTitle,
  Form,
  Input,
  TextArea,
  FeatureRow,
  AddButton,
  Button,
} from "./style";

interface EngagementModel {
  _id: string;
  title: string;
  objective: string;
  challenge: string;
  features: string[];
}

const EngagementModelAdmin = () => {
  const [models, setModels] = useState<EngagementModel[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [challenge, setChallenge] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);

  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/engagement-models`;

  const fetchModels = useCallback(async () => {
    const res = await axios.get(API_URL);
    setModels(res.data.data || res.data);
  }, [API_URL]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setTitle("");
    setObjective("");
    setChallenge("");
    setFeatures([""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      objective,
      challenge,
      features: features.filter(f => f.trim() !== ""),
    };

    editingId
      ? await axios.put(`${API_URL}/${editingId}`, payload)
      : await axios.post(API_URL, payload);

    resetForm();
    fetchModels();
  };

  const handleEdit = (model: EngagementModel) => {
    setEditingId(model._id);
    setTitle(model.title);
    setObjective(model.objective);
    setChallenge(model.challenge);
    setFeatures(model.features.length ? model.features : [""]);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this engagement model?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchModels();
  };

  return (
    <PageWrapper>
      {/* HEADER */}
      <HeaderRow>
        <Title>Engagement Models</Title>
        <CreateButton onClick={() => setOpen(true)}>
          + Create Model
        </CreateButton>
      </HeaderRow>

      {/* CARDS */}
      <CardGrid>
        {models.map(model => (
          <Card key={model._id}>
            <CardTitle>{model.title}</CardTitle>
            <CardText>{model.objective}</CardText>

            <FeatureList>
              {model.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </FeatureList>

            <CardActions>
              <SecondaryButton onClick={() => handleEdit(model)}>
                Edit
              </SecondaryButton>
              <DangerButton onClick={() => handleDelete(model._id)}>
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
              {editingId ? "Edit Engagement Model" : "Create Engagement Model"}
            </ModalTitle>

            <Form onSubmit={handleSubmit}>
              <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <TextArea placeholder="Objective" value={objective} onChange={e => setObjective(e.target.value)} required />
              <TextArea placeholder="Challenge" value={challenge} onChange={e => setChallenge(e.target.value)} required />

              <strong>Features</strong>
              {features.map((f, i) => (
                <FeatureRow key={i}>
                  <Input
                    placeholder={`Feature ${i + 1}`}
                    value={f}
                    onChange={e => {
                      const copy = [...features];
                      copy[i] = e.target.value;
                      setFeatures(copy);
                    }}
                  />
                </FeatureRow>
              ))}

              <AddButton type="button" onClick={() => setFeatures([...features, ""])}>
                + Add Feature
              </AddButton>

              <Button type="submit">
                {editingId ? "Update Model" : "Create Model"}
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

export default EngagementModelAdmin;
