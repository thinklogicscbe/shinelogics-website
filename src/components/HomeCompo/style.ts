import styled from "styled-components";
import background from "../../assets/bg-hero.png";

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  background-color: rgb(31, 101, 206); /* Fallback background color */
  padding: 0 5%;
  background-image: url(${background}); /* Use the imported image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* Ensure the background image is centered */
`;

export const TextContainer = styled("div")`
  max-width: 50%;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column; /* Ensure the text content stacks vertically */
  justify-content: center; /* Center text vertically within the container */

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;

    button {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:first-child {
        background-color: white;
        color: #0066ff;
      }

      &:last-child {
        background-color: transparent;
        color: white;
        border: 2px solid white;
      }
    }
  }
`;

export const ImageContainer = styled("div")`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end; /* Align the image to the baseline */
  
  img {
    width: 100%; /* Adjust size as needed */
    max-width: 600px;
    height: auto;
  }

  span {
    margin-right: 10px;
    font-size: 1.2rem;
    align-self: baseline; /* Align text baseline with the image */
  }
`;
