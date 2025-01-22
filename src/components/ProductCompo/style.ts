import styled from "styled-components";
/* SectionContainer */

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto; /* Adjusted to fit content */
  padding: 0 8%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 60px;
`;

/* DivisionContainer */
export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px; /* Increased gap for even spacing between rows */

  .img1,
  .img2 {
    width: 180px; /* Reduced image width */
    height: 180px; /* Set a fixed height */
    object-fit: cover; /* Maintain aspect ratio without distortion */
    border-radius: 8px;
  }

  .content {
    font-size: 30px;
  }

  .row1-h2,
  .row2-h2 {
    font-size: 20px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .row.visible {
    opacity: 1;
    animation: fadeIn 1s ease forwards; /* Trigger fade-in animation */
  }

  /* Row-specific styles */
  &.row-1 {
    flex-direction: row; /* Image on the left */
    animation: slideFromLeft 5s ease forwards;
  }

  &.row-2 {
    flex-direction: row-reverse; /* Image on the right */
    animation: slideFromRight 5s ease forwards;
  }

  &.row-3 {
    flex-direction: row; /* Image on the left */
    animation: slideFromLeft 5s ease forwards;
  }

  &.row-4 {
    flex-direction: row-reverse; /* Image on the right */
    animation: slideFromRight 5s ease forwards;
  }

  & > div:first-child {
    flex: 0 0 30%; /* Image container takes 30% */
    animation: slideImage 3s ease forwards;
  }

  & > div:last-child {
    flex: 0 0 60%; /* Reduced text width to 60% */
    text-align: left;
  }

  p {
    font-size: 18px;
    font-weight: bold;
    color: black;
    line-height: 1.6;
    margin: 0;
    overflow: hidden;
  }

  .line {
    display: block;
    transform: translateY(100%);
    opacity: 0;
    animation: slideUp 0.5s ease forwards;
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
      align-items: center;
      gap: 40px; /* Adjust spacing for smaller screens */
    }
    .img1,
    .img2 {
      width: 120px; /* Adjust image size */
      height: 120px;
    }
    p,
    .content {
      font-size: 16px; /* Adjust font size */
    }
  }

  /* Animations */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideImage {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 468px) {
    .row {
      flex-direction: column;
      align-items: center;
      gap: 20px; /* Reduced gap for smaller screens */
    }
    .img1,
    .img2 {
      width: 100px; /* Adjusted image size for smaller devices */
      height: 100px;
    }
    .content,
    p {
      font-size: 14px; /* Smaller font size for better readability on mobile */
      text-align: center; /* Center-align text for better visual alignment */
    }
    .row > div:first-child {
      width: 100%; /* Image takes full width */
      text-align: center; /* Center-align images */
    }
    .row > div:last-child {
      width: 100%; /* Content takes full width */
      text-align: center; /* Center-align text */
    }
    .heading-content {
      width: 90%; /* Reduce width to fit mobile screens */
      height: auto; /* Adjust height dynamically */
      padding: 10px; /* Reduce padding for compact design */
    }
    .heading-content h1 {
      font-size: 2rem; /* Adjusted font size for headers */
    }
    .heading-content p {
      font-size: 1rem; /* Adjusted font size for paragraph */
    }
  }
`;

export const MainContainer = styled.div`
  .heading-container {
    width: 100%;
    margin-top: 140px;
  }

  .heading-banner {
    position: relative;
    width: 100%;
    height: 400px; /* Adjust height as needed */
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Add an overlay */
    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5); /* Semi-transparent white overlay */
      z-index: 1;
    }
  }

  .heading-content {
    position: relative;
    z-index: 2; /* Ensure the content is above the overlay */
    text-align: center;
    padding: 20px;
    background: rgba(
      255,
      255,
      255,
      0.8
    ); /* Semi-transparent white background for text */
    border-radius: 8px;
    width: 60%;
    height: 60%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Optional: Adds a subtle shadow */
  }

  .heading-content h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: bold;
    color: #18216d; /* Text color */
  }

  .heading-content p {
    font-size: 1.2rem;
    line-height: 1.6;
    font-weight: 600;
    color: black; /* Text color */
  }

  /* Responsive Media Queries */
  @media (max-width: 768px) {
    .heading-banner {
      height: 300px; /* Reduce banner height for tablets and smaller devices */
    }
    .heading-content {
      width: 80%; /* Increase width for better readability */
      height: auto; /* Adjust height to fit content */
      padding: 15px; /* Reduce padding */
    }
    .heading-content h1 {
      font-size: 2rem; /* Adjust font size for headers */
    }
    .heading-content p {
      font-size: 1rem; /* Adjust font size for paragraph */
    }
  }

  @media (max-width: 468px) {
    .heading-banner {
      height: 200px; /* Further reduce banner height for smaller screens */
    }
    .heading-content {
      width: 90%; /* Maximize content width on mobile */
      height: auto; /* Auto height to fit content */
      padding: 10px; /* Further reduce padding */
    }
    .heading-content h1 {
      font-size: 1.5rem; /* Adjust font size for smaller headers */
    }
    .heading-content p {
      font-size: 0.9rem; /* Adjust font size for smaller paragraphs */
    }
  }
`;
