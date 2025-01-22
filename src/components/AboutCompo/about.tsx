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
          <img src='/img/apimage/aboutimg5.jpg' alt='about us'></img>
          </div>
          <div>
            <p>
              {getAnimatedText(
                "At Shinelogics, we pride ourselves on being a pioneering Product Development as a Service (PDaaS) company. Our primary goal is to empower businesses by delivering innovative solutions tailored to address the unique challenges that arise in a rapidly evolving technological landscape. In an age where digital transformation is crucial to staying competitive, we offer comprehensive strategies that help businesses scale effectively and efficiently. By leveraging cutting-edge technology, we assist our clients in navigating complex challenges and capturing new opportunities."
              )}
              </p>
          </div>
        </div>  

        <div className="row row-2">
          <div>
             <img src='/img/apimage/aboutimg6.jpg' alt='about us'></img>
          </div>
          <div>
            <p>
              {getAnimatedText(
                "Our commitment to innovation and excellence is the cornerstone of everything we do. We understand that each business has its own set of needs, which is why we offer customized solutions that align with their specific goals. Whether it’s building a product from the ground up or enhancing an existing solution, we focus on delivering results that drive growth and foster long-term success. We believe that innovation is not just about new ideas, but also about bringing those ideas to life in a way that makes a real difference."
              )}
              </p>
          </div>
        </div>  

        <div className="row row-1">
          <div>
          <img src='/img/apimage/aboutimg3.jpg' alt='about us'></img>
          </div>
          <div>
            <p>
              {getAnimatedText(
                "At Shinelogics, we blend creativity with technology to design products that are not only functional but also forward-thinking. Our team of experts combines technical proficiency with a passion for design to create products that stand out in the marketplace. We work closely with our clients to understand their vision, ensuring that the final product is a seamless reflection of their business objectives. We believe that every product we create should help our clients stay ahead of the competition, giving them the tools they need to succeed in today’s fast-paced market."
              )}
              </p>
          </div>
        </div>  

        <div className="row row-2">
          <div>
          <img src='/img/apimage/aboutimg4.jpg' alt='about us'></img>
          </div>
          <div>
            <p>
              {getAnimatedText(
                "Above all, we are dedicated to fostering sustainable growth for our clients. We believe that technology should be an enabler of progress, not just a tool for solving immediate problems. Our solutions are designed with scalability in mind, ensuring that as our clients grow, their technology infrastructure grows with them. By partnering with businesses to create long-lasting, adaptable products, we help them maintain a competitive edge while ensuring that they can continue to evolve and thrive in the ever-changing digital world."
              )}
              </p>
          </div>
        </div>  

         
      </DivisionContainer>
    </SectionContainer>
  );
};

export default About;
