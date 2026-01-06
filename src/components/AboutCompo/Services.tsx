import {
  ServicesSection,
  ServicesHeader,
  ServicesGrid,
  ServiceCard,
  TitleSmall,
  Description,
} from "./styles";

const Services = () => {
  return (
    <ServicesSection>
      <ServicesHeader>
        <TitleSmall>What We Do</TitleSmall>
        <Description>
          Secure, scalable, intelligent solutions.
        </Description>
      </ServicesHeader>

      <ServicesGrid>
        <ServiceCard><h4>Software Development</h4><p>Web & mobile apps</p></ServiceCard>
        <ServiceCard><h4>Application Security</h4><p>Secure-by-design</p></ServiceCard>
        <ServiceCard><h4>AI & ML</h4><p>Automation & analytics</p></ServiceCard>
        <ServiceCard><h4>IoT Engineering</h4><p>Smart systems</p></ServiceCard>
        <ServiceCard><h4>Data Platforms</h4><p>Analytics at scale</p></ServiceCard>
        <ServiceCard><h4>Cloud & DevOps</h4><p>CI/CD & infra</p></ServiceCard>
      </ServicesGrid>
    </ServicesSection>
  );
};

export default Services;
