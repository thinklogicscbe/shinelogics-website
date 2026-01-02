import React from "react";
import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroDescription,
  HeroButton,
  MvpHeaderSection,
  MvpBadge,
  MvpTitle,
  MvpDescription,
  MvpPricingSection,
  PricingGrid,
  PricingCard,
  PricingButton,
  PricingGhostButton,
} from "./styles";





const Quickmvp: React.FC = () => {
  return (
    <>
      {/* HERO */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Launch Fast. Launch Smart.</HeroTitle>

          <HeroDescription>
            Need to bring your idea to life—fast and affordably? Our Quick MVP
            Development service is designed for startups, founders, and small
            businesses looking to build a simple website or mobile app to
            validate ideas, impress investors, or launch in record time.
          </HeroDescription>

          <HeroButton>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5L3 21l4.5-1.5L19 8c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0L4.5 16.5z" />
              <path d="M15 6l3 3" />
            </svg>
            Quick MVP Development
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* WHAT WE OFFER */}
      {/* <OfferSection>
        <OfferTitle>What We Offer</OfferTitle>

        <OfferGrid>
          <OfferCard>
            <OfferIcon>🚀</OfferIcon>
            <h3>Rapid MVP Development</h3>
            <p>
              Get your website or mobile app delivered in just 7–10 working days
            </p>
          </OfferCard>

          <OfferCard>
            <OfferIcon>🎨</OfferIcon>
            <h3>Sleek, Modern UI/UX</h3>
            <p>
              Clean, mobile-first design that works seamlessly across all
              devices
            </p>
          </OfferCard>

          <OfferCard>
            <OfferIcon>{"</>"}</OfferIcon>
            <h3>Cutting-Edge Tech</h3>
            <p>
              Built with React, Next.js, and Flutter for optimal performance
            </p>
          </OfferCard>

          <OfferCard>
            <OfferIcon>🌍</OfferIcon>
            <h3>Hosting & SEO Ready</h3>
            <p>Complete setup with domain configuration and SEO optimization</p>
          </OfferCard>

          <OfferCard>
            <OfferIcon>⚙️</OfferIcon>
            <h3>Customizable & Scalable</h3>
            <p>Easily extend your MVP as your business grows</p>
          </OfferCard>
        </OfferGrid>
      </OfferSection> */}

      {/* USE CASES */}
      {/* <UseCaseSection>
        <UseCaseTitle>Use Cases</UseCaseTitle>

        <UseCaseGrid>
          <UseCaseCard>
            <UseCaseIcon>▦</UseCaseIcon>
            <h3>High-Conversion Landing Pages</h3>
            <p>Perfect for marketing campaigns and product launches</p>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseIcon>📱</UseCaseIcon>
            <h3>Mobile Apps</h3>
            <p>Lightweight iOS/Android apps to validate core functionality</p>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseIcon>🗄</UseCaseIcon>
            <h3>Internal Dashboards</h3>
            <p>Tools for team collaboration and reporting</p>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseIcon>✏️</UseCaseIcon>
            <h3>Idea Validation</h3>
            <p>Test your concept in the real world quickly</p>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseIcon>🌐</UseCaseIcon>
            <h3>Global Market Trials</h3>
            <p>Deploy localized versions to assess market demand</p>
          </UseCaseCard>
        </UseCaseGrid>
      </UseCaseSection> */}

      {/* WHY CHOOSE SHINELOGICS */}
      {/* <WhySection>
        <WhyTitle>Why Choose Shinelogics?</WhyTitle>

        <WhyGrid>
          <WhyCard>
            <WhyIcon>⚡</WhyIcon>
            <h3>Speed with Quality</h3>
            <p>Rapid delivery without compromising on excellence</p>
          </WhyCard>

          <WhyCard>
            <WhyIcon>🧠</WhyIcon>
            <h3>Tech-First Approach</h3>
            <p>Deep experience in AI, ML, and scalable systems</p>
          </WhyCard>

          <WhyCard>
            <WhyIcon>🧩</WhyIcon>
            <h3>Custom Solutions</h3>
            <p>Tailored to your goals, audience, and vision</p>
          </WhyCard>

          <WhyCard>
            <WhyIcon>🤝</WhyIcon>
            <h3>End-to-End Support</h3>
            <p>Your dedicated tech partner from ideation to launch</p>
          </WhyCard>

          <WhyCard>
            <WhyIcon>🏢</WhyIcon>
            <h3>Trusted Experience</h3>
            <p>Proven track record with startups and enterprises</p>
          </WhyCard>
        </WhyGrid>
      </WhySection> */}

      {/* MVP PLANS HEADER */}
      <MvpHeaderSection>
        <MvpBadge>💲 MVP Plans & Pricing</MvpBadge>

        <MvpTitle>Choose Your MVP Plan</MvpTitle>

        <MvpDescription>
          Choose a plan that fits your vision and budget. Whether you're
          building a simple landing page or a mobile app prototype, we'll help
          you launch quickly and professionally.
        </MvpDescription>
      </MvpHeaderSection>

      {/* MVP PRICING CARDS */}
      <MvpPricingSection>
        <PricingGrid>
          <PricingCard accent="green">
            <h4>Basic Plan</h4>
            <h2>From $500</h2>
            <p className="subtitle">
              Perfect for single-page websites, landing pages, and simple MVPs.
            </p>

            <ul>
              <li>1-page responsive website or app</li>
              <li>Static content + contact form</li>
              <li>Hosted & deployed</li>
              <li>Delivered in 7 business days</li>
            </ul>

            <PricingButton>Request a Quote</PricingButton>
          </PricingCard>

          <PricingCard accent="blue" featured>
            <h4>Advanced Plan</h4>
            <h2>From $2,500</h2>
            <p className="subtitle">
              Best for multi-page websites or apps with backend functionality.
            </p>

            <ul>
              <li>Up to 5 pages/screens</li>
              <li>Custom design & branding</li>
              <li>CMS, login, forms</li>
              <li>API & database setup</li>
            </ul>

            <PricingButton>Request a Quote</PricingButton>
          </PricingCard>

          <PricingCard accent="gold">
            <h4>Custom Plan</h4>
            <h2>Let’s Talk</h2>
            <p className="subtitle">
              Fully tailored MVPs with advanced logic and integrations.
            </p>

            <ul>
              <li>Full consultation</li>
              <li>Custom feature development</li>
              <li>AI, analytics, workflows</li>
              <li>Priority support</li>
            </ul>

            <PricingButton secondary>Schedule Free Consultation</PricingButton>

            <PricingGhostButton>Use Custom Plan Form</PricingGhostButton>
          </PricingCard>
        </PricingGrid>
      </MvpPricingSection>
    </>
  );
};

export default Quickmvp;
