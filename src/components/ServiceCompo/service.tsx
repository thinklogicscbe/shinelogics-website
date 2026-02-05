import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SectionContainer,
  DetailsContainer,
  Title,
  DescriptionTitle,
  DescriptionText,
  DescriptionText1,
  CardsGrid,
  ServiceCard,
  CardImage,
  CardContent,
} from "./style";

/* ================= TYPES ================= */

interface Expertise {
  key: string;
  image: string; // image OR video URL
  description: string[];
}

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  expertise: Expertise[];
}

/* ================= API ================= */

const API = `${process.env.REACT_APP_BACKEND_URL}/service`;

/* ================= UTILS ================= */

const isVideo = (url: string) =>
  /\.(mp4|webm|ogg)$/i.test(url);

/* ================= COMPONENT ================= */

const ServicePage: React.FC = () => {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get("id");

        if (serviceId) {
          const res = await axios.get(`${API}/${serviceId}`);
          setService(res.data.data);
        } else {
          const res = await axios.get(API);
          setService(res.data.data?.[0] || null);
        }
      } catch (error) {
        console.error("Failed to fetch service", error);
      }
    };

    fetchService();
    window.addEventListener("popstate", fetchService);
    return () => window.removeEventListener("popstate", fetchService);
  }, []);

  if (!service) return null;

  /* ================= UI ================= */

  return (
    <SectionContainer>
      <Title>{service.title}</Title>

      <DescriptionText
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "18px",
        }}
      >
        {service.description}
      </DescriptionText>

      <DetailsContainer>
        <CardsGrid>
          {service.expertise.map((exp, index) => (
            <ServiceCard key={index}>
              <CardImage>
                {isVideo(exp.image) ? (
                  <video
                    src={exp.image}
                    controls
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <img
                    src={exp.image}
                    alt={exp.key}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </CardImage>

              <CardContent>
                <DescriptionTitle>
                  {exp.key}
                </DescriptionTitle>

                <DescriptionText1>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </DescriptionText1>
              </CardContent>
            </ServiceCard>
          ))}
        </CardsGrid>
      </DetailsContainer>
    </SectionContainer>
  );
};

export default ServicePage;
