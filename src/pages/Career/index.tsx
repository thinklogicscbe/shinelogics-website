import React, { useEffect, useState } from "react";
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
  DescriptionContainer,
  ReadMoreButton,
} from "./style";
import { getAllJobs } from "../API/AdminUser"; // Import API function
import career from "../../assets/careers.jpg";
import Job from "../Jobs"; // Import Job component

// Define the job structure
interface JobType {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  skills: string[];
  summary?: { jobType?: string };
}

const Career = () => {
  // State to hold job data
  const [jobData, setJobData] = useState<JobType[]>([]);

  // State to track selected job
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();

        // Ensure response has "result" array
        if (response.result && Array.isArray(response.result)) {
          setJobData(response.result); // Update state with correct array
        } else {
          console.error("Invalid response format:", response);
          setJobData([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobData([]); // Ensure jobData is always an array
      }
    };

    fetchJobs();
  }, []);

  // State to manage Read More/Read Less for each job
  const [expandedJobs, setExpandedJobs] = useState<{ [key: string]: boolean }>({});

  const toggleReadMore = (jobId: string) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  // If a job is selected, display the Job component
  if (selectedJob) {
    return <Job job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }
  

  return (
    <>
      {/* Top Section */}
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

      {/* Middle Section */}
      <MiddleContent>
        <p>
          Whether you're an experienced professional looking to take your career
          to the next level or a fresh graduate ready to start your journey, we
          offer a dynamic and collaborative work environment that fosters
          growth, learning, and innovation.
        </p>
        <p>
          At Shinelogics, <b>we don’t just offer jobs—we offer careers</b> that
          inspire, challenge, and reward. Join us and be part of a
          forward-thinking team where your skills, ideas, and passion will be
          valued and nurtured.
        </p>
      </MiddleContent>

      {/* Job Listings Section */}
      <Heading>
        <Title>Job Aspirants</Title>
        <Subtitle>Our Current Openings</Subtitle>

        <TextWrapper>
          {jobData.length > 0 ? (
            jobData.map((job) => (
              <TextContainer key={job._id}>
                {/* Job Title */}
                <Technologi>{job.jobTitle}</Technologi>

                {/* Job Type */}
                <p style={{ color: "blue", fontWeight: "bolder" }}>
                  {job.summary?.jobType || "Not specified"}
                </p>

                {/* Job Description with Read More */}
                <DescriptionContainer>
                  {expandedJobs[job._id] ? (
                    <>
                      <span>{job.jobDescription}</span>
                      <ReadMoreButton onClick={() => toggleReadMore(job._id)}>
                        Read Less
                      </ReadMoreButton>
                    </>
                  ) : (
                    <>
                      <Roll>{job.jobDescription}</Roll>
                      <ReadMoreButton onClick={() => toggleReadMore(job._id)}>
                        Read More
                      </ReadMoreButton>
                    </>
                  )}
                </DescriptionContainer>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="skills">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill" style={{ color: "black", fontSize: "14px" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Job Button */}
                <ButtonContainers>
                  <button onClick={() => setSelectedJob(job)}>View Job</button>
                </ButtonContainers>
              </TextContainer>
            ))
          ) : (
            <p>No job openings available at the moment.</p>
          )}
        </TextWrapper>
      </Heading>
    </>
  );
};

export default Career;
