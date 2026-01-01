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

const StaffAugmentation: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Staff Augmentation</HeroTitle>
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
                  To enable organizations to scale delivery and innovation by
                  providing on-demand access to skilled technology
                  professionals—without long-term hiring commitments.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  Technology initiatives often slow down due to talent shortages,
                  highly specialized skill requirements, or sudden increases in
                  workload.
                </Paragraph>
                <Paragraph>
                  Traditional hiring is time-consuming and costly, while evolving
                  project needs make permanent recruitment inefficient and risky.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our Flexible Talent Model</BlockTitle>
                <Paragraph>
                  We provide carefully vetted developers, application security
                  engineers, data specialists, and AI professionals who integrate
                  seamlessly into your existing teams.
                </Paragraph>
                <Paragraph>
                  Our resources are selected for technical excellence,
                  adaptability, and strong communication—ensuring immediate
                  productivity with minimal onboarding.
                </Paragraph>
                <Paragraph>
                  This engagement model allows organizations to stay agile while
                  maintaining high standards of quality, security, and delivery.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Why This Works</BlockTitle>
                <List>
                  <ListItem>Accelerated project execution</ListItem>
                  <ListItem>Reduced recruitment and onboarding risk</ListItem>
                  <ListItem>Immediate access to specialized expertise</ListItem>
                  <ListItem>Cost-effective and scalable team expansion</ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Engineering team collaboration"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                  alt="Remote software professionals"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="Agile development team"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>Scale your team without slowing delivery</CTATitle>
              <CTADesc>
                Get the right expertise, exactly when you need it.
              </CTADesc>
            </CTAText>

            <CTAButton>Scale Your Team</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default StaffAugmentation;
