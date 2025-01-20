import styled from "styled-components";

export const SectionContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  height: auto;
  font-family: 'Poppins', sans-serif;
`;

export const SliderContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  background: #c7dcfc;
  padding: 20px;
  width: 100%;
  white-space: nowrap;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 10px;
    padding: 15px;
  }
`;

export const ServiceBox = styled.div`
  flex: 0 0 auto;
  width: 220px;
  height: 150px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 120px;
    font-size: 1rem;
  }
`;

export const DetailsContainer = styled.div`
  margin-top: 30px;
  padding: 30px;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
  transition: transform 0.5s ease, opacity 0.5s ease;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fae102;
  margin-top: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const DescriptionRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 20px;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 2s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.3s;
  }
  &:nth-child(2) {
    animation-delay: 0.6s;
  }
  &:nth-child(3) {
    animation-delay: 0.9s;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DescriptionTitle = styled.h6`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const DescriptionText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
