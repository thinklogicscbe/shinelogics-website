// import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Ai from "../../assets/hero-img.png";
import { SectionContainer, TextContainer, ImageContainer } from './style';

const Home = () => {
  return (
    <SectionContainer>
      <TextContainer>
        <div>
          <h1>WE'RE AN AI-DRIVEN PRODUCT DEVELOPMENT COMPANY</h1>
          <div className="button-group">
            {/* Replace buttons with Link components */}
            <Link to="/about">
              <button>Read More</button>
            </Link>
            <Link to="/contact">
              <button>Contact Us</button>
            </Link>
          </div>
        </div>
      </TextContainer>
      <ImageContainer>
        <img src={Ai} alt="AI Illustration" />
      </ImageContainer>
    </SectionContainer>
  );
};

export default Home;
