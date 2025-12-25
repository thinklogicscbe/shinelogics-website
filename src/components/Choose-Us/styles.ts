import styled from "styled-components";

export const WhyChooseContainer = styled.section`
  padding: 5rem 6%;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  text-align: center;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #0b1d45;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  max-width: 720px;
  margin: 0 auto 3rem auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.8rem;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h3 {
    font-size: 1.1rem;
    color: #0b1d45;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #4a5568;
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
  }
`;

export const CTASection = styled.div`
  margin-top: 3.5rem;
`;

export const CTAButton = styled.button`
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #0b1d45;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #004fcc;
    box-shadow: 0 12px 30px rgba(0, 79, 204, 0.35);
  }
`;
