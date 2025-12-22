import React from "react";
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

const partners = [
  {
    name: "AWS",
    desc: "Scalable cloud infrastructure and AI tools",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Google Cloud",
    desc: "Advanced AI, ML, and cloud-native solutions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  },
  {
    name: "GitHub",
    desc: "World's largest open-source development platform",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "Otis AI",
    desc: "Cross-channel AI-powered ad optimization",
    logo: "https://cdn.worldvectorlogo.com/logos/otis-1.svg",
  },
  {
    name: "DataPattern US",
    desc: "Precision engineering and defense solutions",
    logo: "https://datapattern.ai/wp-content/uploads/2022/01/Data-Pattern-Logo-1.png",
  },
  {
    name: "The Hindu",
    desc: "One of India's leading national dailies",
    logo: "https://crystalpng.com/wp-content/uploads/2025/11/the_hindu_logo.png",
  },
  {
    name: "Keerthi Pumps",
    desc: "Industrial pump manufacturing experts",
    logo: "https://keerthipumps.com/wp-content/themes/keerthipumps/img/logoimg.png",
  },
  {
    name: "Farm2Bag",
    desc: "Farm-to-table organic produce distribution",
    logo: "https://farm2bag.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo%20with%20text%20png.32343519.png&w=3840&q=75",
  },
  {
    name: "Varam.app",
    desc: "A modern digital matrimonial platform",
    logo: "https://varam.app/logo.png",
  },
  {
    name: "Web3 Technologies",
    desc: "Blockchain, DeFi, and decentralized apps",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Blockchain_icon.svg",
  },
  {
    name: "DC Tech",
    desc: "End-to-end digital solutions provider",
    logo: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
  },
  {
    name: "Amazon",
    desc: "Global e-commerce & cloud leader",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
];

const TrustedPartners: React.FC = () => {
  return (
    <Section>
      <Header>
        <Title>Trusted Partners</Title>
        <Subtitle>
          We collaborate with innovative organizations across industries to
          deliver secure, scalable, and impactful solutions.
        </Subtitle>
      </Header>

      {/* 🔥 SINGLE CONTINUOUS SLIDER */}
      <CardsWrapper>
        <CardsGrid>
          {[...partners, ...partners].map((item, index) => (
            <PartnerCard key={`${item.name}-${index}`}>
              <LogoWrapper>
                <PartnerLogo src={item.logo} alt={item.name} />
              </LogoWrapper>
              <PartnerName>{item.name}</PartnerName>
              <PartnerDesc>{item.desc}</PartnerDesc>
            </PartnerCard>
          ))}
        </CardsGrid>
      </CardsWrapper>
    </Section>
  );
};

export default TrustedPartners;
