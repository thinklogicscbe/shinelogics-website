import React from "react";

/* ================= STYLES ================= */
import {
  Section,
  Grid,
  Card,
  CardTitle,
  CardText,

  ServicesSection,
  ServicesHeader,
  ServicesGrid,
  ServiceCard,

  IndustriesSection,
  IndustriesHeader,
  IndustriesGrid,
  IndustryCard,

  TitleSmall,
  Description,
} from "./styles";

/* ================= COMPONENT ================= */

const AboutUS: React.FC = () => {
  return (
    <>
      {/* ================= MISSION & VISION ================= */}
      <Section>
        <Grid>
          <Card>
            <CardTitle>Our Mission</CardTitle>
            <CardText>
              Empower businesses with secure, intelligent technology that
              accelerates growth and delivers measurable impact.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Our Vision</CardTitle>
            <CardText>
              To be a global leader in secure digital transformation where
              innovation and security coexist seamlessly.
            </CardText>
          </Card>
        </Grid>
      </Section>

      {/* ================= SERVICES ================= */}
      <ServicesSection>
        <ServicesHeader>
          <TitleSmall>What We Do</TitleSmall>
          <Description>
            Secure, scalable, intelligent solutions.
          </Description>
        </ServicesHeader>

        <ServicesGrid>
          <ServiceCard>
            <h4>Software Development</h4>
            <p>Web & mobile apps</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Application Security</h4>
            <p>Secure-by-design</p>
          </ServiceCard>

          <ServiceCard>
            <h4>AI & ML</h4>
            <p>Automation & analytics</p>
          </ServiceCard>

          <ServiceCard>
            <h4>IoT Engineering</h4>
            <p>Smart systems</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Data Platforms</h4>
            <p>Analytics at scale</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Cloud & DevOps</h4>
            <p>CI/CD & infrastructure</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>

      {/* ================= INDUSTRIES ================= */}
      <IndustriesSection>
        <IndustriesHeader>
          <TitleSmall>Industries We Serve</TitleSmall>
          <Description>
            Industry-focused secure solutions
          </Description>
        </IndustriesHeader>

        <IndustriesGrid>
          <IndustryCard><h4>FinTech</h4></IndustryCard>
          <IndustryCard><h4>HealthTech</h4></IndustryCard>
          <IndustryCard><h4>E-Commerce</h4></IndustryCard>
          <IndustryCard><h4>Manufacturing</h4></IndustryCard>
          <IndustryCard><h4>EdTech</h4></IndustryCard>
          <IndustryCard><h4>Logistics</h4></IndustryCard>
          <IndustryCard><h4>SaaS</h4></IndustryCard>
          <IndustryCard><h4>Retail</h4></IndustryCard>
        </IndustriesGrid>
      </IndustriesSection>
    </>
  );
};

export default AboutUS;