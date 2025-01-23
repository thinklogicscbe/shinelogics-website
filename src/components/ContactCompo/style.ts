import styled from "styled-components";
import background from "../../assets/bg-hero.png";

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto; /* Allow dynamic height */
  gap: 25px;
  padding: 100px 5%; /* Avoid header overlap */
  background-color: rgb(31, 101, 206);
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1024px) { /* For tablets and laptops */
    padding: 100px 3%;
    gap: 15px;
  }

  @media screen and (max-width: 768px) { /* For mobile devices */
    flex-direction: column;
    padding: 120px 20px;
  }
`;

export const FormContainer = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Use gap for consistent spacing */
  justify-content: center;
  align-items: stretch; /* Stretch form fields */
  padding: 20px;
  margin-top: 10px; /* Ensure spacing from the header */
  max-width: 700px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  span {
    font-size: 24px;
    font-weight: bold;
    color: rgb(31, 101, 206);
    margin-bottom: 10px;
  }

  h1 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
  }

  label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;

    span {
      color: red;
      font-weight: bold;
    }
  }

  button {
    align-self: center;
    text-align: center;
    border-radius: 6px;
    padding: 10px 20px;
    background-color: rgb(31, 101, 206);
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 15px;
    width: auto; /* Allow natural button width */
  }

  button:hover {
    background-color: rgb(25, 85, 175);
  }

  @media screen and (max-width: 768px) { /* Mobile responsiveness */
    align-items: center;
    text-align: center;
    padding: 15px;

    span {
      font-size: 18px;
    }

    h1 {
      font-size: 18px;
    }

    button {
      width: 100%; /* Button takes full width on smaller screens */
    }
  }
`;

export const ImageContainer = styled("div")`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 600px; /* Maintain aspect ratio */
    height: auto;
    border-radius: 7px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  img:hover {
    transform: scale(1.05); /* Add hover scaling */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 768px) { /* Mobile responsiveness */
    margin-bottom: 20px;

    img {
      max-width: 100%; /* Ensure the image resizes on mobile */
    }
  }
`;
