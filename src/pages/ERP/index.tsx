import React, { useEffect } from 'react';
import { SectionContainer, DivisionContainer, MainContainer } from './style';




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
    id: 2,
    title: "Financial & Accounting",
    image: "/financial-accounting(1).png",
    altText: "ERP",
    description: "Gain real-time insights into your financial operations with advanced tools for accounting, budgeting, and financial reporting that streamline processes and enhance decision-making. These tools empower businesses to automate tasks like invoicing and payroll, ensuring accurate, compliant financial management while reducing manual errors. With features like real-time tracking of transactions, scenario-based budgeting, and customizable dashboards, they provide a comprehensive view of financial health. Moreover, robust reporting capabilities offer detailed insights into revenue, expenses, and cash flow, enabling timely decisions that drive growth and efficiency. By integrating seamlessly with other systems, these tools deliver actionable insights to optimize resources, control costs, and achieve strategic objectives.",
    reverseOrder: false,
  },
  {
    id: 3,
    title: "Supply Chain Management",
    image: "/Supply Chain Management(1).png",
    altText: "ERP",
    description: "Optimize your supply chain with powerful modules for procurement, inventory management, and logistics, designed to streamline operations, reduce costs, and enhance efficiency. These modules enable precise demand forecasting, efficient procurement planning, and real-time inventory tracking, ensuring optimal stock levels and preventing overstocking or shortages. With advanced logistics tools, you can manage shipping, track deliveries, and enhance last-mile efficiency to ensure timely delivery. By integrating end-to-end visibility and analytics, these solutions empower businesses to identify bottlenecks, minimize delays, and improve supplier collaboration, ultimately achieving a seamless, cost-effective, and reliable supply chain..",
    reverseOrder: true,
  },
  {
    id: 4,
    title: "Enterprise Asset Management",
    image: "/asset-management.png",
    altText: "ERP",
    description: "Enterprise Asset Management empowers organizations to manage their workforce seamlessly through integrated HR and payroll functionalities, covering every stage from recruitment to retirement. With tools designed to streamline hiring processes, onboard new employees efficiently, and manage ongoing payroll operations with accuracy, this solution ensures compliance and reduces administrative burden. It also enables effective performance tracking, career development planning, and benefits management, creating a comprehensive framework for workforce optimization. By leveraging these capabilities, businesses can foster employee engagement, enhance productivity, and maintain a robust and well-managed human resource infrastructure.",
    reverseOrder: false,
  },
  {
    id: 5,
    title: "Project Management",
    image: "/project management.png",
    altText: "ERP",
    description: "project Management provides the tools and strategies needed to plan, execute, and monitor projects with precision, ensuring timely completion within budget constraints. By streamlining task allocation, resource management, and timeline tracking, it enables teams to maintain focus and adapt to challenges effectively. With features like real-time progress monitoring, risk assessment, and budget control, this solution empowers organizations to achieve project objectives while optimizing resource utilization and minimizing delays. The result is a more efficient workflow, improved team collaboration, and successful delivery of projects aligned with organizational goals.",
    reverseOrder: true,
  },
  {
    id: 6,
    title: "Production and Manufacturing",
    image: "/Production and Manufacturing.png",
    altText: "ERP",
    description: "Production and Manufacturing solutions empower organizations to enhance efficiency across all stages of the production lifecycle. With advanced tools for production planning, scheduling, and quality control, these systems are tailored to meet the unique demands of various manufacturing processes. By streamlining operations, optimizing resource allocation, and maintaining strict quality standards, they help reduce waste, minimize downtime, and ensure consistent product output. The result is a seamless integration of workflows, improved cost efficiency, and the ability to adapt quickly to market demands, enabling manufacturers to maintain a competitive edge in the industry.",
    reverseOrder: false,
  },
  {
    id: 7,
    title: "Quality Assurance",
    image: "/quality assurance.png",
    altText: "ERP",
    description: "Quality Assurance systems ensure that high product standards are consistently maintained through robust quality management features. By incorporating tools for thorough inspections, compliance tracking, and continuous monitoring, these solutions help organizations identify and address defects early in the process. This proactive approach not only safeguards product reliability but also ensures adherence to industry regulations and customer expectations. With streamlined workflows for quality checks and real-time reporting, businesses can enhance operational efficiency, reduce rework costs, and build trust with stakeholders by delivering superior and compliant products.",
    reverseOrder: true,
  },
  {
    id: 8,
    title: "Procurement",
    image: "/Procurement.png",
    altText: "ERP",
    description: "Procurement processes are streamlined with integrated tools that manage everything from purchase orders to vendor relationships, enabling cost-effective sourcing and efficient operations. By automating procurement workflows and providing real-time insights, businesses can ensure timely order placements, monitor supplier performance, and maintain optimal inventory levels. Vendor management features foster strong partnerships by facilitating transparent communication and tracking compliance with agreements. With these capabilities, organizations can reduce procurement cycle times, control costs, and achieve greater efficiency in sourcing, all while ensuring the quality and reliability of supplies.",
    reverseOrder: false,
  },
  {
    id: 9,
    title: "Inventory Management",
    image: "/Inventory Management.png",
    altText: "ERP",
    description: "Inventory management becomes seamless with real-time tracking tools that provide complete visibility into stock levels, helping businesses reduce carrying costs and prevent stockouts. By monitoring inventory movements and maintaining optimal stock levels, organizations can minimize waste, improve order fulfillment rates, and enhance customer satisfaction. Advanced analytics and forecasting enable better demand planning, ensuring the right products are available at the right time. This efficient inventory control not only supports cost savings but also streamlines supply chain operations, driving overall business efficiency.",
    reverseOrder: true,
  },
  {
    id: 10,
    title: "Customer Relationship Management (CRM)",
    image: "/customer-relationship.png",
    altText: "ERP",
    description: "Customer Relationship Management (CRM) empowers businesses to build and nurture strong customer relationships through integrated tools for sales, marketing, and customer service. By centralizing customer data and interactions, CRM enables personalized engagement, targeted marketing campaigns, and efficient sales management. It helps track leads, monitor customer journeys, and deliver exceptional service, fostering loyalty and long-term satisfaction. With actionable insights and analytics, businesses can anticipate customer needs, resolve issues proactively, and optimize strategies to enhance overall customer experience, driving growth and success.",
    reverseOrder: false,
  },
  {
    id: 11,
    title: "Business Intelligence and Analytics",
    image: "/Business Intelligence and Analytics.png",
    altText: "ERP",
    description: "Business Intelligence and Analytics empower organizations to make informed decisions by utilizing advanced tools for data analysis and reporting. These capabilities enable businesses to gather, process, and interpret large volumes of data from various operational areas such as sales, finance, and customer interactions. By transforming raw data into meaningful insights, businesses can uncover trends, assess performance, and identify opportunities for optimization. The actionable insights derived from these analytics facilitate better decision-making, allowing companies to stay agile, improve efficiency, and drive growth. With real-time reporting, businesses can proactively address challenges, forecast future trends, and strategically guide their operations to achieve long-term success.",
    reverseOrder: true,
  },
  {
    id: 12,
    title: "Cloud-Based Accessibility",
    image: "/Cloud-Based Accessibility.png",
    altText: "ERP",
    description: "Cloud-Based Accessibility allows users to access their ERP system from anywhere, at any time, through a secure and reliable cloud platform. This flexibility ensures that employees and stakeholders can stay connected and collaborate seamlessly, whether they are working from the office, home, or on the go. By eliminating the need for on-premises infrastructure, businesses can reduce costs while benefiting from enhanced scalability, security, and uptime. Cloud-based ERP systems provide real-time access to critical data and applications, enabling teams to make quicker decisions, respond to market changes more effectively, and improve overall productivity. This modern approach to enterprise resource planning empowers businesses to adapt to the evolving work environment, supporting remote work and fostering better communication across departments and locations..",
    reverseOrder: false,
  },

  {
    id: 13,
    title: "Mobile Integration",
    image: "/Mobile Integration.png",
    altText: "ERP",
    description: "Mobile Integration ensures that users remain connected and productive while on the move by offering mobile applications that deliver real-time data and key functionalities directly to their smartphones or tablets. This seamless integration allows employees, managers, and stakeholders to access important business information, monitor performance, and make informed decisions anytime, anywhere. Whether it's checking inventory levels, approving purchase orders, or tracking project progress, mobile ERP applications provide the convenience and flexibility needed to manage business operations effectively. By enabling mobile access, businesses enhance responsiveness, improve communication, and empower their workforce to stay aligned with company goals and operations even outside the office environment.",
    reverseOrder: true,
  },
  {
    id: 14,
    title: "Artificial Intelligence and Machine Learning",
    image: "/AI-ML.png",
    altText: "ERP",
    description: "Artificial Intelligence (AI) and Machine Learning (ML) integration within an ERP system revolutionizes business operations by enabling intelligent automation, predictive analytics, and enhanced decision-making. With AI and ML algorithms, businesses can uncover valuable insights from vast amounts of data, optimize processes, and predict trends or outcomes more accurately. These technologies help businesses automate repetitive tasks, improve forecasting, and personalize customer experiences, driving greater efficiency and innovation. The ability to harness AI and ML empowers organizations to stay competitive in a rapidly evolving marketplace, reduce operational costs, and make data-driven decisions that are smarter and more efficient.",
    reverseOrder: false,
  },
  {
    id: 15,
    title: "Scalability",
    image: "/Scalability.png",
    altText: "ERP",
    description: "Our ERP solution is designed with scalability in mind, ensuring that it can seamlessly grow alongside your business. As your operations expand, the system offers flexible modules that can be easily customized to accommodate new requirements, additional users, and increased data volumes. This adaptability allows you to streamline processes, maintain operational efficiency, and reduce the need for costly system overhauls. Whether you're entering new markets, launching new products, or scaling up your team, our ERP solution ensures that your business can continue to thrive without outgrowing the system.",
    reverseOrder: true,
  },
  {
    id: 16,
    title: "Integration Capabilities",
    image: "/Integration Capabilities.png",
    altText: "ERP",
    description: "Our ERP solution offers robust integration capabilities, allowing you to seamlessly connect with your existing systems and third-party applications. This ensures that all your business functions, from finance to supply chain, are unified within a single, efficient IT ecosystem. By integrating effortlessly with other tools and platforms, you can streamline workflows, eliminate data silos, and improve overall operational efficiency. This flexibility enables your organization to leverage the best-of-breed solutions while maintaining a cohesive and streamlined IT infrastructure",
    reverseOrder: false,
  },

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

export default ERP;
