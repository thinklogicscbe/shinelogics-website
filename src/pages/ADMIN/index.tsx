import React, { useState, useEffect } from "react";
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

const ADMIN: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Job-related state
  const [jobTitle, setJobTitle] = useState("");
  const [jobShortDescription, setJobShortDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [requirements, setRequirements] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      jobTitle,
      jobShortDescription,
      skills,
      requirements,
      qualifications,
    });
  };

  return (
    <Container>
   

      <MainContent>
        <Header>
          <HeaderLeft>Welcome, Admin</HeaderLeft>
          <HeaderRight>
            {/* <span>John Doe</span>
            <span>Notifications</span>
            <span>Logout</span> */}
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
            {/* Left Side */}
            <FormColumn>
              <FormGroup>
                <Label>Job Title</Label>
                <Input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Job Short Description</Label>
                <TextArea value={jobShortDescription} onChange={(e) => setJobShortDescription(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Skills</Label>
                <Input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
              </FormGroup>
            </FormColumn>

            {/* Right Side */}
            <FormColumn>
              <FormGroup>
                <Label>Job Title (Prefilled)</Label>
                <Input type="text" value={jobTitle} readOnly />
              </FormGroup>

              <FormGroup>
                <Label>Job Description (Prefilled)</Label>
                <TextArea value={jobShortDescription} readOnly />
              </FormGroup>

              <FormGroup>
                <Label>Requirements</Label>
                <TextArea value={requirements} onChange={(e) => setRequirements(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <Label>Qualifications</Label>
                <TextArea value={qualifications} onChange={(e) => setQualifications(e.target.value)} required />
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
