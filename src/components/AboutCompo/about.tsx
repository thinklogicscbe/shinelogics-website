import React from "react";
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
} from "./styles";

const About: React.FC = () => {
  return (
    <Section>
      {/* Intro */}
      <Intro>
        {/* <Eyebrow>About Us</Eyebrow> */}
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
            <p>
              Secure, scalable web and mobile applications built using modern
              frameworks and best practices.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h4>Application Security</h4>
            <p>
              Secure-by-design engineering, vulnerability assessments, and
              compliance-aligned development.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h4>AI & Machine Learning</h4>
            <p>
              Intelligent automation, predictive analytics, and AI-driven
              business insights.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h4>IoT Engineering</h4>
            <p>
              Connected device platforms, real-time monitoring, and smart
              automation solutions.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h4>Data Platforms</h4>
            <p>
              Data pipelines, dashboards, and scalable analytics architectures
              for informed decision-making.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h4>Cloud & DevOps</h4>
            <p>
              Cloud-native architectures, CI/CD pipelines, and secure
              infrastructure automation.
            </p>
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




      {/* Industries We Serve */}
<IndustriesSection>
  <IndustriesHeader>
    <TitleSmall>Industries We Serve</TitleSmall>
    <Description>
      We partner with organizations across industries to build secure,
      scalable, and intelligent digital solutions tailored to real-world
      challenges.
    </Description>
  </IndustriesHeader>

  <IndustriesGrid>
    <IndustryCard>
      <h4>FinTech</h4>
      <p>Payment platforms, digital wallets, trading systems</p>
    </IndustryCard>

    <IndustryCard>
      <h4>HealthTech</h4>
      <p>Medical platforms, patient management, HIPAA compliance</p>
    </IndustryCard>

    <IndustryCard>
      <h4>E-Commerce</h4>
      <p>Secure shopping platforms, POS integration</p>
    </IndustryCard>

    <IndustryCard>
      <h4>Manufacturing & Industrial IoT</h4>
      <p>Smart factories, production automation</p>
    </IndustryCard>

    <IndustryCard>
      <h4>EdTech</h4>
      <p>Learning management systems, student data protection</p>
    </IndustryCard>

    <IndustryCard>
      <h4>Logistics & Supply Chain</h4>
      <p>Real-time tracking, optimization</p>
    </IndustryCard>

    <IndustryCard>
      <h4>SaaS & Product Startups</h4>
      <p>Scalable, secure platforms</p>
    </IndustryCard>

    <IndustryCard>
      <h4>Retail & Consumer Tech</h4>
      <p>Omnichannel solutions, customer data security</p>
    </IndustryCard>
  </IndustriesGrid>

  <IndustriesCTA>
    <button>See Industry Use Cases</button>
  </IndustriesCTA>
</IndustriesSection>

    </Section>
  );
};

export default About;
