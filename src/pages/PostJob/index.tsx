import React, { useState } from "react";
import { createJob } from "../API/AdminUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
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

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [numberOfPositions, setNumberOfPositions] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [requirements, setRequirements] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      shortDescription,
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
      skills: skills.split(",").map(s => s.trim()),
    };

    try {
      await createJob(jobData);
      toast.success("Job created successfully!");

      setJobTitle("");
      setShortDescription("");
      setJobDescription("");
      setLocation("");
      setJobType("");
      setNumberOfPositions("");
      setQualifications("");
      setExperience("");
      setDatePosted("");
      setRequirements("");
      setSkills("");
    } catch {
      toast.error("Failed to create job");
    }
  };

  return (
    <Container>
      <Title>Post Job</Title>
      <Subtitle>Enter job details</Subtitle>

      <FormContainer onSubmit={handleSubmit}>
        {/* LEFT COLUMN */}
        <FormColumn>
          <FormGroup>
            <Label>Job Title</Label>
            <Input
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Short Description</Label>
            <TextArea
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              maxLength={150}
            />
          </FormGroup>

          <FormGroup>
            <Label>Job Description</Label>
            <TextArea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Skills (comma separated)</Label>
            <Input
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="Python, SQL, AWS"
            />
          </FormGroup>
        </FormColumn>

        {/* RIGHT COLUMN */}
        <FormColumn>
          <FormGroup>
            <Label>Location</Label>
            <Input
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Job Type</Label>
            <Input
              value={jobType}
              onChange={e => setJobType(e.target.value)}
              placeholder="Full-Time / Contract"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Number of Positions</Label>
            <Input
              type="number"
              value={numberOfPositions}
              onChange={e => setNumberOfPositions(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Experience</Label>
            <Input
              value={experience}
              onChange={e => setExperience(e.target.value)}
              placeholder="2–4 years"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Qualifications</Label>
            <TextArea
              value={qualifications}
              onChange={e => setQualifications(e.target.value)}
              placeholder="Bachelor’s degree in Computer Science or related field"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Date Posted</Label>
            <Input
              type="date"
              value={datePosted}
              onChange={e => setDatePosted(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Requirements</Label>
            <TextArea
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Create Job</SubmitButton>
        </FormColumn>
      </FormContainer>

      <ToastContainer position="top-right" />
    </Container>
  );
};

export default PostJob;
