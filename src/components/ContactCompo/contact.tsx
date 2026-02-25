import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  PageWrapper,
  Header,
  Title,
  Subtitle,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  FormWrapper,
  Form,
  Input,
  TextArea,
  Select,
  SubmitButton,
} from "./styles";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/contact-leads`;

/* ================= COMPONENT ================= */

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.serviceInterest) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API_URL, formData);

      toast.success("Thank you! We will contact you soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceInterest: "",
        message: "",
      });
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <PageWrapper>
      {/* ================= HEADER ================= */}
      <Header>
        <Title>CONTACT US</Title>
        <Subtitle>
          Let&apos;s Build Secure & Intelligent Solutions Together
        </Subtitle>
      </Header>

      {/* ================= CONTACT INFO ================= */}
      <InfoGrid>
        <InfoCard>
          <InfoLabel>Email</InfoLabel>
          <InfoValue>support@shinelogics.com</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Address</InfoLabel>
          <InfoValue>Chennai, India</InfoValue>
        </InfoCard>
      </InfoGrid>

      {/* ================= FORM ================= */}
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <Select
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
          >
            <option value="">Service Interest *</option>
            <option value="Custom Software Development">
              Custom Software Development
            </option>
            <option value="Application Security Testing">
              Application Security Testing
            </option>
            <option value="AI / ML Integration">AI / ML Integration</option>
            <option value="IoT & Embedded Systems">
              IoT & Embedded Systems
            </option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="Staff Augmentation">Staff Augmentation</option>
          </Select>

          <TextArea
            name="message"
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Get in Touch"}
          </SubmitButton>
        </Form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Contact;