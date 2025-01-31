import React from "react";
import { Container, Heading, Section, Subheading, Text, List, ListItem } from "./style";

const ProductEngineering = () => {
  return (
    <Container>
      <Heading>Product Engineering</Heading>

      <Section>
        <Subheading>What is Product Engineering?</Subheading>
        <Text>
          Product engineering involves managing a product's entire life cycle, from idea to end-of-life,
          with engineers handling design, development, testing, and maintenance.
        </Text>
      </Section>

      <Section>
        <Subheading>Scope of Product Engineering Service</Subheading>
        <Text>
          Product engineering service is a consulting activity that combines hardware, software, embedded
          systems, and IT solutions to design and develop products, covering all phases from inception to
          end-of-life.
        </Text>
      </Section>

      <Section>
        <Subheading>Challenges in Keeping Up with New Technology</Subheading>
        <List>
          <ListItem>Risks of low returns, training costs, process changes, system upgrades, and downtime.</ListItem>
          <ListItem>Concerns about upsetting clients/end users who prefer current processes.</ListItem>
          <ListItem>Risks in choosing the right partner/vendor for custom application development.</ListItem>
        </List>
        <Text>
          Despite these challenges, product engineering service providers should offer strong support and
          careful planning. Ensuring clear ROI and maintaining open communication can help smooth the
          transformation process.
        </Text>
      </Section>

      <Section>
        <Subheading>Value of Product Engineering Services</Subheading>
        <Text>
          Enterprises are moving from traditional waterfall methods to agile and lean approaches to speed up
          development, improve transparency, and focus more on customer needs.
        </Text>
      </Section>

      <Section>
        <Subheading>Modern Product Engineering</Subheading>
        <Text>
          Product engineering involves providing technical support for hardware, software, embedded systems,
          and IT infrastructure. It covers all stages of the software development lifecycle (SDLC), including
          innovation, design, development, testing, integration, and deployment. This shift has moved software
          engineering from rigid processes to more agile and responsive methods driven by client needs.
        </Text>
      </Section>

      <Section>
        <Subheading>Product Engineering Process</Subheading>
        <List>
          <ListItem>Product Ideation</ListItem>
          <ListItem>Product Business Flow and Domain Understanding</ListItem>
          <ListItem>Product Business Architecture</ListItem>
          <ListItem>Product Tech Architecture</ListItem>
        </List>
      </Section>
    </Container>
  );
};

export default ProductEngineering;
