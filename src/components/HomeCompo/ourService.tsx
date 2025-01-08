import React from 'react';
import { ServiceContainer, ServiceCard, Title } from './style';

const OurService = () => {
  return (
    <ServiceContainer>
      <Title>Custom IT Solutions for Your Successful Business</Title>
      <div className="services-grid">
        <ServiceCard>
          <div className="icon">🔒</div>
          <h3>Cyber Security</h3>
          <p>Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📊</div>
          <h3>Data Analytics</h3>
          <p>Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">💻</div>
          <h3>Web Development</h3>
          <p>Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📱</div>
          <h3>Apps Development</h3>
          <p>Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">🔍</div>
          <h3>SEO Optimization</h3>
          <p>Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed</p>
        </ServiceCard>
        <ServiceCard>
          <div className="icon">📞</div> {/* Added a phone icon */}
          <h3>Call Us For Quote</h3>
          <p>Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor est magna stet eirmod</p>
          <p>+91 8508601842</p>
        </ServiceCard>
      </div>
    </ServiceContainer>
  );
};

export default OurService;
