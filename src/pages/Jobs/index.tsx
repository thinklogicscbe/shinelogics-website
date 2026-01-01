import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Destinationcontiner,
  TopSection,
  Destination,
  Destinationcontent,
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
  ButtonStyle,
  PageHeader
} from "./style";
import { getJobById } from "../API/AdminUser";

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  qualifications: string;
  skills: string[];
  summary: {
    location: string;
    jobType: string;
    numberOfPositions: number;
    qualifications: string;
    experience: string;
    datePosted: string;
  };
}

const Jobs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJob(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    try {
      const res = await getJobById(jobId);

      // ✅ res = { success, result }
      setJob(res.result);
    } catch (err) {
      console.error("Failed to fetch job", err);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!job) return <p style={{ textAlign: "center" }}>Job not found</p>;

  return (
    <Destinationcontiner>
      <PageHeader>
        <ButtonStyle onClick={() => navigate("/career")}>← Back</ButtonStyle>
      </PageHeader>

      {/* TOP */}
      <TopSection>
        <ContentWrapper>
          <Destination>
            <h2>{job.jobTitle}</h2>
          </Destination>
          <Destinationcontent>{job.jobDescription}</Destinationcontent>
        </ContentWrapper>
      </TopSection>

      {/* BOTTOM */}
      <BottomSection>
        <Leftsidecontent>
          <SectionTitle>Job Description</SectionTitle>
          <List>
            <li>{job.jobDescription}</li>
          </List>

          <SectionTitle>Requirements</SectionTitle>
          <List>
            <li>{job.requirements}</li>
          </List>

          <SectionTitle>Skills</SectionTitle>
          <List>
            {job.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </List>

          <SectionTitle>Qualifications</SectionTitle>
          <List>
            <li>{job.qualifications}</li>
          </List>
        </Leftsidecontent>

        <Rightsidecontent>
          <Jobsummery>
            <Title>Job Summary</Title>

            <Location>
              <h4>📍 Location</h4>
              <p>{job.summary.location}</p>
            </Location>

            <StyledHr />

            <JobType>
              <h4>💼 Job Type</h4>
              <p>{job.summary.jobType}</p>
            </JobType>

            <StyledHr />

            <Positionscount>
              <h4>👥 Positions</h4>
              <p>{job.summary.numberOfPositions}</p>
            </Positionscount>

            <StyledHr />

            <Qualification>
              <h4>🎓 Qualification</h4>
              <p>{job.summary.qualifications}</p>
            </Qualification>

            <StyledHr />

            <Experience>
              <h4>🕒 Experience</h4>
              <p>{job.summary.experience}</p>
            </Experience>

            <StyledHr />

            <Posted>
              <h4>📅 Posted</h4>
              <p>{new Date(job.summary.datePosted).toDateString()}</p>
            </Posted>
          </Jobsummery>
        </Rightsidecontent>
      </BottomSection>

      <ApplyButton
        onClick={() => navigate("/applyForm", { state: { jobId: job._id } })}
      >
        Apply Now
      </ApplyButton>
    </Destinationcontiner>
  );
};

export default Jobs;
