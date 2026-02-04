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
  image: string;
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

/* ================= COMPONENT ================= */

const ServicePage: React.FC = () => {
  const [service, setService] = useState<Service | null>(null);

  /* ================= FETCH SERVICE ================= */

  useEffect(() => {
    const fetchService = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get("id");

        // ✅ IF ID EXISTS → GET SINGLE SERVICE
        if (serviceId) {
          const res = await axios.get(`${API}/${serviceId}`);
          setService(res.data.data);
        } 
        // ✅ FALLBACK → FIRST SERVICE
        else {
          const res = await axios.get(API);
          setService(res.data.data?.[0] || null);
        }
      } catch (error) {
        console.error("Failed to fetch service", error);
      }
    };

    fetchService();

    // 🔥 handle header clicks on same route
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
                <img src={exp.image} alt={exp.key} loading="lazy" />
              </CardImage>

              <CardContent>
                <DescriptionTitle>
                  {exp.key.replace(/_/g, " ")}
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
