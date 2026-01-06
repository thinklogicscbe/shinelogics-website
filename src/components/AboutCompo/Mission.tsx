import { Section, Grid, Card, CardTitle, CardText } from "./styles";

const Mission = () => {
  return (
    <Section>
      <Grid>
        <Card>
          <CardTitle>Our Mission</CardTitle>
          <CardText>
            Empower businesses with secure, intelligent technology that
            accelerates growth and delivers measurable impact.
          </CardText>
        </Card>

        <Card>
          <CardTitle>Our Vision</CardTitle>
          <CardText>
            To be a global leader in secure digital transformation where
            innovation and security coexist seamlessly.
          </CardText>
        </Card>
      </Grid>
    </Section>
  );
};

export default Mission;
