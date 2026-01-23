import styled from "styled-components";


//BELOW GIVEN CSS CODE WAS [ HOME ] PAGE STYLE CSS



export const SectionContainer = styled.section`
  padding: 20px 6%;
  background: #ffffff;


  @media (max-width: 1024px) {
    padding: 0 4%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 3rem 1.5rem;
    min-height: auto;
  }
`;


export const TextContainer = styled.div`
  flex: 1;
  color: #ffffff;
  margin-top: 4%;
  z-index: 2;

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
      color: #ffffff;
  }

  .main-description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-top: 1rem;
    opacity: 0.95;
      color: #ffffff;
  }

  .sub-hero {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-top: 0.75rem;
    color: #ffffff;
    max-width: 620px;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;

    button {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:first-child {
        background-color: white;
        color: #0066ff;

        &:hover {
          background-color: #0066ff;
          color: white;
          box-shadow: 0 8px 20px rgba(0, 102, 255, 0.3);
        }
      }

      &:last-child {
        background-color: transparent;
        color: white;
        border: 2px solid white;

        &:hover {
          background-color: white;
          color: #0066ff;
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  /* Tablet */
  @media (max-width: 1024px) {
    margin-top: 5%;

    h1 {
      font-size: 2.2rem;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    margin-top: 0;

    h1 {
      font-size: 2rem;
    }

    .main-description {
      font-size: 1.05rem;
    }

    .sub-hero {
      font-size: 0.9rem;
      max-width: 100%;
    }

    .button-group {
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  /* Small phones */
  @media (max-width: 480px) {
    h1 {
      font-size: 1.7rem;
    }

    .main-description {
      font-size: 1rem;
    }
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1;

  @keyframes danceUpDown {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-6px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0);
    }
  }

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    animation: danceUpDown 2s ease-in-out infinite;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    justify-content: center;

    img {
      max-width: 500px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    margin-top: 2.5rem;
    justify-content: center;
    align-items: center;

    img {
      max-width: 380px;
    }
  }

  /* Small phones */
  @media (max-width: 480px) {
    img {
      max-width: 300px;
    }
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
    color: #003366;
    font-size: 40px;
    margin: 0 0 8px 0; /* ✅ control space after heading */
  }

  p {
    color: #3a4048ff;
    font-weight: 700;
    font-size: 17px;
    line-height: 1.6;
    margin: 0; /* ✅ REMOVE bottom gap completely */
  }

  /* If you want a LITTLE space before the next heading */
  p + h1 {
    margin-top: 8px; /* optional, controlled spacing */
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
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


  /* ✅ CTA BUTTON STYLES */
  .services-cta {
    margin-top: 2rem;
    text-align: center;

    button {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      border-radius: 6px;
      border: none;
      background-color: #0B1D45;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #004fcc;
        box-shadow: 0 10px 25px rgba(0, 102, 255, 0.3);
      }
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
    color: #3a4048ff;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.6;
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


  p{
  
  max-width: 720px;
  margin: 0 auto 3rem auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #3a4048ff;
  font-weight: 700;
  font-size: 16px;
  }

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
  max-width: 900px;
  margin: 0 auto 3rem auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #3a4048ff;
  font-weight: 700;
  font-size: 16px;

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




/* SECTION */


/* MAIN GRID */
export const GridWrapper = styled.div`
  max-width: 1320px; /* 🔥 wider */
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1.1fr 1fr; /* 🔥 balanced width */
  gap: 36px;
  align-items: stretch; /* 🔥 equal height */

  min-height: 420px; /* 🔥 controls hero height */

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;


/* LEFT GRID */
export const LeftGrid = styled.div`
  border: 2px solid #eef2f7; /* 🔥 lighter border */
  border-radius: 18px;
  padding: clamp(22px, 3vw, 40px);
  background: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);

  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
    transform: translateY(-2px);
  }

  h1 {
    font-size: clamp(1.8rem, 2.5vw, 2.3rem);
    color: #0f172a;
    margin-bottom: 0.75rem;
    line-height: 1.25;
  }

.main-description {
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: #3a4048ff;
  line-height: 1.65;
  margin-bottom: 0.6rem;
  font-weight: 700; /* ✅ Bold */
}


  .sub-hero {
    font-size: clamp(0.9rem, 1.05vw, 0.98rem);
    color: #3a4048ff;
    line-height: 1.6;
    font-weight: 700; /* ✅ Bold */
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;





/* BUTTONS */
export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 28px;
  flex-wrap: wrap;

  button {
    padding: 12px 26px;
    font-size: 14.5px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  .primary {
    background: #2563eb;
    color: #ffffff;

    &:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
  }

  .secondary {
    background: transparent;
    border: 2px solid #2563eb;
    color: #2563eb;

    &:hover {
      background: #2563eb;
      color: #ffffff;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;



/* RIGHT GRID */
export const RightGrid = styled.div`
  display: flex;
  height: 100%;

  /* Desktop / default */
  justify-content: flex-end;
  align-items: center;

  /* Mobile */
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;





/* VIDEO BOX */
export const VideoBox = styled.div`
  border: 2px solid #eef2f7; /* 🔥 lighter border */
  border-radius: 18px;
  
  background: #f8fafc;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);

  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
    transform: translateY(-2px);
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }
`;



