import React from 'react';
import { BannerContainer } from "./style";


const productheading = [

  {
    id: 1,
    title: "ERP",
    altText: "",
    bannerimage: "/erp-banner.jpg",
    description: "Our Enterprise Resource Planning (ERP) solution is designed to seamlessly integrate and optimize your business operations, ensuring efficiency and productivity across departments. It centralizes critical functions such as finance, HR, inventory, procurement, sales, and customer relationship management (CRM) into a unified platform. With real-time data access and automation, decision-making becomes faster and more accurate, reducing manual efforts and operational costs.",
    reverseOrder: false,
    isHeading: true, // Flag to identify the heading
  },


]






const ERP: React.FC = () => {
  return (
    <BannerContainer>
      {productheading.map((product) =>
        product.isHeading ? (
          <div key={`heading-${product.id}`} className="heading-container">
            <div
              className="heading-banner"
              style={{ backgroundImage: `url(${product.bannerimage})` }}
            >
              <div className="heading-content">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ) : null
      )}

<div className="features-container erp-layout">
  <div className="erp-header">
    <h2>Intelligent, Secure Enterprise Resource Planning</h2>
    <p>
      Shine ERP is a modern ERP platform designed to unify and optimize core
      business operations while maintaining strong security and data integrity.
    </p>
  </div>

  <div className="erp-sections">
    {/* WHAT IT DOES */}
    <div className="erp-section">
      <h3>What It Does</h3>
      <ul>
        <li>Centralized inventory management</li>
        <li>Customer needs and demand tracking</li>
        <li>Accounting and financial operations</li>
        <li>Real-time operational visibility</li>
        <li>Secure data storage in one platform</li>
      </ul>
    </div>

    {/* POWERED BY */}
    <div className="erp-section">
      <h3>Powered by Our Expertise</h3>
      <ul>
        <li>AI-driven forecasting for inventory and demand</li>
        <li>Built-in analytics for operational and financial insights</li>
        <li>Secure-by-design architecture for data protection</li>
        <li>
          Seamless integration with POS, E-commerce, IoT, and analytics
          platforms
        </li>
      </ul>
    </div>

    {/* BUSINESS VALUE */}
    <div className="erp-section">
      <h3>Business Value</h3>
      <ul className="check-list">
        <li>Reduced operational inefficiencies</li>
        <li>Faster, data-driven decisions</li>
        <li>Scalable and future-ready ERP foundation</li>
      </ul>
    </div>
  </div>
</div>

    </BannerContainer>
  );
};

export default ERP;