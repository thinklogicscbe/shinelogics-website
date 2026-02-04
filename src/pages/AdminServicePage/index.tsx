import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  HeaderRow,
  Heading,
  CreateButton,
  CardGrid,
  ServiceCardBox,
  ServiceImage,
  ServiceName,
  ServiceDesc,
  CardActions,
  ActionButton,
  SectionTitle,
  Field,
  Label,
  Input,
  Textarea,
  Divider,
  ExpertiseCard,
  SmallButton,
  SubmitButton,
  FormPanel,
  FormHeader,
  CloseButton,
} from "./style";

/* ================= TYPES ================= */

interface Expertise {
  key: string;
  description: string[];
}

interface ExpertiseImage {
  file: File | null;
  existing?: string;
}

interface ServiceForm {
  title: string;
  slug: string;
  description: string;
  overview: string;
  cta: string;
  image?: string;
}

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  image: string;
}

/* ================= API ================= */

const API = `${process.env.REACT_APP_BACKEND_URL}/service`;

/* ================= COMPONENT ================= */

const AdminServicePage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [service, setService] = useState<ServiceForm>({
    title: "",
    slug: "",
    description: "",
    overview: "",
    cta: "",
  });

  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [expertiseImages, setExpertiseImages] = useState<ExpertiseImage[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH LIST ================= */

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get(API);
    setServices(res.data.data || []);
  };

  /* ================= EDIT (AUTO-FILL) ================= */

  const handleEdit = async (id: string) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      const data = res.data.data;

      setService({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        overview: data.overview || "",
        cta: data.cta || "",
        image: data.image || "",
      });

      setExpertise(
        (data.expertise || []).map((exp: any) => ({
          key: exp.key,
          description: exp.description || [],
        }))
      );

      setExpertiseImages(
        (data.expertise || []).map((exp: any) => ({
          file: null,
          existing: exp.image || "",
        }))
      );

      setServiceImage(null);
      setEditingId(id);
      setShowForm(true);
    } catch {
      alert("Failed to load service details");
    }
  };

  /* ================= FORM HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const addExpertise = () => {
    setExpertise([...expertise, { key: "", description: [""] }]);
    setExpertiseImages([...expertiseImages, { file: null }]);
  };

  const updateExpertise = (
    index: number,
    field: keyof Expertise,
    value: any
  ) => {
    const updated = [...expertise];
    updated[index][field] = value;
    setExpertise(updated);
  };

  const updateBullet = (
    expIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...expertise];
    updated[expIndex].description[bulletIndex] = value;
    setExpertise(updated);
  };

  const addBullet = (index: number) => {
    const updated = [...expertise];
    updated[index].description.push("");
    setExpertise(updated);
  };

  const handleExpertiseImageChange = (index: number, file: File | null) => {
    const updated = [...expertiseImages];
    updated[index].file = file;
    setExpertiseImages(updated);
  };

  /* ================= SUBMIT ================= */

  const submitService = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(service).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (serviceImage) {
        formData.append("image", serviceImage);
      }

      formData.append("expertise", JSON.stringify(expertise));

      expertise.forEach((_, index) => {
        const file = expertiseImages[index]?.file;
        if (file) {
          formData.append(`expertiseImage_${index}`, file);
        }
      });

      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData);
      } else {
        await axios.post(API, formData);
      }

      resetForm();
      fetchServices();
    } catch (error: any) {
      alert(error.response?.data?.message || "Error saving service");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const deleteService = async (id: string) => {
    if (!window.confirm("Delete this service?")) return;
    await axios.delete(`${API}/${id}`);
    fetchServices();
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setService({
      title: "",
      slug: "",
      description: "",
      overview: "",
      cta: "",
    });
    setServiceImage(null);
    setExpertise([]);
    setExpertiseImages([]);
  };

  /* ================= UI ================= */

  return (
    <Container>
      <HeaderRow>
        <Heading>Services</Heading>
        <CreateButton onClick={() => setShowForm(true)}>
          + Create Service
        </CreateButton>
      </HeaderRow>

      {!showForm && (
        <CardGrid>
          {services.map((service) => (
            <ServiceCardBox key={service._id}>
              <ServiceImage src={service.image} />
              <ServiceName>{service.title}</ServiceName>
              <ServiceDesc>{service.description}</ServiceDesc>

              <CardActions>
                <ActionButton onClick={() => handleEdit(service._id)}>
                  Edit
                </ActionButton>
                <ActionButton danger onClick={() => deleteService(service._id)}>
                  Delete
                </ActionButton>
              </CardActions>
            </ServiceCardBox>
          ))}
        </CardGrid>
      )}

      {showForm && (
        <FormPanel>
          <FormHeader>
            <SectionTitle>
              {editingId ? "Edit Service" : "Create Service"}
            </SectionTitle>
            <CloseButton onClick={resetForm}>✕</CloseButton>
          </FormHeader>

          {Object.entries(service).map(([key, value]) =>
            key !== "image" ? (
              <Field key={key}>
                <Label>{key}</Label>
                {key === "description" || key === "overview" ? (
                  <Textarea name={key} value={value} onChange={handleChange} />
                ) : (
                  <Input name={key} value={value} onChange={handleChange} />
                )}
              </Field>
            ) : null
          )}

          <Field>
            <Label>Service Image</Label>

            {service.image && !serviceImage && (
              <img
                src={service.image}
                alt="service"
                style={{ width: 150, marginBottom: 10 }}
              />
            )}

            <Input
              type="file"
              onChange={(e) =>
                setServiceImage(e.target.files?.[0] || null)
              }
            />
          </Field>

          <Divider />
          <SectionTitle>Expertise</SectionTitle>

          {expertise.map((exp, index) => (
            <ExpertiseCard key={index}>
              <Input
                placeholder="Expertise Key"
                value={exp.key}
                onChange={(e) =>
                  updateExpertise(index, "key", e.target.value)
                }
              />

              {expertiseImages[index]?.existing &&
                !expertiseImages[index]?.file && (
                  <img
                    src={expertiseImages[index].existing}
                    alt="expertise"
                    style={{ width: 120, marginBottom: 8 }}
                  />
                )}

              <Input
                type="file"
                onChange={(e) =>
                  handleExpertiseImageChange(
                    index,
                    e.target.files?.[0] || null
                  )
                }
              />

              {exp.description.map((bullet, bIndex) => (
                <Input
                  key={bIndex}
                  value={bullet}
                  onChange={(e) =>
                    updateBullet(index, bIndex, e.target.value)
                  }
                />
              ))}

              <SmallButton onClick={() => addBullet(index)}>
                + Add Bullet
              </SmallButton>
            </ExpertiseCard>
          ))}

          <SmallButton onClick={addExpertise}>+ Add Expertise</SmallButton>

          <Divider />

          <SubmitButton disabled={loading} onClick={submitService}>
            {loading ? "Saving..." : "Save Service"}
          </SubmitButton>
        </FormPanel>
      )}
    </Container>
  );
};

export default AdminServicePage;
