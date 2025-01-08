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
  gap: 20px;
  margin-top: 20px;

  .row {
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: center; /* Align image and content vertically */
    position: relative;

    &.row-1 {
      flex-direction: row; /* Image on the left */
    }

    &.row-2 {
      flex-direction: row-reverse; /* Image on the right */
    }

    & > div:first-child {
      flex: 0 0 30%; /* Image takes 30% of the row */
      max-width: 30%;
      animation: slideFromSide 1s ease forwards;
    }

    & > div:last-child {
      flex: 0 0 70%; /* Content takes 70% of the row */
      max-width: 70%;
      animation: slideFromBottom 1s ease forwards;
      text-align: left; /* Align text to the left */
    }

    & img {
      width: 100%; /* Ensure the image takes full width of its container */
      height: auto;
      border-radius: 8px;
    }

    & p {
      font-size: 18px;
      line-height: 1.6;
    }
  }

  /* Animations */
  @keyframes slideFromSide {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideFromBottom {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;