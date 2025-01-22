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
                "At Shinelogics, we pride ourselves on being a pioneering Product Development as a Service (PDaaS) company. Our mission is to empower businesses by providing innovative solutions tailored to meet the unique challenges of a rapidly evolving technological landscape. With an unwavering commitment to innovation and excellence, we strive to deliver products that seamlessly blend creativity and advanced technology, enabling our clients to stay ahead of the competition and achieve sustainable growth."
              )}
              </p>
              <br></br>
              <br></br>
              <p>
              {getAnimatedText(
                "Our approach is built on a deep understanding of our clients' needs, enabling us to craft solutions that drive tangible results. By leveraging the latest advancements in technology and combining them with a user-centered design philosophy, we create products that not only meet but exceed expectations. From ideation and prototyping to full-scale deployment, we ensure that every step of the product development process is guided by precision, innovation, and a focus on delivering real value to our clients."
              )}
              </p>

              <br></br>
              <br></br>
              <p>
              {getAnimatedText(
                " At Shinelogics, collaboration and adaptability form the foundation of our success. We understand that each client is unique, and their challenges demand tailored solutions. Our team of dedicated professionals works closely with businesses of all sizes to co-create solutions that align with their specific needs and aspirations. By fostering a culture of transparency, trust, and partnership, we enable businesses to confidently navigate their product development journey with our guidance."
              )}
              </p>

               
           
          </div>
        </div>  

         
      </DivisionContainer>
    </SectionContainer>
  );
};

export default About;
