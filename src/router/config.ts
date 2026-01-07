const routes = [
  { path: "/login", exact: true, component: "Login" },
  { path: "/", exact: true, component: "Home" },
  { path: "/home", exact: true, component: "Home" },

  { path: "/about", exact: true, component: "About" },
  { path: "/about/mission", exact: true, component: "AboutMission" },
  { path: "/about/services", exact: true, component: "AboutServices" },
  { path: "/about/industries", exact: true, component: "AboutIndustries" },
  { path: "/about/experts", exact: true, component: "AboutExperts" },

  { path: "/service", exact: true, component: "Service" },
  { path: "/ProductCompo/erp", exact: true, component: "ERP" },
  { path: "/ProductCompo/ems", exact: true, component: "EMS" },
  { path: "/ProductCompo/e-commerce", exact: true, component: "ECOMMERCE" },
  { path: "/contact", exact: true, component: "Contact" },
  { path: "/career", exact: true, component: "Career" },
  { path: "/privacyPolicy", exact: true, component: "PrivacyPolicy" },
  { path: "/productEngineering", exact: true, component: "ProductEngineering" },
  {
    path: "/resourseEngineering",
    exact: true,
    component: "ResourseEngineering",
  },
  {
    path: "/ProductCompo/data-engineering",
    exact: true,
    component: "DataEngineering",
  },

  { path: "/PostJob", exact: true, component: "PostJob" },
  { path: "/viewProfile", exact: true, component: "ViewProfile" },
  { path: "/jobs/:id", exact: true, component: "Jobs" }, // ✅ FIXED
  { path: "/applyForm", exact: true, component: "ApplyForm" }, // ✅ FIXED
  { path: "/viewJobs", exact: true, component: "ViewJobs" },
  { path: "/SideBar", exact: true, component: "SideBar" },
  { path: "/dashboard", exact: true, component: "Dashboard" },
  { path: "**", exact: true, component: "NotFoundPage" },
  { path: "/quickmvp", exact: true, component: "Quickmvp" },
  { path: "/engagementModels", exact: true, component: "Engagement-Models" },
  { path: "/Blog-Resource", exact: true, component: "Blog-Resource" },
  {
    path: "/ProductCompo/SoftwareDevelopment",
    exact: true,
    component: "SoftwareDevelopment",
  },
  {
    path: "/ProductCompo/ApplicationTesting",
    exact: true,
    component: "ApplicationTesting",
  },
  { path: "/ProductCompo/AIML", exact: true, component: "AIML" },
  {
    path: "/ProductCompo/IoT-EmbeddedSystems",
    exact: true,
    component: "IoT-EmbeddedSystems",
  },
  {
    path: "/ProductCompo/DataEngineering-Analytics",
    exact: true,
    component: "DataEngineering-Analytics",
  },
  { path: "/Staff-Agumentation", exact: true, component: "Staff-Agumentation" },
];

export default routes;
