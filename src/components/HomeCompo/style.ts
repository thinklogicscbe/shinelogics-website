import styled from "styled-components";
import background from "../../assets/AI-image.jpg";

//BELOW GIVEN CSS CODE WAS [ HOME ] PAGE STYLE CSS

export const SectionContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  // background-color: rgb(31, 101, 206); /* Fallback background color */
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
    color: white;
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

  /* Define the dancing animation */
  @keyframes danceUpDown {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* Apply animation to the image */
  img {
    width: 100%; /* Adjust size as needed */
    max-width: 600px;
    height: auto;
    animation: danceUpDown 2s ease-in-out infinite; /* Apply the animation */
  }

  span {
    margin-right: 10px;
    font-size: 1.2rem;
    align-self: baseline; /* Align text baseline with the image */
  }
`;

//BELOW GIVEN CSS CODE WAS [ PDAAS ] PAGE STYLE CSS

// const slideIn = keyframes`
//     from {
//         transform: translateX(-100%);
//         opacity: 0;
//     }
//     to {
//         transform: translateX(0);
//         opacity: 1;
//     }
// `;

export const PdaasContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal-width columns for larger screens */
  gap: 20px; /* Space between columns */
  align-items: center; /* Align items vertically */
  padding: 60px; /* Padding for the container */

  /* Responsive design for tablets */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Single column layout for tablets */
    padding: 40px;
  }

  /* Responsive design for mobile phones */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column layout for phones */
    padding: 20px;
  }
`;

export const AnimatedImage = styled.img`
  width: 90%;
  height: auto;
  max-width: 800px;
  margin-left: auto;
  margin-right: 10px;
  border-radius: 5px;

  /* Default state (hidden) */
  opacity: 0;
  transform: translateX(-100%);
  transition: transform 1s ease-out, opacity 1s ease-out;

  /* Animate when the class 'animate' is applied */
  &.animate {
    opacity: 1;
    transform: translateX(0);
  }

  /* Responsive design for smaller screens */
  @media (max-width: 1024px) {
    margin: 0 auto; /* Center the image */
    max-width: 600px; /* Reduce max width for tablets */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Full width for phones */
  }
`;

export const PdaasContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  line-height: 1.5;
  color: #333;

  h1 {
    color: blue; /* Set h1 tag color to blue */
  }

  /* Responsive font sizes */
  @media (max-width: 1024px) {
    font-size: 18px; /* Slightly smaller text on tablets */
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Smaller text for phones */
    text-align: center; /* Center-align text on smaller screens */
  }
`;

//BELOW GIVEN CSS CODE FOR [ OURSERVICE ] PAGE STYLE

export const ServiceContainer = styled.div`
  text-align: center;
  padding: 60px;
  background-color: white;

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;

    /* Media query for tablets */
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    /* Media query for mobile phones */
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 20px;
`;

export const ServiceCard = styled.div`
  background-color: #e8f4fc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  .icon {
    font-size: 30px;
    color: #007bff;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 18px;
    color: #003366;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #07ebf7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

//BELOW GIVEN CSS CODE FOR [ OUR PRODUCT ] PAGE STYLE

export const ProductContainer = styled.div`
  text-align: center;
  padding: 60px;
  background-color: white;

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;

    /* Media query for tablets */
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    /* Media query for mobile phones */
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const ProductTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 20px;
`;

export const ProductCard = styled.div`
  // background-color: #e8f4fc;
  padding: 0px;
  border-radius: 8px;
  text-align: center;
  position: relative; /* This is needed to position the overlay text */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  .icon {
    font-size: 30px;
    color: #007bff;
    margin-bottom: 15px;
  }


  .v1{

  
  
  }

  h5 {
    font-size: 18px;
    color: #fff; /* White text to contrast over video */
    position: absolute; /* Position the text over the video */
    bottom: 20px; /* Adjust bottom position */
    left: 50%;
    transform: translateX(-50%); /* Center the text horizontally */
    padding: 10px;
    background-color: rgba(
      0,
      0,
      0,
      0.6
    ); /* Semi-transparent black background for contrast */
    border-radius: 5px;
  }
  p {
    font-size: 14px;
    color: #666;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  pointer-events: none; /* Disable all interactions */
  display: block; /* Ensures the video fills the container */

  /* Media query to adjust video size on mobile */
  @media (max-width: 768px) {
    width: 100%;
  }
`;


export const BannerImage = styled.div`
  width: 70%; /* Full width of the container */
  height: 500px; /* Adjust the height as per your preference */
  margin: 30px auto; /* Center the banner with space at the top and bottom */
  background-image: url('/Desktop - 57 (1).png'); /* Update with your image path */
  background-size: contain; /* Ensures the entire image fits within the container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents image from repeating */
  border-radius: 8px; /* Optional: rounded corners for a neater look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Initial box shadow */
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Smooth transition for box-shadow and transform */

  /* Hover effect */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
    transform: translateY(-5px); /* Slight lift effect */
  }

  /* Optional: Add responsiveness for smaller screens */
  @media (max-width: 768px) {
    width: 100%; /* Make it full width on smaller screens */
    height: 300px; /* Adjust height on smaller screens */
    background-size: cover; /* Ensure the image covers the full width */
    background-position: center center; /* Center the image properly */
    padding: 0 10%; /* Add some horizontal padding */
  }

@media (max-width: 480px) {
  width: 90%; /* Ensure the image takes 90% of the container width */
  height: 180px; /* Adjust height to fit better on small screens */
  background-size: contain; /* Ensures the entire image fits without cropping */
  background-position: center center; /* Keeps the image centered */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  padding: 0 5%; /* Adds some padding to ensure it’s not stretched to the edges */
}
`;

export const TechnologiesHeading = styled.h2`
  text-align: center; /* Center the heading */
  font-size: 2rem; /* Adjust the font size */
  color:#003366 /* Set the text color */
  margin-bottom: 20px; /* Add space between the heading and the banner */
  font-weight: bold; /* Make the heading bold */
`;


export const TechnologiesParagraph = styled.p`
  font-size: 1.2rem; /* Slightly larger font for readability */
  line-height: 1.8; /* Increase line height for better readability */
  font-weight: bold; /* Make the text bold */
  text-align: center; /* Center align the text */
  max-width: 80%; /* Reduce the width */
  margin: 0 auto 20px auto; /* Center the paragraph and add space at the bottom */
  color: #555; /* Set a dark grey color for the text */
  padding: 0 20px; /* Add horizontal padding for mobile responsiveness */

  /* Optional: Add responsiveness for smaller screens */
  @media (max-width: 768px) {
    font-size: 1.1rem; /* Adjust font size on smaller screens */
    max-width: 90%; /* Reduce width further on smaller screens */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Further reduce font size on very small screens */
    max-width: 95%; /* Adjust width on very small screens */
  }
`;
