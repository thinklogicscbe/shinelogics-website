import React from "react";
import {
  MetricsContainer,
  MetricsContent,
  MetricHighlight,
  Description,
  CTAButton,
} from "./style";

const SuccessMetrics: React.FC = () => {
  return (
    <MetricsContainer>
      <MetricsContent>
        <MetricHighlight>
          96% of clients report <span>40% faster threat detection</span>
        </MetricHighlight>

        <Description>
          with our AI security solutions. Join <strong>50+ businesses</strong>{" "}
          who’ve significantly reduced breach risks and strengthened their
          security posture.
        </Description>

        {/* <CTAButton>See Case Studies</CTAButton> */}
      </MetricsContent>
    </MetricsContainer>
  );
};

export default SuccessMetrics;
