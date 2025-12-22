import { Link } from "react-router-dom";
import Ai from "../../assets/hero-img.png";
import {
  SectionContainer,
  TextContainer,
  ImageContainer
} from "./style";

const Home = () => {
  return (
    <SectionContainer>
      <TextContainer>
        <div>
          {/* Main Headline */}
          <h1>Secure, Scalable & AI-Driven Technology Solutions</h1>

          {/* Main Description */}
          <p className="main-description">
            We build secure-by-design software, intelligent automation systems,
            and future-ready digital products for modern businesses.
          </p>

          {/* Sub-Hero Pitch */}
          <p className="sub-hero">
            Transform your business with enterprise-grade software development,
            advanced application security, AI/ML integration, IoT engineering,
            and data solutions—all delivered under one roof with a
            security-first mindset.
          </p>

          {/* CTA Buttons */}
          <div className="button-group">
            <Link to="/contact">
              <button>Get a Free Consultation</button>
            </Link>
            <Link to="/services">
              <button>View Our Services</button>
            </Link>
          </div>
        </div>
      </TextContainer>

      <ImageContainer>
        <img src={Ai} alt="AI-Driven Technology Solutions" />
      </ImageContainer>
    </SectionContainer>
  );
};

export default Home;
