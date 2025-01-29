import React from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  Title,
  TopContent,
  ImageContainer,
  ContentContainer,
  Subtitle,
  TextContainer,
  TextWrapper,
  Technologi,
  Roll,
  ButtonContainers,
} from "./style";

const Career = () => {
  return (
    <>
      <TopContent>
        <ImageContainer>
          <img src="/img/career/careerimg.jpg" alt="career exploration" />
        </ImageContainer>

        <ContentContainer>
          <h2>Chance to Explore</h2>
          <h3>Opportunities</h3>
          <p>
            Are you passionate about innovation, technology, and making a real
            impact in the digital world? At Shinelogics, we believe that great
            companies are built by great people. We are always on the lookout
            for talented, motivated, and creative individuals who are eager to
            push boundaries, solve complex challenges, and contribute to
            groundbreaking projects.
          </p>
          <p>
            Whether you're an experienced professional looking to take your
            career to the next level or a fresh graduate ready to start your
            journey, we offer a dynamic and collaborative work environment that
            fosters growth, learning, and innovation. You’ll have the
            opportunity to work with industry experts, cutting-edge
            technologies, and global clients, gaining invaluable experience
            while making meaningful contributions.
          </p>
          <p>
            At Shinelogics, we don’t just offer jobs—we offer careers that
            inspire, challenge, and reward. Join us and be part of a
            forward-thinking team where your skills, ideas, and passion will be
            valued and nurtured. Let’s create the future together!
          </p>
        </ContentContainer>
      </TopContent>

      <Heading>
        <Title>Job Aspirants</Title>
        <Subtitle>Our Current Openings</Subtitle>

        {/* Job portal...*/}
        <TextWrapper>
          <TextContainer>
            <Technologi>UI/UX Designer</Technologi>
            <Roll>Senior UI/UX Designer</Roll>
            <p>
              Here, you will find the various positions we are currently hiring
              for. Join our team and take the next step in your career. We
              believe in offering the best opportunities for growth,
              development, and a thriving work environment.
            </p>
            <ButtonContainers>
              <Link
                to="/Jobs?job=jobOne"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                View Job {/* 1 */}
              </Link>
            </ButtonContainers>
          </TextContainer>

          <TextContainer>
            <Technologi>UI/UX Designer</Technologi>
            <Roll>Senior UI/UX Designer</Roll>
            <p>
              Discover a wide array of roles across departments, each aimed at
              fostering your growth and career success. We are dedicated to
              creating a nurturing work environment where innovation thrives.
            </p>
            <ButtonContainers>
              <Link
                to="/Jobs?job=jobTwo"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                View Job {/* 2 */}
              </Link>
            </ButtonContainers>
          </TextContainer>

          <TextContainer>
            <Technologi>UI/UX Designer</Technologi>
            <Roll>Senior UI/UX Designer</Roll>
            <p>
              Be part of a dynamic team that values creativity, collaboration,
              and professional excellence. Together, let's achieve remarkable
              milestones and shape a successful future.
            </p>
            <ButtonContainers>
              <Link
                to="/Jobs?job=jobThree"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                View Job {/* 3 */}
              </Link>
            </ButtonContainers>
          </TextContainer>
        </TextWrapper>
      </Heading>
    </>
  );
};

export default Career;
