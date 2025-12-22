// import React from 'react';
import { ServiceContainer, ServiceCard, Title } from "./style";
import { Link } from "react-router-dom";

const OurService = () => {
  return (
    <ServiceContainer>
      <Title>Our Core Services</Title>

      <div className="services-grid">

        <ServiceCard>
          <div className="icon">🛡️</div>
          <h3>Secure Software Development</h3>
          <p>
            Custom web & mobile applications built using a secure SDLC,
            modern architectures, and best engineering practices.
          </p>
        </ServiceCard>

        <ServiceCard>
          <div className="icon">🔐</div>
          <h3>Application Security Testing</h3>
          <p>
            SAST, DAST, API, and mobile security testing to ensure compliance,
            resilience, and zero critical vulnerabilities.
          </p>
        </ServiceCard>

        <ServiceCard>
          <div className="icon">🤖</div>
          <h3>AI / ML Integration</h3>
          <p>
            Intelligent automation, predictive analytics, and LLM-powered
            solutions tailored for real-world business use cases.
          </p>
        </ServiceCard>

        <ServiceCard>
          <div className="icon">📡</div>
          <h3>IoT & Embedded Systems</h3>
          <p>
            Smart devices, firmware development, and industrial automation
            engineered for performance and reliability.
          </p>
        </ServiceCard>

        <ServiceCard>
          <div className="icon">📊</div>
          <h3>Data Engineering & Analytics</h3>
          <p>
            Scalable data pipelines, ETL processes, dashboards, and analytics
            delivering actionable business insights.
          </p>
        </ServiceCard>

        <ServiceCard>
          <div className="icon">👨‍💻</div>
          <h3>Staff Augmentation</h3>
          <p>
            On-demand developers, AppSec engineers, data experts, and AI
            specialists to scale your team efficiently.
          </p>
        </ServiceCard>

      </div>

      {/* CTA Button */}
      <div className="services-cta">
        <Link to="/services">
          <button>Explore All Services</button>
        </Link>
      </div>

    </ServiceContainer>
  );
};

export default OurService;
