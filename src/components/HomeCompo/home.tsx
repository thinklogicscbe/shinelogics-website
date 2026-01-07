import { useNavigate } from "react-router-dom";
import {
  SectionContainer,
  GridWrapper,
  LeftGrid,
  RightGrid,
  VideoBox,
  ButtonGroup,
} from "./style";

const Home = () => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <GridWrapper>
        {/* LEFT GRID — CONTENT */}
        <LeftGrid>
          <h1>Secure, Scalable & AI-Driven Technology Solutions</h1>

          <p className="main-description">
            We build secure-by-design software, intelligent automation systems,
            and future-ready digital products for modern businesses.
          </p>

          <p className="sub-hero">
            Our expertise spans enterprise software development, application
            security, AI/ML integration, IoT engineering, and data platforms —
            all delivered with a security-first mindset.
          </p>

          <ButtonGroup>
            <button
              className="primary"
              onClick={() => navigate("/free-consultation")}
            >
              Get a Free Consultation
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/service")}
            >
              View Our Services
            </button>
          </ButtonGroup>
        </LeftGrid>

        {/* RIGHT GRID — VIDEOS */}
        <RightGrid>
          <VideoBox>
            <video controls>
              <source src="/videos/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </VideoBox>

          <VideoBox>
            <video controls>
              <source src="/videos/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </VideoBox>
        </RightGrid>
      </GridWrapper>
    </SectionContainer>
  );
};

export default Home;
