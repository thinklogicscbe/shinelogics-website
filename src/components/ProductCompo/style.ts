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
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;

  .row {
    display: flex;
    width: 100%;
    gap: 20px;
    opacity: 0;
    animation: rowAnimation 1s ease forwards;

    /* Stagger the row animation */
    &.row-1 {
      animation-delay: 0s;
    }
    &.row-2 {
      animation-delay: 0.5s;
    }
    &.row-3 {
      animation-delay: 1s;
    }

    & img {
      width: 100%;
      max-width: 300px;
      height: auto;
      border-radius: 8px;
    }

    & p {
      font-size: 18px;
      line-height: 1.6;
    }
  }

  @keyframes rowAnimation {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;