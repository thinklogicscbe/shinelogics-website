import styled from "styled-components";

export const CTAWrapper = styled.section`
  padding: 4.5rem 6%;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const CTABox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 3.5rem;
  border-radius: 14px;
  background: #f4f8ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border-left: 6px solid #0b1d45;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 2rem;
    border-left: none;
    border-top: 6px solid #0b1d45;
  }
`;

export const TextBlock = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  font-size: 2.1rem;
  font-weight: 700;
  color: #0b1d45;
  line-height: 1.3;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const Description = styled.p`

  max-width: 720px;
  font-size: 1rem;
  line-height: 1.6;
  color: #3a4048ff;
  font-weight: 700;
  font-size: 16px;
`;

export const ButtonBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const CTAButton = styled.button`
  padding: 0.85rem 2.6rem;
  font-size: 1rem;
  border-radius: 50px;
  border: none;
  background-color: #0b1d45;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #004fcc;
    box-shadow: 0 10px 28px rgba(0, 79, 204, 0.35);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }
`;
