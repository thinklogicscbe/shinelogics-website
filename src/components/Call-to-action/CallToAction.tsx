import React from "react";
import {
  CTAWrapper,
  CTABox,
  TextBlock,
  Title,
  Description,
  ButtonBlock,
  CTAButton,
} from "./styles";

const CallToAction: React.FC = () => {
  return (
    <CTAWrapper>
      <CTABox>
        <TextBlock>
          <Title>
            Build Secure & Intelligent Digital Solutions with Confidence
          </Title>

          <Description>
            Start your project with a team that delivers quality, speed, and
            security.
          </Description>
        </TextBlock>

        <ButtonBlock>
          <CTAButton>Start a Project</CTAButton>
        </ButtonBlock>
      </CTABox>
    </CTAWrapper>
  );
};

export default CallToAction;
