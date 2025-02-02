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
  MiddleContent,
  ButtonContainers,
} from "./style";
import { jobData } from "./jobdata"; // Importing job openings dynamically
import career from "../../assets/careers.jpg"

const Career = () => {
  // const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      <TopContent>
        <ImageContainer>
          <img src={career} alt="career exploration" />
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
      <MiddleContent>
      <p>Whether you're an experienced professional looking to take your career to the next level or a fresh graduate ready to start your journey, we offer a dynamic and collaborative work environment that fosters growth, learning, and innovation. You’ll have the opportunity to work with industry experts, cutting-edge technologies, and global clients, gaining invaluable experience while making meaningful contributions.</p>
      <p>At Shinelogics,<b> we don’t just offer jobs—we offer careers </b>that inspire, challenge, and reward. Join us and be part of a forward-thinking team where your skills, ideas, and passion will be valued and nurtured. Let’s create the future together!</p>
      </MiddleContent>
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
