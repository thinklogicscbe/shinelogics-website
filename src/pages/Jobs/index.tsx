import { Link, useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  ApplyButton,
  ButtonStyle
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



const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve job data from state or fallback to localStorage
  const job = location.state?.job || JSON.parse(localStorage.getItem("job") || "{}");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApply = () => {
    console.log("Navigating with Job ID:", job._id);
    navigate("/applyForm", { state: { jobId: job._id } });
  };

  return (
    <Destinationcontiner>
      <ButtonStyle onClick={() => navigate(-1)}>←</ButtonStyle>

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
        <Leftsidecontent>
          <SectionTitle style={{ marginLeft: "6%", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
            Job Description:
          </SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li className="desc" style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "justify", fontWeight: "500", color: "#333" }}>
              {job.jobDescription}
            </li>
          </List>

          <SectionTitle style={{ marginLeft: "6%", color: "blue", fontSize: "24px", fontWeight: "bold" }}>Requirements:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li className="desc" style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "justify", fontWeight: "500", color: "#333" }}>
              {job.requirements}
            </li>
          </List>

          <SectionTitle style={{ marginLeft: "6%", color: "blue", fontSize: "24px", fontWeight: "bold" }}>Skills:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            {job.skills?.map((skill:any, index:any ) => (
              <li className="desc" key={index} style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "justify", fontWeight: "500", color: "#333" }}>
                {skill}
              </li>
            ))}
          </List>

          <SectionTitle style={{ marginLeft: "6%", color: "blue", fontSize: "24px", fontWeight: "bold" }}>Qualifications:</SectionTitle>
          <List style={{ marginLeft: "12%" }}>
            <li className="desc" style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "justify", fontWeight: "500", color: "#333" }}>
              {job.qualifications}
            </li>
          </List>
        </Leftsidecontent>

        {/* Right Content */}
        <Rightsidecontent>
          <Jobsummery>
            <Title>
              <h1>Job Summary</h1>
            </Title>
            <Location>
              <h4><img src="/img/job icon/location.png" width="20" height="20" alt="Location Icon" /> Location</h4>
              <p>{job.summary?.location}</p>
            </Location>
            <StyledHr />
            <JobType>
              <h4><img src="/img/job icon/job.png" width="20" height="20" alt="Job Type Icon" /> Job Type</h4>
              <p>{job.summary?.jobType}</p>
            </JobType>
            <StyledHr />
            <Positionscount>
              <h4><img src="/img/job icon/people.png" width="20" height="20" alt="Positions Icon" /> No. of Positions</h4>
              <p>{job.summary?.numberOfPositions}</p>
            </Positionscount>
            <StyledHr />
            <Qualification>
              <h4><img src="/img/job icon/qualification.png" width="20" height="20" alt="Qualification Icon" /> Qualification</h4>
              <p>{job.summary?.qualifications}</p>
            </Qualification>
            <StyledHr />
            <Experience>
              <h4><img src="/img/job icon/exp.png" width="20" height="20" alt="Experience Icon" /> Experience</h4>
              <p>{job.summary?.experience}</p>
            </Experience>
            <StyledHr />
            <Posted>
              <h4><img src="/img/job icon/time.png" width="20" height="20" alt="Posted Icon" /> Posted</h4>
              <p>{job.summary?.datePosted ? new Date(job.summary.datePosted).toDateString() : "N/A"}</p>
            </Posted>
          </Jobsummery>
        </Rightsidecontent>
      </BottomSection>

      {/* Apply Button */}
      <ApplyButton onClick={handleApply}>Apply</ApplyButton>
    </Destinationcontiner>
  );
};

export default Jobs;
