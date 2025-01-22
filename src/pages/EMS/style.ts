import styled from 'styled-components';

// Define the styled component
export const BannerContainer = styled.div`
  .heading-container {
    width: 100%;
    // margin-top: 120px;
  }

  .heading-banner {
    position: relative;
    width: 100%;
    height: 400px; /* Adjust height as needed */
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Add an overlay */
    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5); /* Semi-transparent white overlay */
      z-index: 1;
    }
  }

  .heading-content {
    position: relative;
    z-index: 2; /* Ensure the content is above the overlay */
    text-align: center;
    
    padding: 20px;
    background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background for text */
    border-radius: 8px;
    width: 60%;
    height: 70%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Optional: Adds a subtle shadow */
    transform: scale(1);
    animation: fadeIn 1s ease-in-out;

    /* Add transition for smooth hover effect */
    // transition: transform 0.3s ease, box-shadow 0.3s ease;

    // &:hover {
    //   transform: scale(1.05); /* Slightly enlarge on hover */
    //   box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    // }
  }

  .heading-content h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    font-weight: bold;
    color: #18216D; /* Text color */
  }

  .heading-content h3 {
    font-size: 1.5rem; /* Reduced size for h3 */
    margin-bottom: 10px;
    font-weight: 600;
  
    color: #333;
    transition: all 0.3s ease;
  }

  .heading-content p {
    font-size: 1.1rem;
    line-height: 1.6;
   
    font-weight: 600;
    color: black; /* Text color */
    transition: all 0.3s ease;
  }

  

//   /* Add hover effects for h3 and p */
//   .heading-content h3:hover {
//     font-size: 1.3rem; /* Increase size on hover */
//     color: #007bff; /* Change color on hover */
//     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
//   }

//   .heading-content p:hover {
//     font-size: 1.1rem; /* Reduce size on hover */
//     color: #555;
//     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a shadow effect */
//   }


.features-container {
  padding: 30px;
  margin-top: 40px;
  animation: fadeIn 1.5s ease-in-out;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-item {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  text-align: left;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center-aligns content */
  justify-content: flex-start; /* Aligns items to the top */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  gap: 10px; /* Adds consistent spacing between elements */
}

.feature-item:hover {
  background-color: #e9e9e9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  height: 150px; /* Fixed height for images */
  overflow: hidden; /* Ensures the image fits within the container */
}

.feature-img {
  width: auto;
  max-height: 100%; /* Ensures the image fits within the fixed height */
  object-fit: cover; /* Prevents distortion and maintains aspect ratio */
}

.feature-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 15px 0; /* Adds consistent spacing above and below the heading */
  text-align: center;
}

.feature-details {
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 400;
  color: #555;
 
}

/* Media Query for Smaller Screens */
@media (max-width: 768px) {
  .features-container {
    padding: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .feature-item {
    padding: 15px;
  }

  .feature-img {
    max-height: 120px;
  }

  .feature-details {
    font-size: 1rem;
  }
}


/* Responsive design */
@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr 1fr; /* Two columns on medium screens */
  }
}

@media (max-width: 480px) {
  .features-container {
    grid-template-columns: 1fr; /* Single column on small screens */
  }

  .feature-item {
    padding: 15px; /* Adjust padding for smaller screens */
  }

  .feature-icon {
    font-size: 2rem; /* Reduce icon size */
  }

  .feature-item h3 {
    font-size: 1.6rem;
  }

  .feature-details {
    font-size: 1rem;
  }
}


  /* Why Choose Our EMS Styles */
  .why-choose-container {
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 10px;
  margin-top: 50px;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out;
  text-align: center;
  transform: scale(1);
  transition: transform 0.3s ease;
  max-width: 1100px; /* Limit width */
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */

  /* Hover effect for the container */
  &:hover {
    transform: scale(1.03); /* Slightly enlarge the container */
  }
}

.why-choose-container h2 {
  font-size: 2.5rem; /* Increase font size for the header */
  margin-bottom: 20px; /* Add space below the heading */
  color: #333;
  font-weight: bold;
  text-transform: uppercase; /* Make the heading stand out */
}

.why-choose-container ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0; /* Remove any default margin */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
}

.why-choose-item {
  font-size: 1.2rem; /* Increase font size slightly */
  margin-bottom: 15px; /* Increase space between list items */
  color: #444;
  line-height: 1.5;
  padding-left: 20px; /* Add padding to the left for better readability */
  position: relative;
}

.why-choose-item:before {
  content: '✔'; /* Add a check mark icon before the item */
  position: absolute;
  left: 0;
  color: #007bff; /* Set icon color */
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .why-choose-container {
    padding: 20px; /* Reduce padding on smaller screens */
  }

  .why-choose-container h2 {
    font-size: 2rem; /* Reduce header font size */
  }

  .why-choose-item {
    font-size: 1.1rem; /* Adjust list item font size */
  }
}

@media (max-width: 468px) {
  .why-choose-container {
    padding: 15px; /* Further reduce padding for mobile screens */
  }

  .why-choose-container h2 {
    font-size: 1.8rem; /* Further reduce header font size */
  }

  .why-choose-item {
    font-size: 1rem; /* Adjust font size for mobile */
  }
}

  /* Keyframes for animations */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Media Queries */
  @media (max-width: 768px) {
    .heading-banner {
      height: 300px; /* Reduce banner height for tablets and smaller devices */
    }
    .heading-content {
      width: 80%; /* Increase width for better readability */
      height: auto; /* Adjust height to fit content */
      padding: 15px; /* Reduce padding */
    }
    .heading-content h1 {
      font-size: 2rem; /* Adjust font size for headers */
    }
    .heading-content p {
      font-size: 1rem; /* Adjust font size for paragraph */
    }
  }

  
@media (max-width: 468px) {
  .heading-banner {
    height: 400px; /* Reduce the height even further for very small screens */
  }

  .heading-content {
    width: 90%; /* Reduce content width to fit better on small screens */
    height: auto; /* Allow content to adjust based on its height */
    padding: 15px; /* Slightly reduce padding */
  }

  .heading-content h1 {
    font-size: 1.2rem; /* Further reduce font size for better fit */
  }

  .heading-content p {
    font-size: 0.75rem; /* Smaller font size for paragraphs */
    line-height: 1.9; /* Adjust line height for better readability */
  }
}
`;

