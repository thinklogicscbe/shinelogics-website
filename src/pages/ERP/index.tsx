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

const productData = [

  {
    "id": 2,
    "title": "Financial & Accounting",
    "image": "/financial-accounting(1).png",
    "altText": "ERP",
    "description": [
      "Gain real-time insights into financial operations.",
      "Automate invoicing, payroll, and tax tasks.",
      "Track revenue, expenses, and cash flow.",
      "Seamlessly integrate with other systems.",
      "Provide detailed reports for better decision-making."
    ],
    "reverseOrder": false
  },
  {
    "id": 3,
    "title": "Supply Chain Management",
    "image": "/Supply Chain Management(1).png",
    "altText": "ERP",
    "description": [
      "Optimize procurement and inventory management.",
      "Enable precise demand forecasting.",
      "Track deliveries and improve last-mile efficiency.",
      "Identify and resolve supply chain bottlenecks.",
      "Enhance collaboration with suppliers."
    ],
    "reverseOrder": true
  },
  {
    "id": 4,
    "title": "Enterprise Asset Management",
    "image": "/asset-management.png",
    "altText": "ERP",
    "description": [
      "Manage workforce through integrated HR and payroll.",
      "Streamline hiring, onboarding, and payroll processes.",
      "Track employee performance and career development.",
      "Optimize workforce productivity.",
      "Enhance employee engagement and retention."
    ],
    "reverseOrder": false
  },
  {
    "id": 5,
    "title": "Project Management",
    "image": "/project management.png",
    "altText": "ERP",
    "description": [
      "Plan, execute, and monitor projects with precision.",
      "Streamline task allocation and resource management.",
      "Track project timelines and milestones.",
      "Assess risks and manage project budgets.",
      "Ensure timely project completion within budget."
    ],
    "reverseOrder": true
  },
  {
    "id": 6,
    "title": "Production and Manufacturing",
    "image": "/Production and Manufacturing.png",
    "altText": "ERP",
    "description": [
      "Plan and schedule production efficiently.",
      "Optimize resource allocation and reduce waste.",
      "Ensure consistent product quality.",
      "Adapt to market demands with agility.",
      "Integrate workflows for improved efficiency."
    ],
    "reverseOrder": false
  },
  {
    "id": 7,
    "title": "Quality Assurance",
    "image": "/quality assurance.png",
    "altText": "ERP",
    "description": [
      "Maintain high product standards.",
      "Perform inspections and compliance tracking.",
      "Identify defects early to reduce rework.",
      "Ensure adherence to industry regulations.",
      "Improve operational efficiency and product quality."
    ],
    "reverseOrder": true
  },
  {
    "id": 8,
    "title": "Procurement",
    "image": "/Procurement.png",
    "altText": "ERP",
    "description": [
      "Manage purchase orders and vendor relationships.",
      "Automate procurement workflows.",
      "Gain real-time insights into supplier performance.",
      "Ensure timely order placements.",
      "Control costs and maintain supply reliability."
    ],
    "reverseOrder": false
  },
  {
    "id": 9,
    "title": "Inventory Management",
    "image": "/Inventory Management.png",
    "altText": "ERP",
    "description": [
      "Track stock levels in real-time.",
      "Minimize waste and prevent stockouts.",
      "Enhance order fulfillment accuracy.",
      "Improve demand planning for better inventory control.",
      "Streamline supply chain operations."
    ],
    "reverseOrder": true
  },
  {
    "id": 10,
    "title": "Customer Relationship Management (CRM)",
    "image": "/customer-relationship.png",
    "altText": "ERP",
    "description": [
      "Centralize customer data and interactions.",
      "Create targeted marketing campaigns.",
      "Track leads and customer journeys.",
      "Deliver exceptional customer service.",
      "Gain insights to optimize customer experience."
    ],
    "reverseOrder": false
  },
  {
    "id": 11,
    "title": "Business Intelligence and Analytics",
    "image": "/Business Intelligence and Analytics.png",
    "altText": "ERP",
    "description": [
      "Analyze data to make informed decisions.",
      "Uncover trends and identify optimization opportunities.",
      "Generate real-time reports for proactive action.",
      "Assess business performance and forecast trends.",
      "Improve operations using data-driven insights."
    ],
    "reverseOrder": true
  },
  {
    "id": 12,
    "title": "Cloud-Based Accessibility",
    "image": "/Cloud-Based Accessibility.png",
    "altText": "ERP",
    "description": [
      "Access ERP systems securely from anywhere.",
      "Eliminate on-premises infrastructure costs.",
      "Enhance scalability, security, and uptime.",
      "Support remote work and improve communication.",
      "Ensure consistent access across locations."
    ],
    "reverseOrder": false
  },
  {
    "id": 13,
    "title": "Mobile Integration",
    "image": "/Mobile Integration.png",
    "altText": "ERP",
    "description": [
      "Access ERP functionalities on mobile devices.",
      "Enable real-time data access anytime, anywhere.",
      "Improve communication and collaboration.",
      "Empower employees to stay aligned with goals.",
      "Boost responsiveness and productivity."
    ],
    "reverseOrder": true
  },
  {
    "id": 14,
    "title": "Artificial Intelligence and Machine Learning",
    "image": "/AI-ML.png",
    "altText": "ERP",
    "description": [
      "Integrate AI and ML for intelligent automation.",
      "Predict trends and optimize processes.",
      "Automate repetitive tasks and improve efficiency.",
      "Enhance forecasting and decision-making.",
      "Personalize customer experiences to drive innovation."
    ],
    "reverseOrder": false
  },
  {
    "id": 15,
    "title": "Scalability",
    "image": "/Scalability.png",
    "altText": "ERP",
    "description": [
      "Support business growth with flexible modules.",
      "Avoid costly system overhauls as you expand.",
      "Adapt systems to meet operational needs.",
      "Increase efficiency as the business grows.",
      "Ensure long-term business sustainability."
    ],
    "reverseOrder": true
  },
  {
    "id": 16,
    "title": "Integration Capabilities",
    "image": "/Integration Capabilities.png",
    "altText": "ERP",
    "description": [
      "Connect seamlessly with existing systems.",
      "Eliminate data silos across departments.",
      "Improve workflow efficiency through integration.",
      "Maintain a unified IT ecosystem.",
      "Optimize operational efficiency across platforms."
    ],
    "reverseOrder": false
  }
];


// const emsData = [
//   {
//     id: 1,
//     title: "Employee Management System (EMS)",
//     description:
//       "Our Employee Management System (EMS) is a comprehensive solution designed to automate and simplify HR processes, improve workforce efficiency, and enhance employee engagement. Whether you're a growing startup or an established enterprise, our EMS ensures seamless management of employees from recruitment to retirement.",
//     bannerImage: "/ems-banner.jpg", // Example path for a banner image
//   },
// ];

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

      <div className="features-container">
        {productData.map((product, index) => (
          <div
            key={product.id}
            className={`feature-item ${product.reverseOrder ? 'reverse-order' : ''}`}
          >
            <div className="feature-image">
              <img src={product.image} alt={product.altText} className="feature-img" />
            </div>
            <div className="feature-details">
              <h3>{product.title}</h3>
              <ul>
                {product.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </BannerContainer>
  );
};

export default ERP;