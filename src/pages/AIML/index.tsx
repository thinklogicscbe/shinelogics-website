import React from "react";
import {
  HeroSection,
  HeroOverlay,
  HeroContent,
  HeroTitle,
  Section,
  Container,
  ContentWrapper,
  LeftContent,
  RightImages,
  ImageCard,
  Heading,
  ContentBlock,
  BlockTitle,
  Paragraph,
  List,
  ListItem,
  CTABanner,
  CTAText,
  CTATitle,
  CTADesc,
  CTAButton,
} from "./style";

const AIMLIntegration: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>AI / ML Integration</HeroTitle>
        </HeroContent>
      </HeroSection>

      {/* ================= CONTENT ================= */}
      <Section>
        <Container>
          <ContentWrapper>
            {/* LEFT CONTENT */}
            <LeftContent>
              <Heading>What We Deliver</Heading>

              <ContentBlock>
                <BlockTitle>Objective</BlockTitle>
                <Paragraph>
                  To enable organizations to adopt AI and machine learning
                  solutions that drive efficiency, intelligence, and competitive
                  advantage—without compromising security, governance, or trust.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  AI initiatives often struggle due to unclear objectives,
                  fragmented data, and limited trust in model outcomes.
                </Paragraph>
                <Paragraph>
                  Concerns around data privacy, model bias, explainability, and
                  regulatory compliance further slow adoption.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our AI Enablement Approach</BlockTitle>
                <Paragraph>
                  We focus on business-aligned AI use cases—from intelligent
                  automation and predictive analytics to LLM-powered systems.
                </Paragraph>
                <Paragraph>
                  Security, governance, and responsible AI principles are embedded
                  across the lifecycle to ensure scalable and trusted deployments.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Business Outcomes</BlockTitle>
                <List>
                  <ListItem>Reduced operational overhead</ListItem>
                  <ListItem>Faster insights and predictions</ListItem>
                  <ListItem>Improved decision-making accuracy</ListItem>
                  <ListItem>Secure and explainable AI adoption</ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                  alt="Artificial intelligence and machine learning"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
                  alt="Neural networks and data science"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb"
                  alt="AI analytics and automation"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>AI should simplify decisions</CTATitle>
              <CTADesc>
                Let’s identify where AI can deliver the highest impact for your
                business.
              </CTADesc>
            </CTAText>

            <CTAButton>Explore AI Opportunities</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default AIMLIntegration;
