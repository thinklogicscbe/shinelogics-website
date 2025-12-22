import React from "react";
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
  CTASection,
  CTAButton,
  SocialSection,
  SocialLink,
} from "./styles";

const Contact: React.FC = () => {
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
          <InfoLabel>Phone</InfoLabel>
          <InfoValue>+91-9500037221</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Address</InfoLabel>
          <InfoValue>Chennai, India</InfoValue>
        </InfoCard>
      </InfoGrid>

      {/* ================= FORM ================= */}
      <FormWrapper>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone" />
          <Input placeholder="Company" />

          <Select>
            <option>Service Interest</option>
            <option>Custom Software Development</option>
            <option>Application Security Testing</option>
            <option>AI / ML Integration</option>
            <option>IoT & Embedded Systems</option>
            <option>Data Engineering</option>
            <option>Staff Augmentation</option>
          </Select>

          <TextArea placeholder="Message" rows={4} />

          <SubmitButton>Get in Touch</SubmitButton>
        </Form>
      </FormWrapper>

      {/* ================= STRATEGY CTA ================= */}
      <CTASection>
        <CTAButton>Book a Strategy Call</CTAButton>
      </CTASection>

      {/* ================= SOCIAL ================= */}
      <SocialSection>
        <SocialLink href="#">LinkedIn: Shinelogics</SocialLink>
        <SocialLink href="#">Twitter: @shinelogics</SocialLink>
      </SocialSection>
    </PageWrapper>
  );
};

export default Contact;
