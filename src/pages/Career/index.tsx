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
import { jobData } from "./jobdata"; // Importing job openings dynamically

const Career = () => {
  // const [selectedJob, setSelectedJob] = useState(null);

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
        </ContentContainer>
      </TopContent>

      <Heading>
        <Title>Job Aspirants</Title>
        <Subtitle>Our Current Openings</Subtitle>

        <TextWrapper>
          {jobData.map((job, index) => (
            <TextContainer key={index}>
              <Technologi>{job.position}</Technologi>
              <Roll>{job.role}</Roll>
              <p>{job.description}</p>
              <p> 
                  <div className="skills">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill">{skill}</span>
                    ))}
                  </div>
                </p>
              <ButtonContainers>
                <Link
                  to={`/Jobs?job=${job.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  View Job
                </Link>
              </ButtonContainers>
            </TextContainer>
          ))}
        </TextWrapper>
      </Heading>
    </>
  );
};

export default Career;
