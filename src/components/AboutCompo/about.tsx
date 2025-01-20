import React, { useEffect } from 'react';
import { SectionContainer, DivisionContainer, Video } from './style';
import about from '../../assets/about-image/Employees_having_business_meeting.mp4_1736422910838.mp4';

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
            <Video src={about} autoPlay loop muted playsInline />
          </div>
          <div>
            <p>
              {getAnimatedText(
                "At Shinelogics, we pride ourselves on being a pioneering Product Development as a Service (PDaaS) company. With a strong commitment to innovation and excellence, we specialize in delivering cutting-edge solutions that combine the power of technology and creativity to transform businesses."
              )}
            </p>
          </div>
        </div>
      </DivisionContainer>
    </SectionContainer>
  );
};

export default About;
