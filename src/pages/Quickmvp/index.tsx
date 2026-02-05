import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

// 🔥 IMPORT YOUR EXISTING MODAL
import CustomPlanForm from "../CustomPlanForm";

type QuickMvpPlan = {
  _id: string;
  title: string;
  price: string;
  subtitle: string;
  accent: "green" | "blue" | "gold";
  featured: boolean;
  features: string[];
  cta: string;
  ghostCta?: string;
};

const Quickmvp: React.FC = () => {
  const [plans, setPlans] = useState<QuickMvpPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 STATE FOR CUSTOM PLAN POPUP
  const [showCustomPlan, setShowCustomPlan] = useState(false);

  const API = `${process.env.REACT_APP_BACKEND_URL}/quick-mvp-plans`;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setPlans(data.data || []);
      } catch (err) {
        console.error("Failed to load Quick MVP plans");
        toast.error("Failed to load MVP plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [API]);

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
          {loading && <p>Loading plans...</p>}

          {!loading &&
            plans.map((plan) => (
              <PricingCard
                key={plan._id}
                accent={plan.accent}
                featured={plan.featured}
              >
                <h4>{plan.title}</h4>
                <h2>{plan.price}</h2>

                <p className="subtitle">{plan.subtitle}</p>

                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                <PricingButton secondary={plan.accent === "gold"}>
                  {plan.cta}
                </PricingButton>

                {/* 🔥 CUSTOM PLAN FORM BUTTON */}
                {plan.ghostCta && (
                  <PricingGhostButton
                    onClick={() => {
                      setShowCustomPlan(true);
                      toast.info("Please fill the custom plan form");
                    }}
                  >
                    {plan.ghostCta}
                  </PricingGhostButton>
                )}
              </PricingCard>
            ))}
        </PricingGrid>
      </MvpPricingSection>

      {/* 🔥 CUSTOM PLAN MODAL */}
      <CustomPlanForm
        open={showCustomPlan}
        onClose={() => setShowCustomPlan(false)}
      />
    </>
  );
};

export default Quickmvp;
