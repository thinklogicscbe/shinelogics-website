import { ServiceContainer, ServiceCard, Title } from "./style";

const Shineplatforms = () => {
  const platforms = [
    {
      icon: "🏢",
      title: "Shine ERP",
      subtitle: "Smart, Secure Enterprise Management",
      description:
        "AI-powered ERP to manage inventory, customers, accounting, and operations in one secure platform.",
    },
        {
      icon: "🧠",
      title: "ShineDatum",
      subtitle: "The Intelligence Engine",
      description:
        "Centralized data, analytics, and AI that powers every Shine platform and business decision.",
    },
        {
      icon: "🛒",
      title: "Shine E-commerce & POS",
      subtitle: "One Commerce Platform. Everywhere.",
      description:
        "Unified online and in-store sales, inventory, payments, and analytics in real time.",
    },
        {
      icon: "👥",
      title: "Shine EMS",
      subtitle: "Simplified Workforce Management",
      description:
        "A secure, compliance-ready platform for HR, payroll, and employee performance tracking.",
    },
    {
      icon: "🤝",
      title: "Shine CRM",
      subtitle: "Know Your Customers Better",
      description:
        "Track customer data, sales history, and support requests with intelligence-driven insights.",
    },
    {
      icon: "🔎",
      title: "ShineVMS",
      subtitle: "Continuous Security Visibility",
      description:
        "Discover, prioritize, and remediate vulnerabilities across cloud, applications, and infrastructure.",
    },
    {
      icon: "📋",
      title: "ShineCompliance",
      subtitle: "Always Audit-Ready",
      description:
        "Continuous compliance monitoring, implementation, and audit automation across applications.",
    },
    {
      icon: "🔐",
      title: "Shine E2EE Communication Platform",
      subtitle: "Private by Design",
      description:
        "End-to-end encrypted messaging, voice, and video for secure enterprise collaboration.",
    },
  ];

  return (
    <ServiceContainer>
      <Title>Our Platforms</Title>

      <div className="services-grid">
        {platforms.map((item, index) => (
          <ServiceCard key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p style={{ fontWeight: 700 }}>{item.subtitle}</p>
            <p>{item.description}</p>
          </ServiceCard>
        ))}
      </div>
    </ServiceContainer>
  );
};

export default Shineplatforms;
