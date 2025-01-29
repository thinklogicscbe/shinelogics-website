import styled from 'styled-components';
import background from '../../assets/bg-hero.png';

export const Heading = styled.div`
  background: linear-gradient(135deg, rgba(31, 101, 206, 0.9), rgba(10, 80, 180, 0.9)), 
              url(${background}) no-repeat center center;
  background-size: cover;
  text-align: center;
  padding: 60px 0;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 42px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;

  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.h3`
  color: #fff;
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 20px;

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
  margin: 20px 0;

  /* Mobile responsiveness */
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px; /* Space between image and content */
  
  img {
    margin-top: 2%;
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  text-align: left;
  margin-right:5%;

  h2, h3, p {
    margin-bottom: 10px;
  }
  p {
    margin-right:2%;
    text-align:justify;
    line-height: 1.7rem;
  }
  h2 {
    color:black;
    font-weight:900;
  }
  h3 {
    color:blue;
    font-weight:700;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping for smaller screens */
  justify-content: space-between; /* Distributes items evenly */
  gap: 20px; /* Adds spacing between the containers */
  margin-top: 20px;
  margin-right:3%;
  margin-left:3%;

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
    font-size:16px;
    font-weight:900;
    padding: 3px 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color:rgb(229, 233, 240);
  }
`;

export const Technologi = styled.h4`
  color: blue; /* Sets the text color to blue */
  font-size: 18px; /* Adjusts the font size */
  font-weight: bold; /* Makes the text bold */
  margin-bottom: 5px; /* Adds spacing below the element */
`;

export const Roll = styled.h5`
  color: blue; /* Sets the text color to blue */
  font-size: 16px; /* Adjusts the font size */
  font-weight: normal; /* Makes the text regular weight */
  margin-bottom: 10px; /* Adds spacing below the element */
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
  font-weight:900;
  margin-left: auto;

  &:hover {
    background-color: darkblue;  
  }
`;

export const Link = styled.button`
  link-decrator:none;
`;
