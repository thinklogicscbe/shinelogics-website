import {
  IndustriesSection,
  IndustriesHeader,
  IndustriesGrid,
  IndustryCard,
  TitleSmall,
  Description,
} from "./styles";

const Industries = () => {
  return (
    <IndustriesSection>
      <IndustriesHeader>
        <TitleSmall>Industries We Serve</TitleSmall>
        <Description>Industry-focused secure solutions</Description>
      </IndustriesHeader>

      <IndustriesGrid>
        <IndustryCard><h4>FinTech</h4></IndustryCard>
        <IndustryCard><h4>HealthTech</h4></IndustryCard>
        <IndustryCard><h4>E-Commerce</h4></IndustryCard>
        <IndustryCard><h4>Manufacturing</h4></IndustryCard>
        <IndustryCard><h4>EdTech</h4></IndustryCard>
        <IndustryCard><h4>Logistics</h4></IndustryCard>
        <IndustryCard><h4>SaaS</h4></IndustryCard>
        <IndustryCard><h4>Retail</h4></IndustryCard>
      </IndustriesGrid>
    </IndustriesSection>
  );
};

export default Industries;
