import styled from "styled-components";

/* ================= HERO ================= */

export const HeroSection = styled.section`
  position: relative;
  min-height: 420px;
  height: 55vh;
  max-height: 620px;

  background-image: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085");
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    min-height: 340px;
    height: 60vh;
  }

  @media (max-width: 480px) {
    min-height: 300px;
    height: auto;
    padding: 60px 0;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
`;

export const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  color: white;
`;

export const HeroTitle = styled.h1`
  color: #ffffff;

  font-size: clamp(32px, 5vw, 54px);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 12px;

  /* Tablet */
  @media (max-width: 768px) {
    line-height: 1.2;
  }

  /* Mobile */
  @media (max-width: 480px) {
    font-size: clamp(28px, 7vw, 34px);
    line-height: 1.25;
    text-align: center;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(15px, 2vw, 18px);
  max-width: 620px;
  color: #e5e7eb;
`;

/* ================= LAYOUT ================= */

export const Section = styled.section`
  padding: clamp(64px, 8vw, 96px) 20px;
  background: #ffffff;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: clamp(40px, 6vw, 64px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftContent = styled.div``;

/* ================= RIGHT IMAGES ================= */

export const RightImages = styled.div`
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    position: static;
    flex-direction: row;
    gap: 16px;

    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    padding-bottom: 12px;

    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome */
    }
  }
`;

export const ImageCard = styled.div`
  min-width: 260px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(2, 6, 23, 0.15);

  img {
    width: 100%;
    height: clamp(180px, 22vw, 240px);
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1024px) {
    min-width: 100%;
    flex: 0 0 100%;
    scroll-snap-align: start;
  }
`;

/* ================= CONTENT ================= */

export const Heading = styled.h2`
  font-size: clamp(26px, 4vw, 32px);
  font-weight: 700;
  margin-bottom: clamp(32px, 5vw, 48px);
  color: #0f172a;
`;

export const ContentBlock = styled.div`
  margin-bottom: clamp(36px, 6vw, 52px);
`;

export const BlockTitle = styled.h3`
  font-size: clamp(19px, 3vw, 22px);
  font-weight: 600;
  margin-bottom: 12px;
`;

export const Paragraph = styled.p`
  font-size: clamp(15px, 2.5vw, 17px);
  line-height: 1.8;
  color: #475569;
  margin-bottom: 14px;
`;

export const List = styled.ul`
  padding-left: 20px;
`;

export const ListItem = styled.li`
  font-size: clamp(15px, 2.5vw, 17px);
  margin-bottom: 10px;
`;

/* ================= CTA ================= */

export const CTABanner = styled.div`
  margin-top: clamp(72px, 10vw, 100px);
  padding: clamp(32px, 6vw, 56px);
  background: #0f172a;
  border-radius: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const CTAText = styled.div`
  color: white;
`;

export const CTATitle = styled.h3`
  font-size: clamp(22px, 4vw, 26px);
  margin-bottom: 10px;
`;

export const CTADesc = styled.p`
  font-size: clamp(14px, 2.5vw, 16px);
  color: #cbd5f5;
`;

export const CTAButton = styled.button`
  padding: 14px 38px;
  font-weight: 600;
  font-size: 16px;
  background: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: #e0e7ff;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
