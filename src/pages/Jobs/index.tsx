import { Link } from "react-router-dom";
import React from "react";
import {
  Destinationcontiner,
  TopSection,
  Destination,
  Destinationcontent,
  ImageContainer,
  ContentWrapper,
  BottomSection,
  SectionTitle,
  List,
  Leftsidecontent,
  Rightsidecontent,
  Jobsummery,
  Location,
  JobType,
  Positionscount,
  Qualification,
  Experience,
  Title,
  StyledHr,
  Posted,
  ApplyButton
} from './style';

// Define the JobType interface based on Mongoose Schema
interface JobType {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  summary: {
    location: string;
    jobType: string;
    numberOfPositions: number;
    qualifications: string;
    experience: string;
    datePosted: string;
  };
  requirements: string;
  qualifications: string;
  skills: string[];
}

// Define props for the Job component
interface JobProps {
  job: JobType;
  onBack: () => void;
}

const Job: React.FC<JobProps> = ({ job, onBack }) => {

  
  return (
    <Destinationcontiner>
      
      {/* Top Section: Image + Main Content */}
      <TopSection>
        <ImageContainer>
          <img src="/img/career/uiux.jpg" alt={job.jobTitle} />
        </ImageContainer>

        <ContentWrapper>
          <Destination>
            <h2>{job.jobTitle}</h2>
          </Destination>
          <Destinationcontent>{job.jobDescription}</Destinationcontent>
        </ContentWrapper>
      </TopSection>

      {/* Bottom Section with Left and Right Content */}
      <BottomSection>
        {/* Left Content */}
        <Leftsidecontent>
          <SectionTitle style={{ marginLeft: "3%", fontSize: "36px" }}>
            {job.jobTitle}
          </SectionTitle>

          <SectionTitle style={{ marginLeft: "6%" }}>Job Description:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li>{job.jobDescription}</li>
          </List>

          <SectionTitle style={{ marginLeft: "6%" }}>Requirements:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li>{job.requirements}</li>
          </List>

          <SectionTitle style={{ marginLeft: "6%" }}>Skills:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </List>

          <SectionTitle style={{ marginLeft: "6%" }}>Qualifications:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li>{job.qualifications}</li>
          </List>
        </Leftsidecontent>

        {/* Right Content */}
        <Rightsidecontent>
          <Jobsummery>
            <Title>
              <h1>Job Summary</h1>
            </Title>
            <Location>
              <h4>
                <img src="/img/job icon/location.png" width="20" height="20" alt="Location Icon" /> Location
              </h4>
              <p>{job.summary.location}</p>
            </Location>
            <StyledHr />
            <JobType>
              <h4>
                <img src="/img/job icon/job.png" width="20" height="20" alt="Job Type Icon" /> Job Type
              </h4>
              <p>{job.summary.jobType}</p>
            </JobType>
            <StyledHr />
            <Positionscount>
              <h4>
                <img src="/img/job icon/people.png" width="20" height="20" alt="Positions Icon" /> No. of Positions
              </h4>
              <p>{job.summary.numberOfPositions}</p>
            </Positionscount>
            <StyledHr />
            <Qualification>
              <h4>
                <img src="/img/job icon/qualification.png" width="20" height="20" alt="Qualification Icon" /> Qualification
              </h4>
              <p>{job.summary.qualifications}</p>
            </Qualification>
            <StyledHr />
            <Experience>
              <h4>
                <img src="/img/job icon/exp.png" width="20" height="20" alt="Experience Icon" /> Experience
              </h4>
              <p>{job.summary.experience}</p>
            </Experience>
            <StyledHr />
            <Posted>
              <h4>
                <img src="/img/job icon/time.png" width="20" height="20" alt="Posted Icon" /> Posted
              </h4>
              <p>{new Date(job.summary.datePosted).toDateString()}</p>
            </Posted>
          </Jobsummery>
        </Rightsidecontent>
      </BottomSection>

      {/* Apply Button */}
      <Link to="/applyForm">
        <ApplyButton as="button">Apply</ApplyButton>
      </Link>
    </Destinationcontiner>
  );
};

export default Job;
