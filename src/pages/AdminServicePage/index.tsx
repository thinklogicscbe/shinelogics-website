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

import { uploadFileToS3 } from "../API/s3Upload";

/* ================= TYPES ================= */

interface Expertise {
  key: string;
  description: string[];
  image?: string;
  video?: string;
}

interface ExpertiseMedia {
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
  const [expertiseImages, setExpertiseImages] = useState<ExpertiseMedia[]>([]);
  const [expertiseVideos, setExpertiseVideos] = useState<ExpertiseMedia[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get(API);
    setServices(res.data.data || []);
  };

  /* ================= EDIT ================= */

  const handleEdit = async (id: string) => {
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
        image: exp.image || "",
        video: exp.video || "",
      }))
    );

    setExpertiseImages(
      (data.expertise || []).map((exp: any) => ({
        file: null,
        existing: exp.image || "",
      }))
    );

    setExpertiseVideos(
      (data.expertise || []).map((exp: any) => ({
        file: null,
        existing: exp.video || "",
      }))
    );

    setServiceImage(null);
    setEditingId(id);
    setShowForm(true);
  };

  /* ================= FORM ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const addExpertise = () => {
    setExpertise([...expertise, { key: "", description: [] }]);
    setExpertiseImages([...expertiseImages, { file: null }]);
    setExpertiseVideos([...expertiseVideos, { file: null }]);
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

  /* ================= SUBMIT (PRESIGNED UPLOAD) ================= */

  const submitService = async () => {
    try {
      setLoading(true);

      // 1️⃣ Upload service image
      let serviceImageUrl = service.image || "";
      if (serviceImage) {
        serviceImageUrl = await uploadFileToS3(serviceImage);
      }

      // 2️⃣ Upload expertise media
      const updatedExpertise = await Promise.all(
        expertise.map(async (exp, index) => {
          let imageUrl = expertiseImages[index]?.existing || "";
          let videoUrl = expertiseVideos[index]?.existing || "";

          if (expertiseImages[index]?.file) {
            imageUrl = await uploadFileToS3(
              expertiseImages[index].file!
            );
          }

          if (expertiseVideos[index]?.file) {
            videoUrl = await uploadFileToS3(
              expertiseVideos[index].file!
            );
          }

          return {
            ...exp,
            image: imageUrl,
            video: videoUrl,
          };
        })
      );

      // 3️⃣ Send JSON payload only
      const payload = {
        ...service,
        image: serviceImageUrl,
        expertise: updatedExpertise,
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, payload);
      } else {
        await axios.post(API, payload);
      }

      resetForm();
      fetchServices();
    } catch (err: any) {
      alert(err.message || "Error saving service");
    } finally {
      setLoading(false);
    }
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
    setExpertiseVideos([]);
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
          {services.map((s) => (
            <ServiceCardBox key={s._id}>
              <ServiceImage src={s.image} />
              <ServiceName>{s.title}</ServiceName>
              <ServiceDesc>{s.description}</ServiceDesc>

              <CardActions>
                <ActionButton onClick={() => handleEdit(s._id)}>
                  Edit
                </ActionButton>
                <ActionButton danger onClick={() => axios.delete(`${API}/${s._id}`).then(fetchServices)}>
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
            <Input type="file" onChange={(e) => setServiceImage(e.target.files?.[0] || null)} />
          </Field>

          <Divider />
          <SectionTitle>Expertise</SectionTitle>

          {expertise.map((exp, index) => (
            <ExpertiseCard key={index}>
              <Input
                placeholder="Expertise Key"
                value={exp.key}
                onChange={(e) => {
                  const updated = [...expertise];
                  updated[index].key = e.target.value;
                  setExpertise(updated);
                }}
              />

              <Input type="file" onChange={(e) => {
                const updated = [...expertiseImages];
                updated[index].file = e.target.files?.[0] || null;
                setExpertiseImages(updated);
              }} />

              <Input type="file" accept="video/*" onChange={(e) => {
                const updated = [...expertiseVideos];
                updated[index].file = e.target.files?.[0] || null;
                setExpertiseVideos(updated);
              }} />

              {exp.description.map((b, i) => (
                <Input key={i} value={b} onChange={(e) => updateBullet(index, i, e.target.value)} />
              ))}

              <SmallButton onClick={() => addBullet(index)}>+ Add Bullet</SmallButton>
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
