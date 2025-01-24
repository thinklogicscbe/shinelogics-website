import React from 'react';
import { ServiceContainer, ServiceCard, Title } from './style';

const OurService = () => {
  return (
    <ServiceContainer>
      <Title>Custom IT Solutions for Your Successful Business</Title>
      <div className="services-grid">

        <ServiceCard>
          <div className="icon">💻</div>
          <h3>Web Development</h3>
          <p>Empowers businesses with cutting-edge web development solutions, blending innovative design and robust functionality to build seamless, user-friendly websites.</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📱</div>
          <h3>Apps Development</h3>
          <p>ShineLogics.ai specializes in app development, delivering high-performance, user-centric mobile and web applications tailored to meet diverse business needs with precision and innovation.</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">🔒</div>
          <h3>Cyber Security</h3>
          <p>Ensures robust cyber security solutions, safeguarding your business with advanced threat detection, data protection, and proactive risk management strategies.</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📊</div>
          <h3>Data Analytics</h3>
          <p>Transforms raw data into actionable insights with advanced data analytics solutions, empowering businesses to make informed decisions and drive growth.</p>
        </ServiceCard>


        <ServiceCard>
          <div className="icon">🔍</div>
          <h3>SEO Optimization</h3>
          <p>Enhances your online presence with expert SEO optimization, boosting website visibility, driving traffic, and improving search engine rankings for sustainable growth.</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📞</div> {/* Added a phone icon */}
          <h3>Call Us For Quote</h3>
          <p>Feel free to ask us.</p>
          <p>info@shinelogics.com  |  +91-9500037221</p>
        </ServiceCard>
      </div>
    </ServiceContainer>
  );
};

export default OurService;
