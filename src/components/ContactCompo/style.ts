import styled from "styled-components";
import background from "../../assets/bg-hero.png";

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90vh;
  gap:25px;
  background-color: rgb(31, 101, 206); /* Fallback background color */
  padding: 0 5%;
  background-image: url(${background}); /* Use the imported image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const ImageContainer = styled("div")`
  flex: 1;  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;  

  img {
    width: 100%;
    max-width: 690px;  
    height: 593px;
    border-radius: 7px;  
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  
    transition: transform 0.3s ease, box-shadow 0.3s ease;  
  }

  img:hover {
    transform: scale(1.05);  
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);  
  }
`;


export const FormContainer = styled("div")`
  flex: 1;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
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
    font-size: 22px;
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

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none; /* Remove all borders */
    border-bottom: 2px solid #ccc; /* Add only a bottom border */
    border-radius: 0; /* Ensure no rounded edges */
    outline: none; /* Remove the default focus outline */
    transition: border-color 0.3s ease; /* Smooth transition for border color on focus */
  }

  input:focus,
  textarea:focus {
    border-bottom: 2px solid rgb(31, 101, 206); /* Highlight bottom border on focus */
  }

  button {
  text-aligh:center;
    border-radius: 6px;
    padding: 10px 20px;
    background-color: rgb(31, 101, 206);
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: rgb(25, 85, 175);
  }
`;
