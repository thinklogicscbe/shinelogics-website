import React from "react";
import { BannerContainer, FeaturesContainer } from "./style"; // Adjust the path as needed

const productheading = [
  {
    id: 1,
    title: "E-commerce",
    description:
      "Our E-Commerce Platform is a powerful and comprehensive solution designed to help businesses of all sizes build dynamic, high-performance online stores with ease. Equipped with user-friendly tools, our platform enables you to effortlessly create and manage an engaging shopping experience that drives sales and enhances customer satisfaction. Whether you're launching a new brand or expanding your online presence, our platform offers flexible features tailored to meet your specific business needs.",
    bannerimage: "/ecommerce-banner.jpg", // Make sure this image exists in the public directory
    isHeading: true,
  },
];




const ECOMMERCE: React.FC = () => {
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

      <FeaturesContainer>
        <div className="commerce-header">
          <h2 className="commerce-title">
            Unified Omnichannel Commerce Engine
          </h2>

          <p className="commerce-intro">
            Shine E-commerce & POS connects online stores, physical outlets,
            inventory, and customers into a single, real-time system.
          </p>
        </div>

        <div className="commerce-sections">
          {/* WHAT IT DOES */}
          <div className="commerce-section">
            <h3 className="commerce-section-title">What It Does</h3>
            <ul className="commerce-list">
              <li>Online and in-store sales management</li>
              <li>Inventory synchronization</li>
              <li>Customer and loyalty management</li>
              <li>Secure payment processing</li>
              <li>Sales and revenue analytics</li>
            </ul>
          </div>

          {/* POWERED BY */}
          <div className="commerce-section">
            <h3 className="commerce-section-title">Powered by Our Expertise</h3>
            <ul className="commerce-list">
              <li>Real-time data engineering for zero inventory mismatch</li>
              <li>ML-based fraud detection</li>
              <li>Secure payment and transaction flows</li>
              <li>Advanced analytics dashboards</li>
            </ul>
          </div>

          {/* BUSINESS VALUE */}
          <div className="commerce-section">
            <h3 className="commerce-section-title">Business Value</h3>
            <ul className="commerce-list commerce-checklist">
              <li>One source of truth across channels</li>
              <li>Improved customer experience</li>
              <li>Optimized inventory and revenue</li>
            </ul>
          </div>
        </div>
      </FeaturesContainer>

      {/* 
            <BenefitsContainer>
                <div className="why-choose-container">
                    <h2>Why Choose Our E-COMMERCE?</h2>
                    <ul>
                        {whyChooseECOMMERCE.map((item, index) => (
                            <li key={index} className="why-choose-item">
                                ✅ {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </BenefitsContainer> */}
    </BannerContainer>
  );
};

export default ECOMMERCE;
