import styled, { keyframes } from "styled-components";

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
  flex-wrap: wrap; // Allow wrapping of elements for smaller screens
  justify-content: center; // Center the content in the row
  gap: 90px; // Add consistent spacing between the boxes
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 2s ease-out forwards;

  @media (max-width: 768px) {
    flex-direction: column; // Stack the elements vertically on small screens
    align-items: center; // Center the items when stacked
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
  text-align: center; // Center-align the title text

  @media (max-width: 768px) {
    font-size: 1.1rem; // Adjust title size for smaller screens
  }
`;

export const DescriptionText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  text-align: center; // Center-align the description text
  margin-top: 10px; // Add space above the text

  @media (max-width: 768px) {
    font-size: 0.9rem; // Smaller text on mobile screens
  }
`;
export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally
  justify-content: flex-start;
  width: 100%;
  max-width: 320px; // Set a max width for each box
  margin-bottom: 20px; // Add space between each box
  padding: 15px; // Padding around content inside each box
  background-color: #f9f9f9; // Optional: a background to differentiate the sections
  border-radius: 10px; // Add rounded corners
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // Soft shadow for depth

  @media (max-width: 768px) {
    max-width: 100%; // Allow the boxes to use full width on smaller screens
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