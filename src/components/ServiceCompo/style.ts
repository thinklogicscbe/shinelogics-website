import styled from "styled-components";

interface DescriptionBoxProps {
  isEven: boolean;
}

interface DescriptionRowProps {
  delay?: string;
}

export const SectionContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  height: auto;
  font-family: 'Poppins', sans-serif;
`;


export const SliderContainer = styled.div`
  display: flex;
  gap: 36px;
  overflow-x: auto;
  padding: 30px 0 60px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* ================= ITEM WRAPPER ================= */

export const ServiceItem = styled.div`
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

/* ================= CARD ================= */

export const ServiceBox = styled.div<{ active?: boolean }>`
  width: 260px;
  height: 160px;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;

  background: linear-gradient(135deg, #ffffff, #eef2ff);
  border: 2px solid ${({ active }) => (active ? "#6366f1" : "#e5e7eb")};

  box-shadow: ${({ active }) =>
    active
      ? "0 35px 90px rgba(99,102,241,.45)"
      : "0 20px 50px rgba(0,0,0,.08)"};

  transform: ${({ active }) => (active ? "translateY(-8px)" : "none")};

  transition: all 0.35s ease;

  opacity: 0;
  animation: fadeUp 0.8s ease forwards;

  &:hover {
    transform: translateY(-12px) scale(1.05);
    box-shadow: 0 40px 110px rgba(99, 102, 241, 0.55);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 210px;
    height: 130px;
  }
`;

/* ================= TITLE ================= */

export const ServiceTitle = styled.h3<{ active?: boolean }>`
  max-width: 240px;
  text-align: center;

  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.4;

  color: ${({ active }) => (active ? "#4338ca" : "#111827")};

  transition: color 0.3s ease;
`;



export const Title = styled.h2`
  font-size: 2.0rem;
  font-weight: bold;
  color: rgb(2, 45, 99);
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center; /* Center the title horizontally with respect to ServiceBox */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const DetailsContainer = styled.div`
  margin-top: 30px;
  padding: 30px;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;



/* ================= GRID ================= */

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 50px;

  /* 🔑 THIS IS THE FIX */
  justify-items: center;   /* center cards when fewer */
  align-items: stretch;

  /* Prevent single card from stretching full width */
  & > * {
    max-width: 380px;
    width: 100%;
  }
`;


/* ================= CARD ================= */

export const ServiceCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #e5e7eb;

  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.08);
  transform: translateY(30px);
  opacity: 0;

  animation: cardReveal 0.8s ease forwards;

  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 45px 120px rgba(99, 102, 241, 0.35);
  }

  @keyframes cardReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* ================= IMAGE ================= */

export const CardImage = styled.div`
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${ServiceCard}:hover & img {
    transform: scale(1.08);
  }
`;

/* ================= CONTENT ================= */

export const CardContent = styled.div`
  padding: 28px 26px 32px;
`;


export const DescriptionRow =
  styled.div <
  DescriptionRowProps >
  `
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUpCinematic 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${props => props.delay || "0.5s"};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @keyframes slideUpCinematic {
    0% {
      opacity: 0;
      transform: translateY(80px);
    }
    50% {
      opacity: 0.5;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DescriptionBox =
  styled.div <
  DescriptionBoxProps >
  `
  display: flex;
  padding: 30px;
  gap: 30px;
  flex-direction: ${props => (props.isEven ? "row-reverse" : "row")};
  justify-content: center;
  opacity: 0;
  transform: translateY(50px);
  animation: ${props =>
    props.isEven
      ? "imageSlideLeftCinematic"
      : "imageSlideRightCinematic"} 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;

  @keyframes imageSlideRightCinematic {
    0% {
      opacity: 0;
      transform: translateX(120px);
    }
    60% {
      opacity: 0.7;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes imageSlideLeftCinematic {
    0% {
      opacity: 0;
      transform: translateX(-120px);
    }
    60% {
      opacity: 0.7;
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 1.1rem;
  line-height: 2.0;
  color: #555;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  animation: textFadeInUp 1.8s ease-in-out forwards;

  @keyframes textFadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
export const DescriptionText1 = styled.ul`
  list-style: none; /* we will design our own bullets */
  padding: 0;
  margin: 0;

  font-size: 1.05rem;
  line-height: 1.9;
  color: #555;
  text-align: left;

  animation: textFadeInUp 1.6s ease-in-out forwards;

  li {
    position: relative;
    padding-left: 26px;
    margin-bottom: 12px;
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.4rem;
    line-height: 1.2;
    color: #6366f1; /* accent color */
  }

  @keyframes textFadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

export const DescriptionTitle = styled.h6`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  animation: titleZoomIn 1.5s ease-in-out forwards;

  @keyframes titleZoomIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;


/* ================= CTA ================= */

export const CTAWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

export const CTAButton = styled.button`
  padding: 16px 36px;
  border-radius: 999px;
  border: none;

  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3px;

  color: #ffffff;
  background: #0B1D45;

  cursor: pointer;
  transition: all 0.35s ease;

  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.35);

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 30px 80px rgba(99, 102, 241, 0.55);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
`;

