/* servicesData.ts */

export interface ExpertiseDetail {
  description: string[];
  image: string;
}

export interface Expertise {
  [key: string]: ExpertiseDetail;
}

export interface Service {
  title: string;
  description: string;
  overview: string;
  expertise: Expertise;
  image: string;
  cta: string;
}

export const serviceData = {
  /* ================= SERVICE 1 ================= */
  secure_custom_software_development: {
    title: "Secure Custom Software Development",
    description:
      "We build secure, scalable, and high-performance digital applications tailored to your business needs. Every solution follows a Secure SDLC, ensuring quality and protection from day one.",
    overview: "What We Deliver",
    cta: "Schedule a Free Consultation",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      Web_Applications: {
        description: [
          "Web applications (React, Node.js, Python, Go)",
          "Secure and scalable web platforms designed for long-term performance.",
        ],
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      },

      Mobile_Apps: {
        description: [
          "Mobile apps (Flutter, iOS, Android)",
          "High-quality mobile apps with seamless UX and strong security.",
        ],
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      },

      Enterprise_SaaS: {
        description: [
          "Enterprise SaaS platforms",
          "Multi-tenant SaaS systems with role-based access and scalability.",
        ],
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
      },

      API_Microservices: {
        description: [
          "API & Microservices development",
          "Secure REST & GraphQL APIs with modular microservice architecture.",
        ],
        image:
          "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },

      Cloud_Native: {
        description: [
          "Cloud-native architecture & deployment",
          "Highly resilient, scalable cloud-native systems.",
        ],
        image:
          "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    },
  },

  /* ================= SERVICE 2 ================= */
  application_security_testing: {
    title: "Premium QA & Application Security Assurance",
    description:
      "We help businesses identify vulnerabilities before attackers do through comprehensive manual and automated testing.",
    overview: "Capabilities",
    cta: "Request a Security Assessment",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      Quality_Engineering: {
        description: [
          "Quality Engineering",
          "Flawless functionality and predictable releases through structured manual and automated testing that validates every workflow before production.",
        ],
        image:
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=80",
      },

      Application_Security_Testing: {
        description: [
          "Application Security Testing",
          "Multi-layer security testing across code, runtime, APIs, and mobile to identify vulnerabilities early and reduce the attack surface.",
        ],
        image:
          "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=900&q=80",
      },

      API_Integration_Security: {
        description: [
          "API & Integration Security",
          "Protect APIs from IDOR, broken authorization, data leakage, and abuse to ensure safe, scalable integrations.",
        ],
        image:
          "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?auto=format&fit=crop&w=900&q=80",
      },

      Compliance_Ready_Assurance: {
        description: [
          "Compliance-Ready Assurance",
          "Testing aligned with OWASP Top 10 and secure coding standards, delivering evidence that simplifies audits and compliance reviews.",
        ],
        image:
          "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=900&q=80",
      },

      Executive_Risk_Reporting: {
        description: [
          "Executive Risk Reporting",
          "Risk-prioritized, actionable reports that translate technical findings into clear business impact for leadership.",
        ],
        image:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80",
      },
    },
  },

  /* ================= SERVICE 3 ================= */
  ai_ml_integration: {
    title: "AI/ML Integration & Intelligent Automation",
    description:
      "Enhance decision-making, reduce operational costs, and build intelligent systems using AI-driven solutions.",
    overview: "Offerings",
    cta: "Explore AI Solutions",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      Chatbots: {
        description: [
          "AI Chatbots & Virtual Assistants",
          "Conversational AI for customer engagement and automation.",
        ],
        image:
          "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=900&q=80",
      },

      Predictive_Analytics: {
        description: [
          "Predictive Analytics",
          "Forecasting models for data-driven decision making.",
        ],
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      },

      LLM_Agents: {
        description: [
          "LLM-based automation & enterprise AI agents",
          "Advanced AI agents built on large language models.",
        ],
        image:
          "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    },
  },

  /* ================= SERVICE 4 ================= */
  iot_embedded_systems: {
    title: "IoT & Embedded Systems",
    description:
      "We develop smart IoT solutions connecting hardware, software, and cloud systems for real-time intelligence.",
    overview: "Solutions",
    cta: "Build Your IoT Product",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      Firmware: {
        description: [
          "Firmware development",
          "Reliable embedded firmware optimized for performance.",
        ],
        image:
          "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },

      Device_Integration: {
        description: [
          "IoT device integration",
          "Seamless integration between devices and cloud systems.",
        ],
        image:
          "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },

      Monitoring: {
        description: [
          "Real-time monitoring systems",
          "Live dashboards and alerting systems.",
        ],
        image:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
      },
    },
  },

  /* ================= SERVICE 5 ================= */
  data_engineering_visualization: {
    title: "Data Engineering & Visualization",
    description:
      "Turn raw data into meaningful insights with scalable data pipelines and dashboards.",
    overview: "Capabilities",
    cta: "Transform Your Data",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      ETL_ELT: {
        description: ["ETL / ELT pipelines"],
        image:
          "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },

      Dashboards: {
        description: [
          "Power BI, Tableau, Looker dashboards",
          "Interactive visual dashboards for business insights.",
        ],
        image:
          "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    },
  },

  /* ================= SERVICE 6 ================= */
  staff_augmentation: {
    title: "Staff Augmentation (Dedicated Teams)",
    description:
      "Scale your engineering capacity with skilled professionals who integrate seamlessly into your team.",
    overview: "Talent We Provide",
    cta: "Hire Skilled Talent",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",

    expertise: {
      Talent: {
        description: [
          "Software Developers, Security Engineers, Data Engineers, AI/ML & DevOps experts.",
        ],
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      },
    },
  },
} as const;

export type ServiceKey = keyof typeof serviceData;
