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
  gap: 90px;
  overflow-x: auto;
  background: rgb(133, 182, 249);
  padding: 20px;
  width: 100%;
  white-space: nowrap;
  scroll-behavior: smooth;
  justify-content: center; /* Center the ServiceBoxes horizontally */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 10px;
    padding: 15px;
    justify-content: flex-start; /* Allow scrolling horizontally on mobile */
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
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards; /* Apply animation on load */

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

export const DescriptionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
  max-width: 100%;
  animation: fadeInScale 1.5s ease-in-out forwards;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.02);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
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
