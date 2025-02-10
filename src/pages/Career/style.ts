import styled from "styled-components";
import background from "../../assets/bg-hero.png";

export const Heading = styled.div`
  background: linear-gradient(
      135deg,
      rgba(31, 101, 206, 0.9),
      rgba(10, 80, 180, 0.9)
    ),
    url(${background}) no-repeat center center;
  background-size: cover;
  text-align: center;
  padding: 60px 0;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 37px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: -1%;

  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.h3`
  /* color: #fff; */
  font-size: 50px;
  font-weight: normal;
  font-family: "Inder", serif;
  margin-bottom: 50px;
  color: white;

  @media screen and (max-width: 1024px) {
    font-size: 24px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;


export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 5%;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin: 20px;
    gap: 10px;
  }
`;

export const ImageContainer = styled.div`
  max-width: 40%;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media screen and (max-width: 768px) {
    max-width: 80%;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  text-align: left;

  h2 {
    font-size: 42px;
    color: #222;
    font-weight: 800;
    font-family: "Poppins", sans-serif;

    @media screen and (max-width: 768px) {
      font-size: 32px;
      text-align: center;
    }
  }

  h3 {
    color: #007bff;
    font-size: 28px;
    font-weight: 600;

    @media screen and (max-width: 768px) {
      font-size: 24px;
      text-align: center;
    }
  }

  p {
    font-size: 18px;
    text-align: justify;
    line-height: 1.8rem;
    font-family: "Roboto", sans-serif;
    color: #444;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      padding: 0 15px;
    }
  }
`;

export const MiddleContent = styled.div`
  margin: 40px 8%;
  text-align: center;

  p {
    font-size: 18px;
    line-height: 1.8rem;
    font-family: "Roboto", sans-serif;
    color: #444;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      padding: 0 10px;
    }
  }
`;

export const StyledButton = styled.button`
  background: #007bff;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: #0056b3;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping for smaller screens */
  justify-content: space-between; /* Distributes items evenly */
  gap: 20px; /* Adds spacing between the containers */
  margin-top: 20px;
  margin-right: 3%;
  margin-left: 3%;

  /* Ensure all TextContainer components maintain their size on smaller screens */
  @media screen and (max-width: 768px) {
    justify-content: center; /* Center the containers on smaller screens */
    gap: 15px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* Ensure children are stacked vertically */
  justify-content: space-between; /* Push the button to the bottom */
  flex-basis: 30%;
  max-width: 30%;
  min-width: 250px;
  border: 2px solid white;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: left;

  p {
    text-align: justify;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  /* New styles for the skills */

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill {
    display: inline-block;
    font-size: 16px;
    font-weight: 900;
    padding: 3px 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(229, 233, 240);
  }
`;

export const Technologi = styled.h4`
  color: blue; /* Sets the text color to blue */
  font-size: 18px; /* Adjusts the font size */
  font-weight: bold; /* Makes the text bold */
  margin-bottom: 5px; /* Adds spacing below the element */
`;

export const DescriptionContainer = styled.div`
  display: inline; /* Keeps text and button inline */
  font-size: 16px;
  font-weight: 300;
  color: gray;
  line-height: 1.4;
`;

export const Roll = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Limits to 4 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* Prevents overflowing */
  line-height: 1.4rem; /* Adjust line height for better spacing */
`;


export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  font-size: 14px;
  padding-left: 5px;
`;

export const ButtonContainers = styled.button`
  color: white;
  background-color: blue;
  width: 80px; /* Set a fixed width */
  height: 30px; /* Set a fixed height */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;
  font-family: "Inder", serif;
  font-weight: 400;
  font-style: normal;
  &:hover {
    background-color: darkblue;
  }
`;

export const Link = styled.button`
  link-decrator: none;
`;
