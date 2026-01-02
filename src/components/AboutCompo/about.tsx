import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Section,
  Intro,
  Title,
  TitleSmall,
  Description,
  Grid,
  Card,
  CardTitle,
  CardText,
  Testimonials,
  TestimonialGrid,
  Quote,
  CTA,
  IndustriesSection,
  IndustriesHeader,
  IndustriesGrid,
  IndustryCard,
  IndustriesCTA,

  /* What We Do */
  ServicesSection,
  ServicesHeader,
  ServicesGrid,
  ServiceCard,

  /* ✅ Experts (NEW) */
  ExpertsSection,
  ExpertsGrid,
  ExpertCard,
  ExpertImage,
  ExpertName,
  ExpertRole,
} from "./styles";

interface Expert {
  _id: string;
  name: string;
  role: string;
  image: string;
}

const API_URL = "https://www.shinelogics.com/api/experts";

const About: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);

  /* ================= FETCH EXPERTS ================= */
useEffect(() => {
  const fetchExperts = async () => {
    try {
      const res = await axios.get(API_URL);
      setExperts(res.data.result || []);
    } catch (error) {
      console.error("Failed to fetch experts", error);
    }
  };

  fetchExperts();
}, []);

  return (
    <Section>
      {/* Intro */}
      <Intro>
        <Title>Secure Technology. Built to Scale.</Title>
        <Description>
          Shinelogics is a secure technology solutions company delivering
          scalable, AI-powered digital products for startups, SMEs, and
          enterprises. Based in Chennai, we follow secure-by-design engineering
          with global compliance standards.
        </Description>
      </Intro>

      {/* Mission & Vision */}
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

      {/* What We Do */}
      <ServicesSection>
        <ServicesHeader>
          <TitleSmall>What We Do</TitleSmall>
          <Description>
            We build secure, scalable, and intelligent technology solutions that
            help organizations innovate faster and operate with confidence.
          </Description>
        </ServicesHeader>

        <ServicesGrid>
          <ServiceCard>
            <h4>Software Development</h4>
            <p>Secure, scalable web and mobile applications.</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Application Security</h4>
            <p>Secure-by-design engineering and assessments.</p>
          </ServiceCard>

          <ServiceCard>
            <h4>AI & Machine Learning</h4>
            <p>Predictive analytics and automation.</p>
          </ServiceCard>

          <ServiceCard>
            <h4>IoT Engineering</h4>
            <p>Connected devices and smart automation.</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Data Platforms</h4>
            <p>Scalable analytics architectures.</p>
          </ServiceCard>

          <ServiceCard>
            <h4>Cloud & DevOps</h4>
            <p>CI/CD pipelines and secure infrastructure.</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>

      {/* Testimonials */}
      <Testimonials>
        <TitleSmall>Trusted by Clients</TitleSmall>
        <TestimonialGrid>
          <Quote>
            “Secure e-commerce with seamless POS integration.”
            <strong>Farm2Bag</strong>
            <span>E-Commerce</span>
          </Quote>

          <Quote>
            “AI automation reduced downtime by 35%.”
            <strong>Manufacturing ERP</strong>
            <span>Industrial</span>
          </Quote>

          <Quote>
            “Security built-in without slowing development.”
            <strong>FinTech Startup</strong>
            <span>FinTech</span>
          </Quote>
        </TestimonialGrid>
      </Testimonials>

      {/* CTA */}
      <CTA>
        <h3>See how we deliver real-world impact</h3>
        <button>View Case Studies</button>
      </CTA>

      {/* Industries */}
      <IndustriesSection>
        <IndustriesHeader>
          <TitleSmall>Industries We Serve</TitleSmall>
          <Description>
            Secure, scalable, industry-focused solutions.
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

        <IndustriesCTA>
          <button>See Industry Use Cases</button>
        </IndustriesCTA>
      </IndustriesSection>

      {/* ================= EXPERTS SECTION (NEW) ================= */}
      <ExpertsSection>
        <TitleSmall>Work With Our Experts</TitleSmall>
        <Description>
          A team of skilled professionals driving innovation and security.
        </Description>

        <ExpertsGrid>
          {experts.map(expert => (
            <ExpertCard key={expert._id}>
              <ExpertImage src={expert.image} alt={expert.name} />
              <ExpertName>{expert.name}</ExpertName>
              <ExpertRole>{expert.role}</ExpertRole>
            </ExpertCard>
          ))}
        </ExpertsGrid>
      </ExpertsSection>
    </Section>
  );
};

export default About;
