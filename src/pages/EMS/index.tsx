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

const keyFeatures = [
  {
    icon: "🔹",
    title: "Employee Database Management",
    image: "/Employee Database Management.png", // Add the image URL here
    points: [
      "Store and manage employee records securely",
      "Centralized access to personal, professional, and payroll data",
      "Easy search and filtering for quick retrieval",
    ],
  },
  {
    icon: "🔹",
    title: "Attendance & Leave Tracking",
    image: "/Attendance & Leave Tracking.png", // Add the image URL here
    points: [
      "Biometric, RFID, and GPS-based attendance tracking",
      "Automated leave requests and approvals",
      "Integration with payroll for accurate calculations",
    ],
  },
  {
    icon: "🔹",
    title: "Payroll & Compensation Management",
    image: "/Payroll & Compensation Management.png", // Add the image URL here
    points: [
      "Automated salary processing with tax deductions",
      "Compliance with labor laws and company policies",
      "Direct integration with banks for hassle-free salary disbursement",
    ],
  },
  {
    icon: "🔹",
    title: "Recruitment & Onboarding",
    image: "/Recruitment & Onboarding.png", // Add the image URL here
    points: [
      "Applicant tracking system (ATS) for seamless hiring",
      "Automated offer letter generation and document verification",
      "Digital onboarding for new hires",
    ],
  },
  {
    icon: "🔹",
    title: "Performance Management",
    image: "/Performance Management.png", // Add the image URL here
    points: [
      "Set and track employee goals & KPIs",
      "Conduct performance reviews with 360-degree feedback",
      "Identify training and development needs",
    ],
  },
  {
    icon: "🔹",
    title: "Employee Self-Service Portal",
    image: "/Employee Self-Service Portal.png", // Add the image URL here
    points: [
      "Employees can view payslips, request leaves, and update personal details",
      "Managers can approve requests and monitor team performance",
      "Mobile-friendly access for remote workforce",
    ],
  },
  {
    icon: "🔹",
    title: "Training & Development",
    image: "/Training & Development.png", // Add the image URL here
    points: [
      "Create and assign training modules",
      "Track progress and certifications",
      "Upskill employees to boost productivity",
    ],
  },
  {
    icon: "🔹",
    title: "Expense & Travel Management",
    image: "/Expense & Travel Management.png", // Add the image URL here
    points: [
      "Manage employee reimbursements with ease",
      "Policy-based approvals to control expenses",
      "Integration with accounting systems",
    ],
  },
  {
    icon: "🔹",
    title: "Analytics & Reports",
    image: "/Analytics & Reports.png", // Add the image URL here
    points: [
      "Real-time workforce insights with custom reports",
      "Track employee turnover, attendance trends, and productivity metrics",
      "Data-driven decision-making for HR and leadership teams",
    ],
  },
];

const whyChooseEMS = [
  "Cloud-Based & Secure – Access from anywhere with top-notch security",
  "Easy Integration – Seamlessly integrates with payroll, finance, and other HR tools",
  "User-Friendly Interface – Simple and intuitive navigation for HR teams and employees",
  "Customizable – Tailor workflows to fit your business needs",
  "Scalable – Designed to grow with your organization",
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
