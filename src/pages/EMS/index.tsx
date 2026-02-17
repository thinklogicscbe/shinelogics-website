import { BannerContainer } from "./style"; // Adjust the path as needed

const productheading = [
  {
    id: 1,
    title: "Employee Management System (EMS)",
    description:
      "Our Employee Management System (EMS) is a comprehensive and scalable solution designed to automate, streamline, and optimize HR processes, ensuring seamless workforce management across your organization. From recruitment to retirement, our EMS covers every aspect of the employee lifecycle, including onboarding, attendance tracking, payroll processing, performance evaluation, training, and employee engagement. By eliminating manual HR tasks, our system reduces errors, enhances compliance, and boosts workforce productivity.",
    bannerimage: "/ems-banner.jpg", // Make sure this image exists in the public directory
    isHeading: true,
  },
];





const EMS: React.FC = () => {
  console.log("EMS Component Rendered"); // Check if the component is rendered
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

      <div className="features-container ems-layout">
        <div className="ems-header">
          <h2>Secure Employee & HR Management System</h2>
          <p>
            Shine EMS is a centralized workforce management platform that
            simplifies HR operations while ensuring data privacy and compliance.
          </p>
        </div>

        <div className="ems-sections">
          {/* WHAT IT DOES */}
          <div className="ems-section">
            <h3>What It Does</h3>
            <ul>
              <li>Employee lifecycle management</li>
              <li>Payroll and HR operations</li>
              <li>Performance and attendance tracking</li>
              <li>Compliance and audit readiness</li>
            </ul>
          </div>

          {/* POWERED BY */}
          <div className="ems-section">
            <h3>Powered by Our Expertise</h3>
            <ul>
              <li>Role-based access control for sensitive employee data</li>
              <li>Compliance automation aligned with regulations</li>
              <li>Analytics-driven HR insights</li>
              <li>Secure data architecture to protect employee information</li>
            </ul>
          </div>

          {/* BUSINESS VALUE */}
          <div className="ems-section">
            <h3>Business Value</h3>
            <ul className="check-list">
              <li>Reduced HR overhead</li>
              <li>Improved compliance confidence</li>
              <li>Data-backed workforce decisions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="why-choose-container">
                <h2>Why Choose Our EMS?</h2>
                <ul>
                    {whyChooseEMS.map((item, index) => (
                        <li key={index} className="why-choose-item">
                            ✅ {item}
                        </li>
                    ))}
                </ul>
            </div> */}
    </BannerContainer>
  );
};

export default EMS;
