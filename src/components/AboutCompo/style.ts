import styled, { keyframes } from "styled-components";

// Keyframes for animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1.7;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 2;
    transform: translateX(0);
  }
`;

const imageZoom = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Section container
export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  background: linear-gradient(135deg, #f4fbff 0%, #ffffff 50%, #e6f7ff 100%);
  padding: 0 5%;
  border: 1px solid rgba(0, 150, 255, 0.1);
  border-radius: 12px;
  position: relative;

  @media (max-width: 1024px) {
    padding: 0 3%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 2%;
  }
`;

// Division container with animations
export const DivisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: relative;
  z-index: 1;
  padding-bottom: 80px;

  .row {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 25px;
    animation: ${fadeIn} 1s ease-in-out;

    &.row-1 {
      flex-direction: row;
    }

    &.row-2 {
      flex-direction: row-reverse;
    }

    & > div:first-child {
      flex: 0 0 30%;
      animation: ${imageZoom} 0.9s ease-in-out;
    }

    & > div:last-child {
      flex: 0 0 70%;
      text-align: left;
      animation: ${slideIn} 1.2s ease-in-out;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 2px solid rgba(0, 150, 255, 0.1);
      box-shadow: 0 6px 20px rgba(0, 150, 255, 0.15);
    }

    p {
      font-size: 22px;
      text-align: justify;
      line-height: 2.0;
      color: #2d2d2d;
      padding: 2px;
      font-family: "Uni Neue";
      opacity: 0;
      animation: ${fadeIn} 1s ease-in-out 0.3s forwards; /* Delayed fade-in */
    }

    @media (max-width: 1024px) {
      gap: 15px;
      margin-top: 40px;

      img {
        border-radius: 6px;
      }

      p {
        font-size: 20px;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;

      &.row-1,
      &.row-2 {
        flex-direction: column;
      }

      img {
        width: 90%;
        margin: 0 auto;
      }

      p {
        font-size: 18px;
        padding: 5px;
      }
    }
  }
`;

// Video with animation
export const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  display: block;
  border: 2px solid rgba(0, 150, 255, 0.1);
  box-shadow: 0 6px 15px rgba(0, 150, 255, 0.15);
  animation: ${imageZoom} 1.5s ease-in-out;

  @media (max-width: 1024px) {
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
  }
`;
