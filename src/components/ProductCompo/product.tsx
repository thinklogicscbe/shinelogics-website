import React, { useEffect } from 'react';
import { SectionContainer, DivisionContainer, MainContainer } from './style';




const productheading = [

  {
    id: 1,
    title: "ERP",
    altText: "",
    bannerimage: "/erp-banner.jpg",
    description: "Our comprehensive Enterprise Resource Planning (ERP) solution is designed to streamline and integrate your business processes, enhancing efficiency and decision-making across your organization. Key features include:",
    reverseOrder: false,
    isHeading: true, // Flag to identify the heading
  },


]

const productData = [


  {
    id: 2,
    title: "Financial & Accounting",
    image: "/financial-accounting(1).png",
    altText: "ERP",
    description: "Gain real-time insights into your financial operations with robust tools for accounting, budgeting, and financial reporting.",
    reverseOrder: false,
  },
  {
    id: 3,
    title: "Supply Chain Management",
    image: "/Supply Chain Management(1).png",
    altText: "ERP",
    description: "Optimize your supply chain with modules for procurement, inventory management, and logistics, ensuring timely delivery and cost efficiency.",
    reverseOrder: true,
  },
  {
    id: 4,
    title: "Enterprise Asset Management",
    image: "/asset-management.png",
    altText: "ERP",
    description: "Manage your workforce effectively with integrated HR and payroll functionalities, from recruitment to retirement.",
    reverseOrder: false,
  },
  {
    id: 5,
    title: "Project Management",
    image: "/project management.png",
    altText: "ERP",
    description: "Plan, execute, and monitor projects with precision, ensuring they are completed on time and within budget.",
    reverseOrder: true,
  },
  {
    id: 6,
    title: "Production and Manufacturing",
    image: "/Production and Manufacturing.png",
    altText: "ERP",
    description: "Enhance production efficiency with tools for production planning, scheduling, and quality control, tailored to various manufacturing processes.",
    reverseOrder: false,
  },
  {
    id: 7,
    title: "Quality Assurance",
    image: "/quality assurance.png",
    altText: "ERP",
    description: "Maintain high product standards with comprehensive quality management features, including inspections and compliance tracking.",
    reverseOrder: true,
  },
  {
    id: 8,
    title: "Procurement",
    image: "/Procurement.png",
    altText: "ERP",
    description: "Streamline your procurement processes, from purchase orders to vendor management, ensuring cost-effective sourcing.",
    reverseOrder: false,
  },
  {
    id: 9,
    title: "Inventory Management",
    image: "/Inventory Management.png",
    altText: "ERP",
    description: "Keep track of inventory levels in real-time, reducing carrying costs and preventing stockouts.",
    reverseOrder: true,
  },
  {
    id: 10,
    title: "Customer Relationship Management (CRM)",
    image: "/customer-relationship.png",
    altText: "ERP",
    description: "Build and maintain strong customer relationships with tools for sales, marketing, and customer service.",
    reverseOrder: false,
  },
  {
    id: 11,
    title: "Business Intelligence and Analytics",
    image: "/Business Intelligence and Analytics.png",
    altText: "ERP",
    description: "Make informed decisions with advanced analytics and reporting capabilities, providing actionable insights into your operations.",
    reverseOrder: true,
  },
  {
    id: 12,
    title: "Cloud-Based Accessibility",
    image: "/Cloud-Based Accessibility.png",
    altText: "ERP",
    description: "Access your ERP system anytime, anywhere, with our secure cloud-based platform, facilitating remote work and collaboration.",
    reverseOrder: false,
  },

  {
    id: 13,
    title: "Mobile Integration",
    image: "/Mobile Integration.png",
    altText: "ERP",
    description: "Stay connected on the go with mobile applications that provide real-time data and functionalities at your fingertips.",
    reverseOrder: true,
  },
  {
    id: 14,
    title: "Artificial Intelligence and Machine Learning",
    image: "/AI-ML.png",
    altText: "ERP",
    description: "Leverage AI and ML capabilities to automate routine tasks, predict trends, and gain a competitive edge",
    reverseOrder: false,
  },
  {
    id: 15,
    title: "Scalability",
    image: "/Scalability.png",
    altText: "ERP",
    description: "Our ERP solution grows with your business, offering scalable modules that can be customized to meet your evolving needs",
    reverseOrder: true,
  },
  {
    id: 16,
    title: "Integration Capabilities",
    image: "/Integration Capabilities.png",
    altText: "ERP",
    description: "Seamlessly integrate with existing systems and third-party applications, ensuring a unified and efficient IT ecosystem",
    reverseOrder: false,
  },

];


const emsData = [
  {
    id: 1,
    title: "Employee Management System (EMS)",
    description:
      "Our Employee Management System (EMS) is a comprehensive solution designed to automate and simplify HR processes, improve workforce efficiency, and enhance employee engagement. Whether you're a growing startup or an established enterprise, our EMS ensures seamless management of employees from recruitment to retirement.",
    bannerImage: "/ems-banner.jpg", // Example path for a banner image
  },
];

const Product: React.FC = () => {
  useEffect(() => {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
      (line as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });

    const handleScroll = () => {
      const rows = document.querySelectorAll('.row');
      rows.forEach((row) => {
        const rect = (row as HTMLElement).getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          row.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAnimatedText = (text: string) => {
    return text.split('. ').map((sentence, index) => (
      <span key={`sentence-${index}`} className="line">
        {sentence}.
      </span>
    ));
  };

  return (
    <>
      <MainContainer>
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
      </MainContainer>

      <SectionContainer>
        <DivisionContainer>
          {productData.map((item, index) => (
            <div key={`row-${item.id}-${index}`} className={`row row-${index + 1}`}>
              {item.reverseOrder ? (
                <>
                  <div>
                    <h2 className="content">{item.title}</h2>
                    <p>{getAnimatedText(item.description)}</p>
                  </div>
                  <div>
                    <img
                      className={`img${index % 2 === 0 ? '2' : '1'}`}
                      src={item.image}
                      alt={item.altText}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img
                      className={`img${index % 2 === 0 ? '1' : '2'}`}
                      src={item.image}
                      alt={item.altText}
                    />
                  </div>
                  <div>
                    <h2 className="content">{item.title}</h2>
                    <p>{getAnimatedText(item.description)}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          
        </DivisionContainer>
      </SectionContainer>

      <hr style={{ marginTop: '70px', marginLeft: '50px', marginRight: '50px' }} />

      <div style={{ textAlign: 'center', margin: '40px 0', marginTop: '70px' }}>
        <img
          src="/ERP-image.png"
          alt="Center Decorative"
          style={{
            maxWidth: '60%',
            height: 'auto',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            margin: '0 auto',
            display: 'block',
          }}
        />
      </div>
    </>

    
  );
};

export default Product;
