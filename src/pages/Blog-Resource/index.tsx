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

import styled from "styled-components";

/* ═══════════════════════════════════════
   MODAL STYLES - Professional with Close Icon
═══════════════════════════════════════ */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 20px;
  max-width: 820px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
  border: 1px solid #e2e8f0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #64748b;
  font-size: 28px;
  font-weight: 300;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.1);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

const ModalContent = styled.div`
  padding: 2.8rem 3rem;
`;

const ModalTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 1.4rem;
`;

const ModalText = styled.p`
  font-size: 1.08rem;
  line-height: 1.85;
  color: #475569;
  margin-bottom: 2.2rem;
`;

// ModalSource styled component removed — uncomment when source links are re-enabled
// const ModalSource = styled.a`
//   display: inline-flex;
//   align-items: center;
//   gap: 10px;
//   color: #4f46e5;
//   font-weight: 600;
//   font-size: 1.02rem;
//   text-decoration: none;
//   padding: 12px 0;
//
//   &:hover {
//     color: #4338ca;
//     text-decoration: underline;
//   }
// `;

const BackButton = styled.button`
  padding: 14px 36px;
  background: linear-gradient(135deg, #6366f1, #22d3ee);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.35);
  }
`;

/* Card Image Container */
const CardImageContainer = styled.div`
  width: 100%;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.6rem;
  background: #f1f5f9;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

interface Resource {
  _id: string;
  title: string;
  description?: string;
  type: "POLITICS" | "TECH" | "AGRI" | "SPORTS" | "SOCIAL";
  image?: string;
  items?: string[];
  ctaText?: string;
  ctaLink?: string;
  source?: string;
  sourceUrl?: string;
}

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/resources`;

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, _setSelectedCategory] = useState<string>("ALL");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(API_URL);
        setResources(res.data.data || res.data || []);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };

    fetchResources();
  }, []);

  const filteredResources =
    selectedCategory === "ALL"
      ? resources
      : resources.filter((res) => res.type === selectedCategory);

  const openModal = (resource: Resource) => setSelectedResource(resource);
  const closeModal = () => setSelectedResource(null);

  return (
    <PageSection>
      {/* HEADER */}
      <Header>
        <Title>Resources & Insights</Title>
        <Subtitle>
          Gated content, insights, and expert guidance to help you build secure
          and intelligent products.
        </Subtitle>
      </Header>

      {/* CATEGORY FILTER */}
      {/* <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: "12px 20px",
          marginBottom: "40px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          fontSize: "16px",
          background: "white",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <option value="ALL">All Categories</option>
        <option value="POLITICS">Politics</option>
        <option value="TECH">Tech</option>
        <option value="AGRI">Agri</option>
        <option value="SPORTS">Sports</option>
        <option value="SOCIAL">Social</option>
      </select> */}

      {/* RESOURCES GRID */}
      <Grid>
        {filteredResources.map((resource) => (
          <Card
            key={resource._id}
            onClick={() => openModal(resource)}
            style={{ cursor: "pointer" }}
          >
            {/* Clean Image Inside Card */}
            {resource.image && (
              <CardImageContainer>
                <CardImage
                  src={resource.image}
                  alt={resource.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </CardImageContainer>
            )}

            <CardTitle>{resource.title}</CardTitle>

            {resource.description && (
              <CardText>{resource.description}</CardText>
            )}

            {/* Items List */}
            {resource.items && resource.items.length > 0 && (
              <List>
                {resource.items.slice(0, 3).map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
                {resource.items.length > 3 && (
                  <ListItem style={{ color: "#64748b" }}>
                    +{resource.items.length - 3} more...
                  </ListItem>
                )}
              </List>
            )}

            {/* CTA Hint */}
            {resource.ctaText && (
              <div
                style={{
                  marginTop: "1.8rem",
                  fontSize: "0.97rem",
                  color: "#6366f1",
                  fontWeight: 600,
                }}
              >
                → {resource.ctaText}
              </div>
            )}
          </Card>
        ))}
      </Grid>

      {/* GLOBAL CTA */}
      <CTASection>
        <h3>Stay updated with the latest security & AI insights</h3>
        <CTAButton>Subscribe for Updates</CTAButton>
      </CTASection>

      {/* PROFESSIONAL MODAL WITH CLOSE ICON */}
      {selectedResource && (
        <Backdrop onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            {/* Close Icon - Top Right */}
            <CloseButton onClick={closeModal}>&times;</CloseButton>

            {selectedResource.image && (
              <ModalImage
                src={selectedResource.image}
                alt={selectedResource.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            <ModalContent>
              <ModalTitle>{selectedResource.title}</ModalTitle>

              {selectedResource.description && (
                <ModalText>{selectedResource.description}</ModalText>
              )}

              {selectedResource.items && selectedResource.items.length > 0 && (
                <>
                  <h4
                    style={{
                      margin: "2rem 0 1.2rem",
                      color: "#1e2937",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    Key Highlights
                  </h4>
                  <List>
                    {selectedResource.items.map((item, index) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </List>
                </>
              )}

              {/* {(selectedResource.ctaLink || selectedResource.sourceUrl) && (
                <ModalSource
                  href={selectedResource.ctaLink || selectedResource.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Read full article •{" "}
                  {selectedResource.ctaText || selectedResource.source || "External Source"}
                </ModalSource>
              )} */}

              <div style={{ textAlign: "center" }}>
                <BackButton onClick={closeModal}>
                  ← Back to Resources
                </BackButton>
              </div>
            </ModalContent>
          </ModalBox>
        </Backdrop>
      )}
    </PageSection>
  );
};

export default Resources;