import React from "react";
import {
  Section,
  Header,
  Title,
  Description,
  Grid,
  Card,
  Number,
  CardTitle,
  CardText,
} from "./styles";

const WhyChooseUs: React.FC = () => {
  return (
    <Section>
      <Header>
        <Title>Why Choose Us</Title>
        <Description>
          We combine security-first engineering, AI-powered innovation, and
          deep technical expertise to deliver scalable digital solutions that
          drive real business impact.
        </Description>
      </Header>

      <Grid>
        <Card>
          <Number>01</Number>
          <CardTitle>Security at the Core</CardTitle>
          <CardText>
            Every solution is designed and built to meet industry standards such
            as ISO 27001 and SOC 2, ensuring security from day one.
          </CardText>
        </Card>

        <Card>
          <Number>02</Number>
          <CardTitle>AI-Powered Innovation</CardTitle>
          <CardText>
            We leverage modern automation, machine learning, and intelligent
            systems to create smarter and more efficient digital products.
          </CardText>
        </Card>

        <Card>
          <Number>03</Number>
          <CardTitle>Full-Stack Expertise</CardTitle>
          <CardText>
            From software development and security to IoT, data platforms, and
            AI — all capabilities are delivered under one roof.
          </CardText>
        </Card>

        <Card>
          <Number>04</Number>
          <CardTitle>Rapid Delivery Frameworks</CardTitle>
          <CardText>
            Proven delivery frameworks enable faster time-to-market without
            compromising on quality, performance, or security.
          </CardText>
        </Card>

        <Card>
          <Number>05</Number>
          <CardTitle>End-to-End Execution</CardTitle>
          <CardText>
            We handle everything from architecture and development to
            deployment, monitoring, and ongoing support.
          </CardText>
        </Card>

        <Card>
          <Number>06</Number>
          <CardTitle>Flexible Engagement Models</CardTitle>
          <CardText>
            Choose what fits your business best — project-based delivery,
            retainers, or fully dedicated engineering teams.
          </CardText>
        </Card>

        <Card>
          <Number>07</Number>
          <CardTitle>Proven Track Record</CardTitle>
          <CardText>
            50+ successful projects delivered and 40+ satisfied clients across
            startups, SMEs, and enterprises.
          </CardText>
        </Card>
      </Grid>
    </Section>
  );
};

export default WhyChooseUs;
