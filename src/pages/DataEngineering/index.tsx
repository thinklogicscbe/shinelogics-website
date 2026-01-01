import React from "react";
import {
  BannerContainer,
  CoreFeaturesContainer,
  BenefitsContainer,
} from "./style";

const productHeading = [
  {
    id: 1,
    title: "Data Engineering",
    description:
      "Our Data Engineering solutions help organizations build scalable, reliable, and high-performance data platforms. We design end-to-end data pipelines that collect, process, transform, and deliver data in real time or batch mode. With cloud-ready architecture, automation, and strong governance, businesses can unlock accurate insights, support analytics, and power AI-driven decision-making while ensuring data quality, security, and performance.",
    bannerimage: "/data-image.jpg",
    isHeading: true,
  },
];

const dataEngineeringModules = [
  {
    title: "Data Ingestion & Integration",
    image: "/data-integration.png",
    points: [
      "Collect data from databases, APIs, IoT devices, and files",
      "Support batch and real-time ingestion pipelines",
      "Integrate structured, semi-structured, and unstructured data",
      "Ensure fault-tolerant and scalable ingestion",
      "Enable seamless system connectivity",
    ],
  },
  {
    title: "Data Transformation & Processing",
    image: "/data-transformation.png",
    points: [
      "Clean, validate, and standardize raw data",
      "Build ETL / ELT workflows",
      "Automate data processing pipelines",
      "Improve data accuracy and consistency",
      "Optimize large-scale data processing",
    ],
  },
  {
    title: "Data Warehousing & Data Lakes",
    image: "/data-lake.png",
    points: [
      "Design modern data warehouses and data lakes",
      "Enable fast analytics and querying",
      "Support cloud and hybrid storage",
      "Optimize storage cost and performance",
      "Ensure high availability and reliability",
    ],
  },
  {
    title: "Real-Time Data Streaming",
    image: "/data-streaming.png",
    points: [
      "Process streaming data with low latency",
      "Enable real-time dashboards and alerts",
      "Support event-driven architectures",
      "Monitor live business operations",
      "Reduce decision-making delays",
    ],
  },
  {
    title: "Data Quality & Governance",
    image: "/data-quality.png",
    points: [
      "Implement data validation and quality checks",
      "Maintain data lineage and traceability",
      "Enforce security and access control",
      "Ensure compliance with data regulations",
      "Improve trust in enterprise data",
    ],
  },
  {
    title: "Analytics & BI Enablement",
    image: "/analytics.png",
    points: [
      "Prepare data for reporting and BI tools",
      "Enable self-service analytics",
      "Support AI & machine learning use cases",
      "Deliver actionable business insights",
      "Improve data-driven decision-making",
    ],
  },
];

const whyChooseDataEngineering = [
  "Scalable cloud-ready data architectures",
  "Support for real-time and batch processing",
  "Strong focus on data quality and governance",
  "Optimized performance and cost efficiency",
  "Future-ready analytics and AI enablement",
];

const DataEngineering: React.FC = () => {
  return (
    <BannerContainer>
      {/* ===== Banner ===== */}
      {productHeading.map((item) => (
        <div key={item.id} className="heading-container">
          <div
            className="heading-banner"
            style={{ backgroundImage: `url(${item.bannerimage})` }}
          >
            <div className="heading-content">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* ===== Core Features ===== */}
{/* ===== Core Features ===== */}
<CoreFeaturesContainer>
  <div className="core-features-container">
    <div className="core-features-grid">
      {dataEngineeringModules.map((module, index) => (
        <div key={index} className="core-feature-item">
          <img
            src={module.image}
            alt={module.title}
          />
          <strong>{module.title}</strong>
          <ul>
            {module.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</CoreFeaturesContainer>


      {/* ===== Benefits ===== */}
      <BenefitsContainer>
        <div className="why-choose-container">
          <h2>Why Choose Our Data Engineering Solutions?</h2>
          <ul>
            {whyChooseDataEngineering.map((item, index) => (
              <li key={index} className="why-choose-item">
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
      </BenefitsContainer>
    </BannerContainer>
  );
};

export default DataEngineering;
