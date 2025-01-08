import styled from "styled-components";
import background from "../../assets/bg-hero.png";

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  // background-color: rgb(31, 101, 206); /* Fallback background color */
  padding: 0 5%;
  // background-image: url(${background}); /* Use the imported image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* Ensure the background image is centered */
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  .row {
    margin-top:60px;
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
    animation: fadeIn 1s ease forwards;

    &.row-1 {
      flex-direction: row; /* Image on the left */
      animation: slideFromLeft 5s ease forwards;
    }

    &.row-2 {
      flex-direction: row-reverse; /* Image on the right */
      animation: slideFromRight 5s ease forwards;
    }

    & > div:first-child {
      flex: 0 0 30%; /* Image container takes 30% */
      animation: slideImage 3s ease forwards;
    }

    & > div:last-child {
      flex: 0 0 70%; /* Text container takes 70% */
      text-align: left;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    p {
      font-size: 20px;
      font-weight:bold;
      color:black;
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
`;