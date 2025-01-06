import React from "react";
import Ai from "../../assets/hero-img.png";
import {SectionContainer, TextContainer, ImageContainer} from './style';

const Home = () => {
  return (
    <SectionContainer>
      <TextContainer>
        <div>
          <span>AI.Tech</span>
          <h1>Artificial Intelligence for Your Business</h1>
          <p>
            Tempor rebun no at dolore lorem clita rebun ipsum rebun stet dolor
            sed justo kasd. Ut dolor sed magna dolor sea diam. Sit diam sit.
          </p>
          <div className="button-group">
            <button>Read More</button>
            <button>Contact Us</button>
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
