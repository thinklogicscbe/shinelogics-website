import React, { useState, useEffect } from "react";
import { createJob } from "../API/AdminUser"; // Import API function
import {
  Container,
  MainContent,
  Header,
  HeaderLeft,
  HeaderRight,
  ToggleButton,
  Main,
  Title,
  Subtitle,
  FormContainer,
  FormColumn,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
} from "./style";

const ADMIN = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Job-related state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [numberOfPositions, setNumberOfPositions] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [requirements, setRequirements] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const jobData = {
      jobTitle,
      jobDescription,
      summary: {
        location,
        jobType,
        numberOfPositions: parseInt(numberOfPositions, 10),
        qualifications,
        experience,
        datePosted: new Date(datePosted),
      },
      requirements,
      qualifications,
      skills: skills.split(",").map((skill) => skill.trim()), // Convert skills to an array
    };

    try {
      const response = await createJob(jobData);
      console.log("Job Created Successfully:", response);
      alert("Job Created Successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job!");
    }
};
  return (
    <Container>
      <MainContent>
        <Header>
          <HeaderLeft>Welcome, Admin</HeaderLeft>
          <HeaderRight>
            {isMobile && (
              <ToggleButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? "Close Menu" : "Open Menu"}
              </ToggleButton>
            )}
          </HeaderRight>
        </Header>

        <Main>
          <Title>Job Management</Title>
          <Subtitle>Enter Job Details</Subtitle>

          <FormContainer onSubmit={handleSubmit}>
            <FormColumn>
              <FormGroup>
                <Label>Job Title</Label>
                <Input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Job Description</Label>
                <TextArea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Location</Label>
                <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Job Type</Label>
                <Input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)} required />
              </FormGroup>
            </FormColumn>

            <FormColumn>
              <FormGroup>
                <Label>Number of Positions</Label>
                <Input type="number" value={numberOfPositions} onChange={(e) => setNumberOfPositions(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Qualifications</Label>
                <TextArea value={qualifications} onChange={(e) => setQualifications(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Experience</Label>
                <Input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Date Posted</Label>
                <Input type="date" value={datePosted} onChange={(e) => setDatePosted(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Requirements</Label>
                <TextArea value={requirements} onChange={(e) => setRequirements(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Skills (comma-separated)</Label>
                <Input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
              </FormGroup>

              <SubmitButton type="submit">Submit</SubmitButton>
            </FormColumn>
          </FormContainer>
        </Main>
      </MainContent>
    </Container>
  );
};

export default ADMIN;
