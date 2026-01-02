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

const PremiumQA: React.FC = () => {
  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Premium QA & Application Security Assurance</HeroTitle>
          {/* Optional subtitle */}
          {/* 
          <HeroSubtitle>
            Ensuring quality, resilience, and security across every release.
          </HeroSubtitle> 
          */}
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
                  To ensure software quality, reliability, and security through
                  comprehensive testing and security assurance across the
                  application lifecycle.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  Modern applications evolve rapidly, increasing the risk of
                  defects, performance bottlenecks, and security vulnerabilities.
                </Paragraph>
                <Paragraph>
                  Without structured QA and security testing, these risks reach
                  production and impact users, compliance, and brand trust.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our Assurance Approach</BlockTitle>
                <Paragraph>
                  We combine functional testing, automation, performance
                  validation, and application security testing to ensure
                  production-ready software.
                </Paragraph>
                <Paragraph>
                  Our QA engineers and security specialists work together to
                  identify issues early and continuously.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Who This Is Ideal For</BlockTitle>
                <List>
                  <ListItem>Product teams releasing frequently</ListItem>
                  <ListItem>Enterprises requiring high reliability</ListItem>
                  <ListItem>Security-conscious and regulated organizations</ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                  alt="Quality assurance testing"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb"
                  alt="Application security testing"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
                  alt="Automation and QA tools"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>Quality and security define trust</CTATitle>
              <CTADesc>
                Ensure every release meets the highest standards of assurance.
              </CTADesc>
            </CTAText>

            <CTAButton>Talk to Our Experts</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default PremiumQA;
