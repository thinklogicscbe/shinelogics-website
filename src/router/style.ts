import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column; /* Align the dots and text vertically */
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); /* Slightly transparent background */
  z-index: 9999; /* Ensure it's on top */
  pointer-events: none; /* Allow clicks to pass through while loading */
`;

export const Dot = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: blue;
  animation: ${bounce} 1.5s infinite alternate;
`;

export const Dot1 = styled(Dot)`
  animation-delay: 0s;
`;

export const Dot2 = styled(Dot)`
  animation-delay: 0.2s;
`;

export const Dot3 = styled(Dot)`
  animation-delay: 0.4s;
`;

export const LoaderText = styled.div`
  margin-top: 10px; /* Adds some space between dots and text */
  font-size: 18px;
  color: #007BFF; /* You can change the color to match your theme */
  font-weight: bold;
  text-align: center;
`;
