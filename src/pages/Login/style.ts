import styled from "styled-components";

export const LoginSignupContainer = styled.div`
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .image-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: slideInLeft 1s ease-in-out;
  }

  .image-section img {
    max-width: 100%;
    max-height: 90%;
    object-fit: cover;
    animation: danceUpDown 2s ease-in-out infinite; /* Adds the dance animation */
  }

  /* Keyframes for the dancing animation */
  @keyframes danceUpDown {
    0% {
      transform: translateY(0); /* Initial position */
    }
    25% {
      transform: translateY(-10px); /* Move up slightly */
    }
    50% {
      transform: translateY(0); /* Return to original position */
    }
    75% {
      transform: translateY(10px); /* Move down slightly */
    }
    100% {
      transform: translateY(0); /* Return to original position */
    }
  }

  .auth-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slideInRight 1s ease-in-out;
    padding: 20px;
  }

  .auth-box {
    background: #fff;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Darker and more visible shadow */
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-top: 10px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #555;
  }

  .input-group input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }

  .input-group input:focus {
    border-color: #007bff;
  }

  .auth-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
    width: 100%;
  }

  .auth-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  .toggle-text {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #555;
  }

  .toggle-link {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 5px;
    transition: color 0.3s;
  }

  .toggle-link:hover {
    color: #0056b3;
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInTop {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

@media (max-width: 1024px) {
  .container {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center align content */
    justify-content: flex-start; /* Start from top */
    min-height: 100vh; /* Ensure the container takes full height */
    padding: 10px; /* Adjust padding for tablet */
    gap: 20px; /* Add gap between image and auth container */
  }

  .image-section {
    width: 100%; /* Ensure image section takes full width */
    height: 180px; /* Reduced height for the image */
    overflow: hidden; /* Prevent image from overflowing */
    display: flex;
    justify-content: center; /* Center the image horizontally */
    align-items: center; /* Center the image vertically */
  }

  .image-section img {
    width: 100%; /* Make image responsive */
    height: auto; /* Maintain the aspect ratio of the image */
    object-fit: contain; /* Ensure the entire image fits inside the section without cropping */
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px; /* Adjust padding for tablet */
    width: 90%; /* Ensure auth container takes appropriate width */
    max-width: 500px; /* Limit max-width for auth container */
    box-sizing: border-box; /* Include padding in width calculation */
    margin-top: 20px; /* Add some gap between image and auth container */
  }

  .auth-box {
    padding: 20px;
    width: 100%; /* Ensure auth box takes full width */
    max-width: 400px; /* Limit max-width for auth box */
    box-sizing: border-box; /* Include padding in width calculation */
  }

  h2 {
    font-size: 1.5rem;
    text-align: center; /* Center the heading */
    margin-bottom: 15px; /* Add spacing below the heading */
  }

  .input-group input {
    padding: 12px;
    width: 100%; /* Make input fields take full width */
    box-sizing: border-box; /* Include padding in width calculation */
  }

  .auth-button {
    font-size: 1rem; /* Adjust button size for tablet */
    width: 100%; /* Make the button take full width */
  }
}

@media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: row; /* Change to row to align elements side by side */
    justify-content: space-between; /* Distribute space between items */
    align-items: center; /* Align content vertically */
    padding: 10px; /* Adjust padding for mobile/tablet */
  }

  .image-section {
    width: 50%; /* Set image section width to 50% */
    height: 300px; /* Adjust height for better image visibility */
    overflow: hidden; /* Prevent image from overflowing */
    display: flex;
    justify-content: center; /* Center the image horizontally */
    align-items: center; /* Center the image vertically */
  }

  .image-section img {
    width: 100%; /* Make image responsive */
    height: 100%; /* Ensure the image takes up full height of its container */
    object-fit: cover; /* Ensures the image fully covers the area without stretching or distorting */
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px; /* Adjust padding for mobile */
    width: 40%; /* Set width for auth container */
    max-width: 450px; /* Limit max-width for auth container */
    box-sizing: border-box; /* Include padding in width calculation */
    margin-top: 20px; /* Add some gap between image and auth container */
  }

  .auth-box {
    padding: 20px;
    width: 100%; /* Ensure auth box takes full width */
    max-width: 350px; /* Limit max-width for auth box */
    box-sizing: border-box; /* Include padding in width calculation */
  }

  h2 {
    font-size: 1.25rem;
    text-align: center; /* Center the heading */
  }

  .input-group input {
    padding: 12px;
    width: 100%; /* Make input fields take full width */
    box-sizing: border-box; /* Include padding in width calculation */
  }

  .auth-button {
    font-size: 0.9rem;
    width: 100%; /* Make the button take full width */
  }
}



/* For very small screens (e.g., mobile phones) */
@media (max-width: 468px) {
  .container {
    padding: 15px; /* Reduce padding for extra small screens */
    justify-content: flex-start; /* Keep content aligned from top */
  }

  .image-section {
    display: none; /* Hide the image on mobile screens */
  }

  .auth-container {
    height: auto; /* Adjust auth container height */
    margin-top: 15px; /* Add smaller gap between image and auth container */
  }

  .auth-box {
    width: 100%; /* Full width for the auth box */
    padding: 20px; /* Smaller padding for compact screens */
  }

  .auth-button {
    font-size: 14px; /* Smaller button text */
  }
}
`   