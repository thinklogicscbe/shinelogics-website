import React from "react";
import {
  PageSection,
  Header,
  Title,
  Subtitle,
  Grid,
  Card,
  CardTitle,
  CardText,
  List,
  ListItem,
  CTASection,
  CTAButton,
} from "./styles";

const Resources: React.FC = () => {
  return (
    <PageSection>
      {/* Header */}
      <Header>
        <Title>Resources & Blog</Title>
        <Subtitle>
          Gated content, insights, and expert guidance to help you build secure
          and intelligent products.
        </Subtitle>
      </Header>

      {/* Content Grid */}
      <Grid>
        {/* Security Checklist */}
        <Card>
          <CardTitle>Free Security Checklist Download</CardTitle>
          <CardText>
            Essential AppSec best practices designed for modern product teams.
            Identify risks early and build secure-by-design applications.
          </CardText>
        </Card>

        {/* Webinar */}
        <Card>
          <CardTitle>Webinar: AI Security Trends 2025</CardTitle>
          <CardText>
            Live session covering emerging AI threats, adversarial attacks, and
            next-generation defensive strategies.
          </CardText>
        </Card>

        {/* Blogs */}
        <Card>
          <CardTitle>Blog Articles</CardTitle>
          <List>
            <ListItem>
              “Why Secure-by-Design Saves Millions”
            </ListItem>
            <ListItem>
              “AI-Powered Threat Detection: What Works”
            </ListItem>
            <ListItem>
              “IoT Security: Common Vulnerabilities and Fixes”
            </ListItem>
            <ListItem>
              “Data Privacy Compliance Made Simple”
            </ListItem>
          </List>
        </Card>
      </Grid>

      {/* CTA */}
      <CTASection>
        <h3>Stay updated with the latest security & AI insights</h3>
        <CTAButton>Subscribe for Updates</CTAButton>
      </CTASection>
    </PageSection>
  );
};

export default Resources;
