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

  /* Media Queries for responsiveness */
  @media (max-width: 1200px) {
    .heading-banner {
      height: 350px; /* Adjust height for medium screens */
    }

    .heading-content {
      width: 70%; /* Make heading content take more space on medium screens */
      height: auto;
    }

    .heading-content h1 {
      font-size: 2rem;
    }

    .heading-content p {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    .heading-banner {
      height: 300px; /* Adjust height for tablet screens */
    }

    .heading-content {
      width: 80%; /* Adjust width on tablets */
      height: auto;
      padding: 15px;
    }

    .heading-content h1 {
      font-size: 1.8rem;
    }

    .heading-content h3 {
      font-size: 1.3rem;
    }

    .heading-content p {
      font-size: 1rem;
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

  /* Extra small screens like phones in portrait mode */
  @media (max-width: 320px) {
    .heading-banner {
      height: 200px; /* Adjust height for very small screens */
    }

    .heading-content {
      width: 95%;
      height: auto;
      padding: 8px;
    }

    .heading-content h1 {
      font-size: 1.4rem;
    }

    .heading-content h3 {
      font-size: 1rem;
    }

    .heading-content p {
      font-size: 0.8rem;
    }
  }
`;



export const CoreFeaturesContainer = styled.div`
  .core-features-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 1200px; /* Limit width for better readability */
  }

  .core-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; /* Space between grid items */
  }

  .core-feature-item {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .core-feature-item:hover {
    transform: translateY(-10px); /* Hover effect to raise item */
  }

  .core-feature-icon {
    font-size: 3rem; /* Size of the icon */
    margin-bottom: 15px;
  }

  .core-feature-item strong {
    display: block;
    font-size: 1.2rem; /* Reduced heading size */
    color: #007bff;
    margin-bottom: 15px; /* Increased gap between heading and content */
  }

  .core-feature-item ul {
    padding-left: 20px; /* Indentation for the list */
    list-style-type: disc; /* Show bullet points */
    text-align: left; /* Left-align the text inside the list */
  }

  .core-feature-item li {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  /* Adjust image size for all grid items */
  .core-feature-item img {
    width: 100%; /* Full width to cover container */
    height: auto; /* Maintain aspect ratio */
    max-height: 250px; /* Set a max height for uniform image size */
    object-fit: cover; /* Ensure the image covers the container */
    border-radius: 8px; /* Rounded corners for the image */
    margin-bottom: 15px; /* Gap between image and content */
  }

  @media (max-width: 768px) {
    .core-features-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    .core-feature-item strong {
      font-size: 1rem; /* Further reduce heading size on smaller screens */
    }
  }
`;


export const BenefitsContainer = styled.div`
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

  /* Media Queries for different screen sizes */
  
  /* For large screens like laptops */
  @media (max-width: 1200px) {
    .why-choose-container {
      padding: 30px; /* Reduce padding on large screens */
    }

    .why-choose-container h2 {
      font-size: 2.2rem; /* Adjust font size for the header */
    }

    .why-choose-item {
      font-size: 1.1rem; /* Adjust list item font size */
    }
  }

  /* For tablets (between 768px and 1200px) */
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

  /* For smaller mobile screens (between 468px and 768px) */
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

  /* For extra small screens (up to 468px) */
  @media (max-width: 320px) {
    .why-choose-container {
      padding: 10px; /* Very small padding for extra small screens */
    }

    .why-choose-container h2 {
      font-size: 1.6rem; /* Further reduce header font size */
    }

    .why-choose-item {
      font-size: 0.9rem; /* Adjust font size for small devices */
    }
  }
`;

