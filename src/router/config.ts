const routes = [
  { path: "/login", exact: true, component: "Login" },
  { path: "/", exact: true, component: "Home" },
  { path: "/home", exact: true, component: "Home" },
  { path: "/about", exact: true, component: "About" },
  { path: "/service", exact: true, component: "Service" },
  { path: "/ProductCompo/erp", exact: true, component: "ERP" },
  { path: "/ProductCompo/ems", exact: true, component: "EMS" },
  { path: "/ProductCompo/e-commerce", exact: true, component: "ECOMMERCE" },
  { path: "/contact", exact: true, component: "Contact" },
  { path: "/career", exact: true, component: "Career" },
  { path: "/privacyPolicy", exact: true, component: "PrivacyPolicy" },
  { path: "/productEngineering", exact: true, component: "ProductEngineering" },
  { path: "/resourseEngineering", exact: true, component: "ResourseEngineering" },
  { path: "/PostJob", exact: true, component: "PostJob" },
  { path: "/viewProfile", exact: true, component: "ViewProfile" },
  { path: "/Jobs", exact: true, component: "Jobs" },
  { path: "applyForm", exact: true, component: "ApplyForm" },
  { path: "/viewJobs", exact: true, component: "ViewJobs" },
  { path: "/SideBar", exact: true, component: "SideBar" },
  { path: "/dashboard", exact: true, component: "Dashboard" },
  { path: "**", exact: true, component: "NotFoundPage" },

];

export default routes;
