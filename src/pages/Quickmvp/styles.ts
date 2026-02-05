import styled from "styled-components";

/* ===== HERO ===== */

export const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 6%;
  background: linear-gradient(135deg, #f5f3ff, #ffffff);
`;

export const HeroContent = styled.div`
  max-width: 920px;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.8rem;
  letter-spacing: -0.02em;
`;

export const HeroDescription = styled.p`
  font-size: clamp(1.05rem, 1.4vw, 1.25rem);
  line-height: 1.85;
  color: #4b5563;
  max-width: 820px;
  margin: 0 auto 3rem;
`;

export const HeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: 14px;
  background: #0b1d45;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 14px 35px rgba(99, 102, 241, 0.35);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 45px rgba(99, 102, 241, 0.45);
  }
`;

/* ===== SECTIONS ===== */

export const OfferSection = styled.section`
  padding: 6rem 6%;
  background: #ffffff;
`;

export const UseCaseSection = OfferSection;
export const WhySection = OfferSection;
export const MvpPricingSection = OfferSection;

export const MvpHeaderSection = styled.section`
  padding: 7rem 6% 4rem;
  text-align: center;
  background: #ffffff;
`;

/* ===== TITLES ===== */

export const OfferTitle = styled.h2`
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  color: #0b1d45;
  margin-bottom: 4rem;
`;

export const UseCaseTitle = OfferTitle;
export const WhyTitle = OfferTitle;

export const MvpTitle = styled.h2`
  font-size: clamp(2.6rem, 5vw, 3.4rem);
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.2rem;
`;

export const MvpDescription = styled.p`
  max-width: 760px;
  margin: 0 auto;
  color: #4b5563;
  font-size: 1.05rem;
  line-height: 1.7;
`;

export const MvpBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: #ede9fe;
  color: #0b1d45;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

/* ===== GRIDS ===== */

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== PRICING CARDS ===== */

export const PricingCard = styled.div<{
  featured?: boolean;
  accent?: "green" | "blue" | "gold";
}>`
  position: relative;
  padding: 3.2rem 2.8rem;
  border-radius: 28px;
  background: #ffffff;

  border: 2px solid
    ${({ accent }) =>
      accent === "green"
        ? "#22c55e"
        : accent === "blue"
        ? "#6366f1"
        : accent === "gold"
        ? "#facc15"
        : "#e5e7eb"};

  box-shadow: ${({ featured }) =>
    featured
      ? "0 40px 120px rgba(99,102,241,.35)"
      : "0 18px 60px rgba(0,0,0,.12)"};

  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  &::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: ${({ accent }) =>
      accent === "green"
        ? "linear-gradient(135deg, transparent, rgba(34,197,94,.45), transparent)"
        : accent === "blue"
        ? "linear-gradient(135deg, transparent, rgba(99,102,241,.55), transparent)"
        : "linear-gradient(135deg, transparent, rgba(250,204,21,.55), transparent)"};
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-12px)
      ${({ featured }) => (featured ? "scale(1.04)" : "scale(1.02)")};
    box-shadow: 0 60px 160px rgba(99, 102, 241, 0.35);
  }

  &:hover::before {
    opacity: 1;
  }

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin-bottom: 0.8rem;
    color: ${({ accent }) =>
      accent === "green"
        ? "#16a34a"
        : accent === "blue"
        ? "#4f46e5"
        : "#ca8a04"};
  }

  h2 {
    font-size: 2.4rem;
    font-weight: 900;
    color: #111827;
    margin-bottom: 0.8rem;
  }

  .subtitle {
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 2.4rem;

    li {
      padding-left: 1.4rem;
      margin-bottom: 0.75rem;
      color: #374151;
      font-size: 0.95rem;

      &::before {
        content: "✓";
        margin-right: 0.5rem;
        font-weight: 700;
        color: ${({ accent }) =>
          accent === "green"
            ? "#16a34a"
            : accent === "blue"
            ? "#4f46e5"
            : "#ca8a04"};
      }
    }
  }
`;

/* ===== BUTTONS ===== */

export const PricingButton = styled.button<{ secondary?: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;

  background: ${({ secondary }) =>
    secondary ? "#f3f4f6" : "#0b1d45"};
  color: ${({ secondary }) => (secondary ? "#111827" : "#ffffff")};

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

export const PricingGhostButton = styled.button`
  width: 100%;
  margin-top: 0.9rem;
  padding: 0.85rem;
  background: rgba(250, 204, 21, 0.08);
  border: 1px dashed #facc15;
  border-radius: 14px;
  color: #92400e;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(250, 204, 21, 0.15);
    transform: translateY(-2px);
  }
`;
