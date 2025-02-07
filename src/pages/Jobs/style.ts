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


export const ButtonStyle = styled.button`
  padding: "10px 20px",
    marginRight: "1460px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"


  /* Responsive Design */
  @media (max-width: 1024px) {
    /* Tablets */
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    /* Mobile Devices */
    font-size: 12px;
    padding: 6px 12px;
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    /* Small Mobile Screens */
    font-size: 10px;
    padding: 5px 10px;
    width: 35px;
    height: 35px;
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



// Job Summary Container (More Compact)
export const Rightsidecontent = styled.div`
  border: 1px solid rgb(200, 200, 200);
  padding: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto; /* Adjusts to content */
  margin-right: 20px; /* Moves it slightly to the left */

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-right: 0; /* Reset for small screens */
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  p {
    font-size: 15px;
    font-weight: 500;
    color: #0073e6;
  }
`;


// Job Summary Section (Better Spacing)
export const Jobsummery = styled.div`
  padding: 10px;
  font-size: 14px;

  h4, p {
    margin-left: 10%;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #222;
  }

  p {
    font-size: 15px;
    color: #0056b3;
  }
`;

// Reduce Font Sizes in List Sections
export const List = styled.ul`
  padding-left: 15px;

  li {
    margin-bottom: 6px;
    font-size: 15px;
    line-height: 1.3;
  }
`;

// Reduce Font Sizes in Job Title & Description
export const Title = styled.h1`
  h1 {
    font-size: 28px;
    font-weight: 500;
    padding: 5px;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 18px;  /* Increased font size for better readability */
  line-height: 1.8; /* Improved line spacing */
  text-align: justify;
  font-family: "Arial", "Helvetica", sans-serif; /* Professional, clean font */
  font-weight: 500; /* Slightly bolder for clarity */
  color: #333; /* Darker text for better contrast */
`;

export const ApplyButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Primary blue color */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: scale(1.05);
  }

  &:active {
    background-color: #004494; /* Even darker blue when clicked */
    transform: scale(0.98);
  }
`;
