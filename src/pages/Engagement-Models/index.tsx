import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface EngagementModel {
  _id: string;
  title: string;
  objective: string;
  challenge: string;
  features: string[];
  cta?: string;
}

const EngagementModels: React.FC = () => {
  const [models, setModels] = useState<EngagementModel[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3006/api/engagement-models";

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(API_URL);
        setModels(response.data.data || response.data);
      } catch (error) {
        console.error("Failed to fetch engagement models", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return <Section>Loading engagement models...</Section>;
  }

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
        {models.map((model, index) => (
          <Card key={model._id}>
            <Badge>{String(index + 1).padStart(2, "0")}</Badge>

            <CardTitle>{model.title}</CardTitle>

            {/* Objective */}
            <CardText>{model.objective}</CardText>

            {/* Features */}
            <List>
              {model.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </List>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default EngagementModels;
