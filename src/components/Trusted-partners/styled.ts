import styled, { keyframes } from "styled-components";

/* ================= ANIMATION ================= */

const marqueeLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

/* ================= SECTION ================= */

export const Section = styled.section`
  padding: 6rem 6%;
  background: #ffffff;
  color: #020617;
  overflow: hidden;
`;

/* ================= HEADER ================= */

export const Header = styled.div`
  max-width: 900px;
  margin: 0 auto 4.5rem;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 29px;
  font-weight: bold;
  color: #003366;
`;

export const Subtitle = styled.p`
  max-width: 720px;
  margin: 0 auto 3rem auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #3a4048ff;
  font-weight: 700;
  font-size: 16px;
`;

/* ================= SLIDER ================= */

export const CardsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const CardsGrid = styled.div`
  display: flex;
  gap: 2.5rem;
  width: max-content;

  animation: ${marqueeLeft} 38s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

/* ================= CARD ================= */

export const PartnerCard = styled.div`
  min-width: 260px;
  padding: 2.4rem 2rem;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  text-align: center;

  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 35px 90px rgba(37, 99, 235, 0.25);
  }
`;

/* ================= LOGO ================= */

export const LogoWrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
`;

export const PartnerLogo = styled.img`
  max-height: 42px;
  max-width: 120px;
  object-fit: contain;
  transition: transform 0.35s ease;

  ${PartnerCard}:hover & {
    transform: scale(1.12);
  }
`;

/* ================= TEXT ================= */

export const PartnerName = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: #020617;
  margin-bottom: 0.4rem;
`;

export const PartnerDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #64748b;
`;
