import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Section,
  Header,
  Title,
  Subtitle,
  CardsWrapper,
  CardsGrid,
  PartnerCard,
  PartnerLogo,
  PartnerName,
  PartnerDesc,
  LogoWrapper,
} from "./styled";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/partners`;

/* ================= TYPES ================= */

interface Partner {
  _id: string;
  name: string;
  description: string;
  logo: string;
  isActive: boolean;
  order: number;
}

/* ================= COMPONENT ================= */

const TrustedPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  /* ================= API CALL ================= */

  const fetchPartners = async () => {
    try {
      const res = await axios.get(API_URL);

      const apiData =
        res?.data?.result ||
        res?.data?.data ||
        [];

      // ✅ show only active partners, ordered
      const activePartners = Array.isArray(apiData)
        ? apiData
            .filter((item: Partner) => item.isActive)
            .sort(
              (a: Partner, b: Partner) =>
                (a.order || 0) - (b.order || 0)
            )
        : [];

      setPartners(activePartners);
    } catch (error) {
      console.error("Failed to load partners", error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <Section>
      <Header>
        <Title>Trusted Partners</Title>
        <Subtitle>
          We collaborate with innovative organizations across industries to
          deliver secure, scalable, and impactful solutions.
        </Subtitle>
      </Header>

      <CardsWrapper>
        <CardsGrid>
          {loading
            ? null
            : [...partners, ...partners].map((item, index) => (
                <PartnerCard key={`${item._id}-${index}`}>
                  <LogoWrapper>
                    <PartnerLogo
                      src={item.logo}
                      alt={item.name}
                    />
                  </LogoWrapper>

                  <PartnerName>{item.name}</PartnerName>

                  <PartnerDesc>
                    {item.description}
                  </PartnerDesc>
                </PartnerCard>
              ))}
        </CardsGrid>
      </CardsWrapper>
    </Section>
  );
};

export default TrustedPartners;