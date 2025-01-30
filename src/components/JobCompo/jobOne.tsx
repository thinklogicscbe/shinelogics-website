import React from 'react';
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
    Posted 
} from "./style";

const JobOne = () => {
  return (
    <Destinationcontiner>

      {/* Top Section: Image + Main Content */}
      <TopSection>
        <ImageContainer>
          <img src="/img/career/uiux.jpg" alt="job uiux" />
        </ImageContainer>

        <ContentWrapper>
          <Destination>
            <h2>UI/UX Designer</h2>
          </Destination>
          <Destinationcontent>
            We are seeking a creative and detail-oriented UI/UX Designer to join our team. In this role, you will be responsible for designing intuitive and engaging user interfaces for our services. You will collaborate closely with our product managers, developers, and other stakeholders to create designs that not only meet user needs but also align with our business goals.
          </Destinationcontent>
        </ContentWrapper>
      </TopSection> {/* top section end */}

      {/* Bottom Section with Left and Right Content */}
      <BottomSection>
        {/* Left Content */}
        <Leftsidecontent >
          <SectionTitle style={{ marginLeft: '3%',fontSize: '36px' }}>Senior UI/UX Designer</SectionTitle>

          <SectionTitle style={{ marginLeft: '6%' }}>Job Description:</SectionTitle>
          <List style={{ marginLeft: '12%' }}>
            <li>Create wireframes, prototypes, and high-fidelity mock-ups for web and mobile applications.</li>
            <li>Translate design concepts into responsive, clean HTML and CSS code.</li>
            <li>Work closely with developers to ensure accurate implementation.</li>
            <li>Maintain design consistency and adhere to brand guidelines.</li>
            <li>Research user needs, behaviors, and feedback.</li>
          </List>

          <SectionTitle style={{ marginLeft: '6%' }}>Requirements:</SectionTitle>
          <List style={{ marginLeft: '12%' }}>
            <li>Proven experience as a UI/UX Designer with a strong portfolio.</li>
            <li>Proficiency in HTML5 and CSS3.</li>
            <li>Experience with Figma, Sketch, or Adobe XD.</li>
            <li>Understanding of responsive design principles.</li>
            <li>Knowledge of JavaScript and React is a plus.</li>
          </List>

          <SectionTitle style={{ marginLeft: '6%' }}>Qualifications:</SectionTitle>
          <List style={{ marginLeft: '12%' }}>
            <li>Bachelor’s degree in Computer Science or related field.</li>
            <li>5-7 years of experience in UI/UX design.</li>
            <li>Strong problem-solving skills.</li>
            <li>Ability to work independently and collaboratively.</li>
            <li>Strong communication skills.</li>
          </List>
        </Leftsidecontent>

        {/* Right Content */}
        <Rightsidecontent>
          <Jobsummery>
            <Title> 
                <h1>Job Summary</h1> 
                </Title>
            <Location>
              <h4><img src='/img/job icon/location.png' width="20" height="20" alt="Location Icon"/>  Location</h4>
              <p>Chennai</p>
            </Location> 
            <StyledHr />
            <JobType>
              <h4><img src='/img/job icon/job.png' width="20" height="20" alt="JOb"/> Job Type</h4>
              <p>Permanent</p>
            </JobType>
            <StyledHr />
            <Positionscount>
              <h4><img src='/img/job icon/people.png' width="20" height="20" alt="Location Icon"/>  No.of Positions</h4>
              <p>33</p>
            </Positionscount>
            <StyledHr />
            <Qualification>
              <h4><img src='/img/job icon/qualification.png' width="20" height="20" alt="Location Icon"/>  Qualification</h4>
              <p>B.E-IT & CSS</p>
            </Qualification>
            <StyledHr />
            <Experience>
              <h4><img src='/img/job icon/exp.png' width="20" height="20" alt="Location Icon"/>  Experience</h4>
              <p>1-3 Years</p>
            </Experience>
            <StyledHr />
            <Posted>
              <h4><img src='/img/job icon/time.png' width="20" height="20" alt="Location Icon"/>  Posted</h4>
              <p>2 Months</p>
            </Posted>
          </Jobsummery>
        </Rightsidecontent> {/* bottom right end */}
      </BottomSection> {/* bottom section end */}

    </Destinationcontiner>
  );
}

export default JobOne;