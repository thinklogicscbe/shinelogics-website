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

const DataEngineeringAnalytics: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Data Engineering & Analytics</HeroTitle>
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
                  To help organizations establish a strong, scalable data
                  foundation that enables accurate insights, faster
                  decision-making, and sustainable business growth.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>The Challenge</BlockTitle>
                <Paragraph>
                  Data is often fragmented across multiple systems, inconsistently
                  structured, and difficult to trust.
                </Paragraph>
                <Paragraph>
                  Without reliable pipelines, governance, and quality controls,
                  analytics becomes slow, inconsistent, and reactive—limiting
                  leadership’s ability to act with confidence.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>Our Data-Centric Approach</BlockTitle>
                <Paragraph>
                  We design and implement scalable data architectures including
                  ETL pipelines, cloud data platforms, and analytics solutions
                  aligned to business objectives.
                </Paragraph>
                <Paragraph>
                  Our focus is on data quality, performance, and security—ensuring
                  insights are accurate, timely, and accessible to the right
                  stakeholders.
                </Paragraph>
                <Paragraph>
                  We help organizations move beyond historical reporting toward
                  predictive and forward-looking analytics.
                </Paragraph>
              </ContentBlock>

              <ContentBlock>
                <BlockTitle>What Organizations Gain</BlockTitle>
                <List>
                  <ListItem>
                    Real-time visibility into business performance
                  </ListItem>
                  <ListItem>
                    Improved forecasting and strategic planning
                  </ListItem>
                  <ListItem>
                    Stronger alignment between data, analytics, and business
                    strategy
                  </ListItem>
                </List>
              </ContentBlock>
            </LeftContent>

            {/* RIGHT IMAGES */}
            <RightImages>
              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  alt="Data analytics dashboard"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
                  alt="Data engineering pipelines"
                />
              </ImageCard>

              <ImageCard>
                <img
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
                  alt="Business intelligence and reporting"
                />
              </ImageCard>
            </RightImages>
          </ContentWrapper>

          {/* CTA */}
          <CTABanner>
            <CTAText>
              <CTATitle>Reliable data leads to confident decisions</CTATitle>
              <CTADesc>
                Let’s build a data platform you can trust.
              </CTADesc>
            </CTAText>

            <CTAButton>Build Your Data Platform</CTAButton>
          </CTABanner>
        </Container>
      </Section>
    </>
  );
};

export default DataEngineeringAnalytics;
