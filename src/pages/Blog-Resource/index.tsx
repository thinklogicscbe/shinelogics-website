import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface Resource {
  _id: string;
  title: string;
  description?: string;
  type: "CHECKLIST" | "WEBINAR" | "BLOG";
  items?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/resources`;

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(API_URL);
        setResources(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <PageSection>
      {/* ===== HEADER ===== */}
      <Header>
        <Title>Resources & Blog</Title>
        <Subtitle>
          Gated content, insights, and expert guidance to help you build secure
          and intelligent products.
        </Subtitle>
      </Header>

      {/* ===== CONTENT GRID ===== */}
      <Grid>
        {resources.map(resource => (
          <Card key={resource._id}>
            <CardTitle>{resource.title}</CardTitle>

            {resource.description && (
              <CardText>{resource.description}</CardText>
            )}

            {/* BLOG LIST */}
            {resource.type === "BLOG" && resource.items && (
              <List>
                {resource.items.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
            )}

            {/* CTA BUTTON (CHECKLIST / WEBINAR) */}
            {resource.ctaText && resource.ctaLink && (
              <CTAButton
                as="a"
                href={resource.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "14px", display: "inline-block" }}
              >
                {resource.ctaText}
              </CTAButton>
            )}
          </Card>
        ))}
      </Grid>

      {/* ===== GLOBAL CTA ===== */}
      <CTASection>
        <h3>Stay updated with the latest security & AI insights</h3>
        <CTAButton>Subscribe for Updates</CTAButton>
      </CTASection>
    </PageSection>
  );
};

export default Resources;
