import React from "react";
import { BannerContainer, CoreFeaturesContainer, BenefitsContainer } from "./style"; // Adjust the path as needed

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

const coreFeatures = [
    {
        title: "Customizable Online Store Design",
        points: [
            "Choose from a wide range of professionally designed, mobile-responsive themes",
            "Easy drag-and-drop website builder—no coding required",
            "Tailor your store’s design to reflect your brand identity",
        ],
        icon: "💻",
    },
  
    {
        title: "Efficient Inventory & Order Management",
        points: [
            "Real-time inventory tracking to prevent stockouts",
            "Automated order processing from receipt to delivery",
            "Easy returns and exchanges management",
        ],
        icon: "📦",
    },
    {
        title: "Sales and Marketing Tools",
        points: [
            "Built-in SEO optimization to help your store rank higher on search engines",
            "Advanced email marketing, promotions, and abandoned cart recovery",
            "Create loyalty programs, discounts, and special offers for repeat customers",
        ],
        icon: "📈",
    },
    {
        title: "Multi-Language & Multi-Currency Support",
        points: [
            "Cater to global customers with multi-currency support and automatic currency conversion",
            "Enable a multi-language store to reach diverse markets",
            "International shipping integration for seamless global sales",
        ],
        icon: "🌍",
    },
    {
        title: "Seamless Integrations",
        points: [
            "Integrate with CRM, ERP, accounting, and inventory management systems",
            "Sync with third-party marketplaces like Amazon and eBay to expand your reach",
            "API access for custom integrations",
        ],
        icon: "🛠",
    },
    {
        title: "Analytics & Reporting Tools",
        points: [
            "Access detailed reports on sales, customer behavior, and product performance",
            "Track key metrics and make data-driven decisions to grow your business",
            "Real-time dashboards for a comprehensive view of your operations",
        ],
        icon: "📊",
    },
    {
        title: "Shipping & Fulfillment",
        points: [
            "Real-time shipping rates and multiple courier integrations",
            "Automated tracking and delivery updates for customers",
            "Manage inventory across multiple warehouses and locations",
        ],
        icon: "🚚",
    },
    {
        title: "Customer Engagement Tools",
        points: [
            "Personalized shopping experience with product recommendations",
            "AI-powered chatbots to handle customer inquiries 24/7",
            "Create targeted marketing campaigns to drive repeat business",
        ],
        icon: "🛒",
    },
    {
        title: "Secure Payment Systems",
        points: [
            "Accept payments from multiple gateways: PayPal, Stripe, credit/debit cards, and more",
            "Secure, encrypted payment processing for safe transactions",
            "Simple checkout process to minimize cart abandonment",
        ],
        icon: "💳",
    },
];

const whyChooseECOMMERCE = [
     "User-Friendly Interface – No tech skills required to get started",
    "Scalable – Suitable for businesses of all sizes, from startups to enterprises",
    "Secure – Industry-leading security protocols to protect customer data",
    "Fast & Reliable – Optimized for quick load times and high uptime",
    "Affordable Plans – Flexible pricing based on your business needs"
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

            <CoreFeaturesContainer>
                <div className="core-features-container">
                    <div className="core-features-grid">
                        {coreFeatures.map((feature, index) => (
                            <div key={index} className="core-feature-item">
                                <div className="core-feature-icon">{feature.icon}</div>
                                <strong>{feature.title}</strong>
                                <ul>
                                    {feature.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </CoreFeaturesContainer>

            <BenefitsContainer>
                <div className="why-choose-container">
                    <h2>Why Choose Our EMS?</h2>
                    <ul>
                        {whyChooseECOMMERCE.map((item, index) => (
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

export default ECOMMERCE;
