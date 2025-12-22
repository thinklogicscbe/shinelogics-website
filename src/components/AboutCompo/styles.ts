import styled from "styled-components";

/* ===== Layout ===== */
export const Section = styled.section`
  padding: 7rem 6%;
  background: linear-gradient(180deg, #f8fafc, #ffffff);
`;

export const Intro = styled.div`
  max-width: 860px;
  margin-bottom: 5rem;
`;

/* ===== Typography ===== */
export const Eyebrow = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #2563eb;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  margin: 0.8rem 0 1.4rem;
  color: #020617;
`;

export const TitleSmall = styled.h3`
  font-size: 2.1rem;
  margin-bottom: 1.2rem;
  color: #020617;
`;

export const Description = styled.p`
  font-size: 1.08rem;
  line-height: 1.85;
  color: #475569;
`;

/* ===== Mission / Vision ===== */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: 3rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 25px 60px rgba(2, 6, 23, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 40px 80px rgba(2, 6, 23, 0.12);
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: #020617;
`;

export const CardText = styled.p`
  color: #475569;
  line-height: 1.7;
`;

/* ===== Services / What We Do ===== */
export const ServicesSection = styled.section`
  margin: 6rem 0;
  padding: 4.5rem 4rem;
  border-radius: 28px;
  background: linear-gradient(135deg, #ffffff, #f1f5ff);
  box-shadow: 0 30px 80px rgba(2, 6, 23, 0.08);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const ServicesHeader = styled.div`
  max-width: 720px;
  margin-bottom: 3.5rem;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  padding: 2.4rem;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 35px 70px rgba(2, 6, 23, 0.12);
  }

  h4 {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
    color: #020617;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #64748b;
  }
`;

/* ===== Values ===== */
export const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 6rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Value = styled.div`
  padding: 2rem;
  border-radius: 18px;
  background: #ffffff;
  border-left: 5px solid #2563eb;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.06);

  h4 {
    color: #020617;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.95rem;
    color: #64748b;
  }
`;

/* ===== Testimonials ===== */
export const Testimonials = styled.div`
  padding: 5rem 4rem;
  border-radius: 28px;
  background: linear-gradient(135deg, #eff6ff, #ffffff);
  margin-bottom: 6rem;
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Quote = styled.div`
  padding: 2.5rem;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 30px 70px rgba(2, 6, 23, 0.08);
  position: relative;

  &::before {
    content: "“";
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 4rem;
    color: #2563eb;
  }

  strong {
    display: block;
    margin-top: 1.4rem;
    color: #020617;
  }

  span {
    font-size: 0.85rem;
    color: #2563eb;
    font-weight: 600;
  }
`;

/* ===== CTA ===== */
export const CTA = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border-radius: 30px;
  background: linear-gradient(135deg, #020617, #1e40af);
  color: #ffffff;
  box-shadow: 0 40px 90px rgba(2, 6, 23, 0.35);

  h3 {
    font-size: 2.2rem;
    margin-bottom: 1.8rem;
    color : white;
  }

  button {
    padding: 1rem 3.5rem;
    border-radius: 60px;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    color: #020617;
    background: linear-gradient(135deg, #ffffff, #e0f2fe);
    cursor: pointer;
    transition: all 0.35s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(255, 255, 255, 0.35);
    }
  }
`;




/* ===== Industries ===== */

export const IndustriesSection = styled.section`
  margin: 6rem 0;
  padding: 4.5rem 4rem;
  border-radius: 28px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  box-shadow: 0 30px 80px rgba(2, 6, 23, 0.08);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const IndustriesHeader = styled.div`
  max-width: 720px;
  margin-bottom: 3.5rem;
`;

export const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const IndustryCard = styled.div`
  padding: 2.2rem;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.12);
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 35px 70px rgba(2, 6, 23, 0.12);
  }

  h4 {
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
    color: #020617;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #64748b;
  }
`;

export const IndustriesCTA = styled.div`
  margin-top: 4rem;
  text-align: center;

  button {
    padding: 1rem 3.5rem;
    border-radius: 60px;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(135deg, #2563eb, #1e40af);
    cursor: pointer;
    transition: all 0.35s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(37, 99, 235, 0.45);
    }
  }
`;

