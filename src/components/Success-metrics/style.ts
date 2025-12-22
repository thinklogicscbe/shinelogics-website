import styled from "styled-components";

export const MetricsContainer = styled.section`
  padding: 4rem 6%;
  background: linear-gradient(135deg, #0b1d45, #003366);
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const MetricsContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

export const MetricHighlight = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1rem;
  color : #ffffff;

  span {
    color: #5fd1ff;
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 2.5rem auto;

  strong {
    color: #ffffff;
  }
`;

export const CTAButton = styled.button`
  padding: 0.85rem 2.4rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #5fd1ff;
  color: #0b1d45;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 12px 30px rgba(95, 209, 255, 0.35);
  }
`;
