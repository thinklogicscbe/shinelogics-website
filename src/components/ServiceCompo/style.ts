import styled, { keyframes } from "styled-components";

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
  background:rgb(133, 182, 249);
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
  animation: fadeInUp 1s ease-out forwards;  /* Apply animation on load */
  
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #fae102;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center; /* Center the title horizontally with respect to ServiceBox */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const DescriptionImage = styled.img`
  width: 100%; // Ensure images fill the width of the box
  height: 200px; // Fixed height for all images
  object-fit: cover; // Ensure the image covers the area without stretching
  border-radius: 8px; // Optional: rounded corners for the image
  margin-bottom: 20px; // Space below the image
  max-width: 100%; // Prevent images from exceeding the container width
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

export const DescriptionRow = styled.div<DescriptionRowProps>`
  display: flex;
  flex-direction: row; // Stack horizontally by default
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 2s ease-out forwards;
  animation-delay: ${(props) => props.delay || "1s"}; // Use delay prop here
  
  @media (max-width: 768px) {
    flex-direction: column; // Stack elements vertically on small screens
    align-items: center;
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

export const DescriptionBox = styled.div<DescriptionBoxProps>`
  display: flex;
  padding: 30px;
  gap: 30px;
  flex-direction: ${(props) => (props.isEven ? "row-reverse" : "row")};
  justify-content: center;
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isEven ? "imageFromLeft" : "imageFromRight")} 1.5s ease-out forwards;

  @keyframes imageFromRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes imageFromLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
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
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  animation: textFromBottom 2s ease-out forwards;

  @keyframes textFromBottom {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
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
`;

const smoothSlideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const smoothSlideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AdditionalContainers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
`;

export const ContainerBox = styled.div<{ $isLeft: boolean; $delay: number }>`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateX(${({ $isLeft }) => ($isLeft ? "-50px" : "50px")});
  animation: ${({ $isLeft }) => ($isLeft ? smoothSlideInLeft : smoothSlideInRight)}
    1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;

export const ContainerTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 15px;
`;

export const ContainerText = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
`;