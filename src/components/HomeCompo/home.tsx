import React from "react";
import Ai from "../../assets/hero-img.png";
import {SectionContainer, TextContainer, ImageContainer} from './style';

const Home = () => {
  return (
    <SectionContainer>
      <TextContainer>
        <div>
          <h1>WE'RE AN AI-DRIVEN PRODUCT DEVELOPMENT COMPANY</h1>
          <div className="button-group">
            <button>Read More</button>
            <button >Contact Us</button>
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
