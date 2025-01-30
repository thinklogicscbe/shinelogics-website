import styled from "styled-components";

// Main container
export const Destinationcontiner = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  padding: 20px;
  width: 100%;
  text-align:justify;
  justify-content: center;
  align-items: center;
`;
export const Destination = styled.div`
  h2 {
    font-size: 55px;
    font-weight: bold;
    color: blue;
  }
`;

export const Destinationcontent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  text-align:justify;
`;


// Top section (image + main content)
export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Image container
export const ImageContainer = styled.div`
  flex: 1;
  margin-left: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40%;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 80%;
    margin-left: 0;
  }
`;

// Content wrapper
export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  margin-right: 10%;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 80%;
    margin-right: 0;
    text-align: center;
  }
`;

// Bottom section
export const BottomSection = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Left section content
export const Leftsidecontent = styled.div`
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;
export const Title = styled.h1`
  h1{
  padding:5px;
  font-size:40px;
  font-weight:400;
   
  }
`;


// Right section content
export const Rightsidecontent = styled.div`
  border: 2px solid rgb(217, 223, 237);
  padding:  8px;
  border-radius: 8px;
  background-color: #f0f0f0;
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  margin-top: 0;  /* Remove any margin pushing the container down */
  margin-bottom: 0;  /* Ensure no bottom margin */
  width:100%;
  height: 30%;  /* Let the container expand only as needed */
  
  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-top: 10px;  /* Optional: keep space for smaller screens */
  }

  h4 {
    font-size: 22px;
    color: blue;
  }

  p {
    color: black;
    font-family: Tahoma, Verdana, sans-serif;
    font-size: 28px;
  }
`;


// Section title
export const SectionTitle = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`;

// List
export const List = styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 8px;
    font-size: 19px;
    line-height: 1.4;
  }
`;

// Job summary details
export const Jobsummery = styled.div`
  
  margin-bottom: 20px;
  font-size: 16px;
  h4,p{
  margin-left:14%;
  }

  h4{
  font-size:20px;
  color:black;
  font-weight:100;
  }
  p{
  color:blue;
  font-size:22px;
  }
`;

export const Location = styled.div`
  margin-bottom: 10px;
`;

export const JobType = styled.div`
  margin-bottom: 10px;
`;

export const Positionscount = styled.div`
  margin-bottom: 10px;
`;

export const Qualification = styled.div`
  margin-bottom: 10px;
`;

export const Experience = styled.div`
  margin-bottom: 10px;
`;

export const Posted = styled.div`
  margin-bottom: 10px;
`;

export const StyledHr = styled.hr`
  border: none;
  height: 2px;
  background-color: lightblue;
  opacity: 0.3;  
  margin: 10px 0;
`;

