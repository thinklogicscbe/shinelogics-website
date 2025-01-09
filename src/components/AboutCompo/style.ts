import styled from "styled-components";

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  background-color: rgb(242, 244, 246); /* Fallback background color */
  padding: 0 5%;
`;

export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  .row {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
    animation: fadeIn 1s ease forwards;

    &.row-1 {
      flex-direction: row; /* Image on the left */
    }

    &.row-2 {
      flex-direction: row-reverse; /* Image on the right */
      animation: slideFromRight 2s ease forwards;
    }

    & > div:first-child {
      flex: 0 0 30%; /* Image container takes 30% */
      animation: slideFromLeft 2s ease forwards;
    }

    & > div:last-child {
      flex: 0 0 70%; /* Text container takes 70% */
      text-align: left;
      animation: slideContentFromRight 2s ease forwards;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    p {
      font-size: 20px;
      font-weight: bold;
      color: black;
      line-height: 1.6;
      margin: 0;
      overflow: hidden;
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

  @keyframes slideContentFromRight {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideUp {
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
