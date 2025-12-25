import React from "react";
import {
  WhyChooseContainer,
  Title,
  Subtitle,
  CardsGrid,
  FeatureCard,
  CTASection,
  CTAButton,
} from "./styles";

const WhyChooseUs: React.FC = () => {
  return (
    <WhyChooseContainer>
      <Title>Why Businesses Choose Us</Title>
      <Subtitle>
        We combine security, intelligence, and engineering excellence to
        deliver future-ready solutions.
      </Subtitle>

      <CardsGrid>
        <FeatureCard>
          <h3>Security-First Engineering</h3>
          <p>
            Every solution is built with security embedded from design to
            deployment.
          </p>
        </FeatureCard>

        <FeatureCard>
          <h3>AI-Enabled Innovation</h3>
          <p>
            We leverage AI/ML and intelligent automation to create smarter
            digital products.
          </p>
        </FeatureCard>

        <FeatureCard>
          <h3>Cross-Functional Expertise</h3>
          <p>
            A unified team of developers, AppSec engineers, data scientists,
            and AI specialists.
          </p>
        </FeatureCard>

        <FeatureCard>
          <h3>Fast, Reliable Delivery</h3>
          <p>
            Agile execution with predictable timelines and high-quality
            outcomes.
          </p>
        </FeatureCard>

        <FeatureCard>
          <h3>Flexible Engagement Models</h3>
          <p>
            Choose from project-based, dedicated teams, or staff augmentation
            models.
          </p>
        </FeatureCard>

        <FeatureCard>
          <h3>Compliance-Ready Solutions</h3>
          <p>
            Built to align with ISO, OWASP, GDPR, and India’s DPDPA standards.
          </p>
        </FeatureCard>
      </CardsGrid>

      <CTASection>
        <CTAButton>Book a Strategy Call</CTAButton>
      </CTASection>
    </WhyChooseContainer>
  );
};

export default WhyChooseUs;
