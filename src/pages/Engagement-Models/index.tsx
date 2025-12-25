import React from "react";
import {
  Section,
  Header,
  Title,
  Description,
  Grid,
  Card,
  Badge,
  CardTitle,
  CardText,
  List,
} from "./styles";

const EngagementModels: React.FC = () => {
  return (
    <Section>
      <Header>
        <Title>Engagement Models</Title>
        <Description>
          Flexible engagement options designed to match your business goals,
          timelines, and delivery expectations.
        </Description>
      </Header>

      <Grid>
        {/* 1 */}
        <Card>
          <Badge>01</Badge>
          <CardTitle>Fixed-Price Projects</CardTitle>
          <CardText>
            Ideal for well-defined requirements and complete end-to-end delivery
            with clear scope.
          </CardText>
          <List>
            <li>Clear timelines and predictable budgets</li>
            <li>Best for startups and MVPs</li>
            <li>Suitable for specific feature development</li>
          </List>
        </Card>

        {/* 2 */}
        <Card>
          <Badge>02</Badge>
          <CardTitle>Dedicated Teams</CardTitle>
          <CardText>
            Your extended engineering team working as an integral part of your
            organization.
          </CardText>
          <List>
            <li>Developers, QA, AppSec, AI, Data & DevOps</li>
            <li>Scale team size up or down as needed</li>
            <li>Best for long-term product development</li>
          </List>
        </Card>

        {/* 3 */}
        <Card>
          <Badge>03</Badge>
          <CardTitle>Retainer Model</CardTitle>
          <CardText>
            Long-term collaboration with consistent support and predictable
            monthly costs.
          </CardText>
          <List>
            <li>Ongoing support and maintenance</li>
            <li>Continuous improvements & enhancements</li>
            <li>Ideal for mature and live products</li>
          </List>
        </Card>

        {/* 4 */}
        <Card>
          <Badge>04</Badge>
          <CardTitle>Consulting & Advisory</CardTitle>
          <CardText>
            Expert guidance for strategic and high-impact technology decisions.
          </CardText>
          <List>
            <li>Architecture & system design</li>
            <li>Security & compliance consulting</li>
            <li>Digital transformation strategy</li>
          </List>
        </Card>
      </Grid>
    </Section>
  );
};

export default EngagementModels;
