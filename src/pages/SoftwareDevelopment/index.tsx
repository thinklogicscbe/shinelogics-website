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

const SoftwareDevelopment: React.FC = () => {
  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Secure Software Development</HeroTitle>
          {/* <HeroSubtitle>
            Scalable, secure, and future-ready applications built with
            security-first engineering.
          </HeroSubtitle> */}
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
                  To help organizations design and deliver secure, scalable, and
                  future-ready web and mobile applications that support growth,
                  innovation, and compliance without exposing the business to
                  unnecessary risk.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  Applications are a primary attack surface. Speed-to-market
                  often results in weak access controls, insecure design
                  patterns, and poor data protection.
                </Paragraph>
                <Paragraph>
                  These gaps usually surface only after incidents or audits,
                  leading to costly remediation and delayed growth.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our Secure-by-Design Approach</BlockTitle>
                <Paragraph>
                  We embed security across the full development lifecycle—starting
                  with architecture, threat modelling, and secure coding
                  practices.
                </Paragraph>
                <Paragraph>
                  Our teams use modern frameworks, cloud-native patterns, and
                  industry standards to deliver resilient applications.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Who This Is Ideal For</BlockTitle>
                <List>
                  <ListItem>Startups building new digital products</ListItem>
                  <ListItem>Enterprises modernizing legacy systems</ListItem>
                  <ListItem>
                    Organizations in regulated or data-sensitive industries
                  </ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
                  alt="Software development"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c"
                  alt="Secure coding"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="System architecture"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>Security cannot be optional</CTATitle>
              <CTADesc>
                Let’s build a secure foundation for your next digital product.
              </CTADesc>
            </CTAText>

            <CTAButton>Talk to Our Experts</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default SoftwareDevelopment;
