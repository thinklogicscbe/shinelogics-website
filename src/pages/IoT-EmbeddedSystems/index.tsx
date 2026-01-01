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

const IoTEmbeddedSystems: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>IoT & Embedded Systems</HeroTitle>
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
                  To build secure, reliable, and scalable IoT and embedded systems
                  that power connected products, smart infrastructure, and
                  industrial automation.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  IoT ecosystems operate in hostile environments—devices are often
                  unattended, connected over insecure networks, and run
                  long-lived firmware.
                </Paragraph>
                <Paragraph>
                  Without strong security, lifecycle management, and resilience,
                  failures can impact safety, compliance, and business continuity.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our End-to-End Engineering Solution</BlockTitle>
                <Paragraph>
                  We deliver complete IoT and embedded engineering solutions,
                  covering firmware development, device software, secure
                  communication protocols, and backend integration.
                </Paragraph>
                <Paragraph>
                  Our approach prioritizes performance, reliability, and security
                  across the entire device lifecycle—from prototype to
                  large-scale deployment.
                </Paragraph>
                <Paragraph>
                  We support industrial, commercial, and smart-device use cases
                  with production-ready solutions.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Key Advantages</BlockTitle>
                <List>
                  <ListItem>
                    Secure device communication and lifecycle management
                  </ListItem>
                  <ListItem>
                    Improved operational visibility and centralized control
                  </ListItem>
                  <ListItem>
                    Reduced downtime, risk, and maintenance costs
                  </ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Embedded systems development"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                  alt="Industrial IoT systems"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
                  alt="Connected IoT devices"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>Your connected systems should work for you</CTATitle>
              <CTADesc>
                Build secure and resilient IoT solutions with confidence.
              </CTADesc>
            </CTAText>

            <CTAButton>Build Secure IoT Solutions</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default IoTEmbeddedSystems;
