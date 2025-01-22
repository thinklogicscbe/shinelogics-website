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
}

export interface ServicesData {
  [key: string]: Service;
}

export const serviceData: ServicesData = {
  web_development_services: {
    title: "Web Development",
    description:
      "We craft highly responsive and scalable web applications using modern frameworks like Angular, Python, and React Native to deliver seamless user experiences.",
    overview: "Build Fast, Scalable & Engaging Web Applications. Our Web Development Expertise:",
    expertise: {
      Angular_Development: {
        description: [
          "Optimized Rendering: SPAs use Virtual DOM for efficient rendering, updating only the necessary parts of the page, enhancing performance and reducing reloads.",
          "Efficient Routing: Client-side routing enables seamless navigation between views without full-page reloads, while asynchronous data fetching improves load times.",
          "State Management: Centralized state management with tools like Redux ensures consistent app behavior, boosting performance across components.",
          "Progressive Web Apps (PWAs): SPAs can be turned into PWAs, offering offline support, push notifications, and faster loading, delivering a native app experience in the browser.",
        ],
        image: require("../../assets/service/web4.jpg"),
      },
      Python_Web_Development: {
        description: [
          "Rapid Development with Django: Django offers a high-level framework that allows for quick development of secure and scalable web applications with minimal setup.",
          "Customizable Flask Applications: Flask's lightweight structure enables the creation of highly customizable backend systems for microservices and RESTful APIs.",
          "Comprehensive ORM Support: Django’s powerful ORM simplifies database handling and reduces the complexity of data models, enabling quick integration with various databases.",
          "Flexible Routing in Flask: Flask provides flexible routing mechanisms, allowing for easy management of different HTTP methods and URL endpoints for diverse application needs.",
          
        ],
        image: require("../../assets/service/web2.jpg"),
      },
      React_Web_Development: {
        description: [
          "Our skilled developers leverage the latest React frameworks, libraries, and tools to create fast, interactive, and dynamic web applications.",
          "We provide tailored solutions that align with your unique business requirements, ensuring a seamless user experience.",
          "Our front-end experts craft intuitive and visually appealing interfaces that engage users and enhance brand presence.",
          "Creating highly responsive SPAs for an engaging user experience.",
          "We follow agile methodologies to ensure flexibility, transparency, and on-time delivery of your projects.",
        ],
        image: require("../../assets/service/web5.jpg"),
      },
    },
    image: require("../../assets/service/Webdev.jpg"),
  },

  mobile_app_development_services: {
    title: "Mobile App Development",
    description:
      "At Shinelogics, we develop high-performing mobile applications tailored to your business needs.",
    overview: "Innovative & Custom Mobile Apps for iOS & Android.",
    expertise: {
      Flutter_App_Development: {
        description: [
          "Efficient Cross-Platform Development: Flutter enables the creation of native apps for both iOS and Android using a single codebase, reducing the need for separate codebases for each platform.",
          "Rapid Prototyping and Iteration: Flutter's hot reload feature allows developers to quickly visualize changes in real time, speeding up the development and testing process.",
          "Consistent UI Across Platforms: Flutter's built-in Material Design and Cupertino widgets offer platform-specific designs, ensuring that your app has a native look and feel on both iOS and Android.",
        ],
        image: require("../../assets/service/flutter.jpg"),
      },
      ios_and_android_Customization: {
        description: [
          "Develop high-performance apps using native languages like Swift for iOS and Kotlin for Android, ensuring smooth operation on each platform.",
          "Ensure your app meets the strict guidelines of both the Apple App Store and Google Play Store for seamless publishing.",
          "Enhance user engagement with immersive AR/VR experiences, leveraging native SDKs and frameworks for both platforms.",
          "Integrate AI-driven features such as chatbots, recommendation engines, and smart notifications for enhanced functionality."
        ],
        image: require("../../assets/service/mobile.jpg"),
      },
      React_Native_Mobile_App_Development: {
        description: [
          "React Native allows you to write a single codebase for both iOS and Android, streamlining development and reducing maintenance time.",
          "The lightweight nature of React Native ensures that applications run smoothly even on devices with limited resources, enhancing performance.",
          "By utilizing server-side rendering (SSR) and optimizing metadata, React Native apps can be made SEO-friendly, increasing visibility on search engines.",
          "React Native allows the creation of visually rich interfaces with native-like performance, providing users with an engaging experience.",
        ],
        image: require("../../assets/service/web5.jpg"),
      },
    },
    image: require("../../assets/service/mobileApp.jpg"),
  },

  cybersecurity_services: {
    title: "Cybersecurity",
    description:
      "Cyber threats are increasing rapidly, and businesses need robust security to protect their digital assets.",
    overview: "Protect Your Business from Cyber Threats.",
    expertise: {
      Network_Security: {
        description: [
          "Implement advanced firewall solutions to safeguard network perimeters and block unauthorized access.",
          "Use intrusion detection systems (IDS) to continuously monitor traffic and identify potential threats in real time.",
          "Establish secure Virtual Private Networks (VPNs) to encrypt data and protect user connections.",
          "Deploy DDoS mitigation strategies to defend against Distributed Denial of Service attacks that overwhelm network resources.",
          "Utilize machine learning and AI-driven tools for early detection and rapid response to sophisticated cyber threats."
        ],
        image: require("../../assets/service/network.jpg"),
      },
      Application_Security: {
        description: [
          "Comprehensive vulnerability scanning for both web and mobile applications to identify potential attack vectors.",
          "Testing of API endpoints to ensure they are protected against common vulnerabilities like SQL injection and cross-site scripting (XSS).",
          "Evaluation of API authentication methods, ensuring proper use of OAuth, JWT, and other modern security protocols.",
          "Implementation of rate-limiting and IP filtering to prevent abuse of APIs.",
          "In-depth analysis of your application’s logic to identify potential flaws that could be exploited by attackers.",
        ],
        image: require("../../assets/service/application.jpg"),
      },
      Cloud_Security: {
        description: [
          "Implement best practices for cloud security across AWS, Azure, and Google Cloud platforms.",
          "Encrypt sensitive data both in transit and at rest to prevent unauthorized access.",
          "Set strict access control policies to ensure only authorized users and applications can access critical resources.",
          "Deploy multi-layered security strategies, including firewalls, intrusion detection systems, and endpoint security.",
          "Use automated tools to monitor cloud activity and generate alerts for suspicious behavior or non-compliance.",
        ],
        image: require("../../assets/service/cloud.jpg"),
      },
      Cyber_Threat_Intelligence_and_Monitoring: {
        description: [
          "Our expert team offers round-the-clock surveillance to detect emerging threats instantly. Proactive monitoring ensures that potential risks are mitigated before they can escalate.",
          "Leverage cutting-edge AI technology to continuously analyze your network for abnormal activity. Real-time threat detection and risk analysis empower your business to stay ahead of cybercriminals.",
          "We provide rapid response and recovery strategies to minimize the impact of cyber incidents. Our solutions help you restore operations quickly and securely, ensuring business continuity.",
          "We aggregate global intelligence feeds to identify emerging threats and vulnerabilities. This comprehensive data empowers businesses with actionable insights to strengthen their security posture.",
        ],
        image: require("../../assets/service/cybermonitoring.jpg"),
      },
    },
    image: require("../../assets/service/cyberSecurity.jpg"),
  },
  data_analytics: {
    title: "Data Analytics",
    description:
      "Transforming Data into Actionable Insights for Smarter Decision-Making In today’s data-driven world, businesses generate massive amounts of data daily. But raw data is not enough—you need insights that drive strategic decisions. At Shinelogics, we specialize in Data Analytics solutions that help organizations extract valuable insights, identify trends, and optimize operations for better business outcomes.",
    overview: "Protect Your Business from Cyber Threats.",
    expertise: {
      Business_Intelligence_and_Data_Visualization: {
        description: [
          "We help businesses visualize their data with intuitive dashboards and reports, enabling stakeholders to make informed decisions at a glance.",
          "Custom Dashboards & Reports – Power BI, Tableau, Google Data Studio KPI & Performance Monitoring – Track sales, customer engagement, and operational efficiency.",
          "Data-Driven Decision Making – Interactive reports with real-time updates Executive Insights – High-level business overviews for leadership teams.",
        ],
        image: require("../../assets/service/data1.jpg"),
      },
      Big_Data_Analytics: {
        description: [
          "Leverage cutting-edge big data analytics tools to process large volumes of data, uncovering patterns and trends. This helps drive informed decision-making and predictive insights.",
          "Build efficient data warehousing solutions to store vast amounts of data. Implement ETL pipelines to streamline data extraction, transformation, and loading for analysis.",
          "Use distributed computing frameworks like Apache Spark and Hadoop to process large-scale datasets. This ensures high-speed data processing and real-time analysis across multiple nodes.",
          "Create data lakes to store all types of raw, unstructured, and structured data in a central repository. This approach enables flexible and scalable data access for analysis and future use.",
        ],
        image: require("../../assets/service/data2.jpg"),
      },
      Predictive_Analytics_and_Machine_Learning: {
        description: [
          "Leverage AI to analyze past interactions, helping businesses predict future purchasing behaviors and preferences. This enables tailored marketing strategies and personalized product recommendations.",
          "AI can identify anomalies in transaction data, flagging potential fraudulent activities in real-time. By learning from historical data, it helps minimize financial losses and improve security.",
          "AI models can identify patterns leading to customer churn, allowing businesses to proactively address issues. Retention strategies are optimized by targeting at-risk customers with personalized offers and engagement.",
          "AI uses historical sales data to predict future trends and demand. This helps businesses plan inventory levels, optimize resource allocation, and set more accurate sales targets.",
        ],
        image: require("../../assets/service/data3.jpg"),
      },
      Data_Engineering_and_Cloud_Data_Solutions: {
        description: [
          "Cloud Data Warehousing (AWS Redshift, Google BigQuery, Azure Synapse)We implement scalable cloud data warehouses for efficient data storage and retrieval. Our solutions integrate seamlessly with platforms like AWS Redshift, Google BigQuery, and Azure Synapse.",
          "ETL Development & Data Pipelines We design ETL processes to enable smooth data extraction, transformation, and loading. Our automated pipelines ensure reliable and efficient data flow across various sources.",
          "Database Optimization & Performance Tuning We optimize database performance by refining queries and structures for faster response times. Our tuning techniques enhance efficiency and scalability to meet business demands.",
        ],
        image: require("../../assets/service/data4.jpg"),
      },
      AI_Powered_Analytics_and_NLP: {
        description: [
          "Chatbots & Automated Reporting: Utilize AI-powered chatbots to provide instant customer support and generate automated reports, improving efficiency and reducing manual effort.",
          "Text & Speech Analytics: Leverage NLP to process and analyze text and voice data, extracting valuable insights that drive business growth and enhance customer experiences.",
          "Real-time Decision Making: AI-driven insights enable businesses to make informed decisions quickly by analyzing large volumes of data and identifying trends in real time.",
        ],
        image: require("../../assets/service/data5.jpg"),
      },
    },
    image: require("../../assets/service/data.jpg"),
  },
};
