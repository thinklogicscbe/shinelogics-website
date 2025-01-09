import React, { useEffect } from 'react';
import { SectionContainer, DivisionContainer } from './style';
import about1 from "../../assets/about-image/about.png";

const About: React.FC = () => {
  useEffect(() => {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
      (line as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  const getAnimatedText = (text: string) => {
    return text.split('. ').map((sentence, index) => (
      <span key={index} className="line">
        {sentence}.
      </span>
    ));
  };

  return (
    <SectionContainer>
      <DivisionContainer>
        {/* Row 1 */}
        <div className="row row-1">
          <div>
            <img src={about1} alt="ERP" />
          </div>
          <div>
            <p>{getAnimatedText("At Shinelogics, we pride ourselves on being a pioneering Product Development as a Service (PDaaS) company. With a strong commitment to innovation and excellence, we specialize in delivering cutting-edge solutions that combine the power of technology and creativity to transform businesses.")}</p>
          </div>
        </div>
      </DivisionContainer>
    </SectionContainer>
  );
};

export default About;
