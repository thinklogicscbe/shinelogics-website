import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Header,
  LogoWrapper,
  LogoImage,
  LogoutButton,
  Sidebar,
  SidebarHeader,
  CloseButton,
  NavList,
  NavItem,
  NavSectionLabel,
  Content,
  Backdrop,
  SidebarToggle,
} from "./style";

// 🔹 Pages / Components
import ViewProfile from "../ViewProfile";
import PostJob from "../PostJob";
import ViewJobs from "../ViewJobs";
import EngagementModelAdmin from "../EngagementModelAdmin";
import ResourceAdmin from "../ResourceAdmin";
import ExpertAdmin from "../ExpertAdmin";
import AdminBanner from "../AdminBanner";
import AdminProducts from "../AdminProducts";
import AdminQuickMvp from "../AdminQuickMvp";
import AdminCustomPlanOptions from "../AdminCustomPlanOptions";
import AdminServicePage from "../AdminServicePage";
import ContactLeadsAdmin from "../ContactLeadsAdmin";
import HomeSectionAdmin from "../HomeSectionAdmin";
import PartnerAdmin from "../PartnerAdmin";
import CreateEmployee from "../CreateEmployee";
import PerformanceDashboard from "../PerformanceDashboard";
import PayslipAdmin from "../PayslipAdmin";
import LeaveAdmin from "../LeaveAdmin";
import ProductivityAdmin from "../ProductivityAdmin";
import CompanySetup from "../Companysetup";
import TeamManagement from "../TeamManagement";
import TeamWall from "../TeamWall"; // ✅ NEW

// 🔹 Assets
import logo1 from "../../assets/shinelogics-logo.png";

// 🔹 Allowed component keys
type AdminComponent =
  | "AdminBanner"
  | "PostJob"
  | "ViewJobs"
  | "ViewResumes"
  | "EngagementModels"
  | "ResourceAdmin"
  | "ExpertsAdmin"
  | "AdminProducts"
  | "QuickMvpAdmin"
  | "CustomPlanOptions"
  | "AdminServices"
  | "ContactLeads"
  | "HomeSectionAdmin"
  | "PartnerAdmin"
  | "CreateEmployee"
  | "PerformanceDashboard"
  | "ProductivityAdmin"
  | "PayslipAdmin"
  | "LeaveAdmin"
  | "CompanySetup"
  | "TeamManagement"
  | "TeamWall"; // ✅ NEW

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<AdminComponent>(
    (localStorage.getItem("selectedComponent") as AdminComponent) ||
      "PerformanceDashboard"
  );

  const handleNavigation = (component: AdminComponent): void => {
    setSelectedComponent(component);
    localStorage.setItem("selectedComponent", component);
    setSidebarOpen(false);
  };

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/login");
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "PerformanceDashboard":  return <PerformanceDashboard />;
      case "CreateEmployee":        return <CreateEmployee />;
      case "TeamManagement":        return <TeamManagement />;
      case "TeamWall":              return <TeamWall />;        // ✅ NEW
      case "PayslipAdmin":          return <PayslipAdmin />;
      case "LeaveAdmin":            return <LeaveAdmin />;
      case "ProductivityAdmin":     return <ProductivityAdmin />;
      case "CompanySetup":          return <CompanySetup />;
      case "AdminServices":         return <AdminServicePage />;
      case "HomeSectionAdmin":      return <HomeSectionAdmin />;
      case "PartnerAdmin":          return <PartnerAdmin />;
      case "ContactLeads":          return <ContactLeadsAdmin />;
      case "QuickMvpAdmin":         return <AdminQuickMvp />;
      case "CustomPlanOptions":     return <AdminCustomPlanOptions />;
      case "AdminBanner":           return <AdminBanner />;
      case "AdminProducts":         return <AdminProducts />;
      case "PostJob":               return <PostJob />;
      case "ViewJobs":              return <ViewJobs />;
      case "ViewResumes":           return <ViewProfile />;
      case "EngagementModels":      return <EngagementModelAdmin />;
      case "ResourceAdmin":         return <ResourceAdmin />;
      case "ExpertsAdmin":          return <ExpertAdmin />;
      default:                      return <PerformanceDashboard />;
    }
  };

  return (
    <>
      <Layout>
        {/* HEADER */}
        <Header>
          <LogoWrapper>
            <LogoImage src={logo1} alt="Shinelogics Logo" />
          </LogoWrapper>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>

        {/* SIDEBAR */}
        <Sidebar open={sidebarOpen}>
          <SidebarHeader>
            <span>Menu</span>
            <CloseButton onClick={() => setSidebarOpen(false)}>✕</CloseButton>
          </SidebarHeader>

          <NavList>

            {/* ── EMPLOYEE MANAGEMENT SYSTEM ── */}
            <NavSectionLabel>👥 Employee Management System</NavSectionLabel>

            <NavItem
              active={selectedComponent === "PerformanceDashboard"}
              onClick={() => handleNavigation("PerformanceDashboard")}
            >
              🤖 AI Employee Performance
            </NavItem>

            <NavItem
              active={selectedComponent === "CreateEmployee"}
              onClick={() => handleNavigation("CreateEmployee")}
            >
              🏢 Organization Management
            </NavItem>

            <NavItem
              active={selectedComponent === "TeamWall"}
              onClick={() => handleNavigation("TeamWall")}
            >
              🧱 Team Wall
            </NavItem>

            <NavItem
              active={selectedComponent === "PayslipAdmin"}
              onClick={() => handleNavigation("PayslipAdmin")}
            >
              💰 Payslip
            </NavItem>

            <NavItem
              active={selectedComponent === "LeaveAdmin"}
              onClick={() => handleNavigation("LeaveAdmin")}
            >
              🏖️ Leave Management
            </NavItem>

            {/* ── WEBSITE DETAILS ── */}
            <NavSectionLabel>🌐 Website Details</NavSectionLabel>

            <NavItem
              active={selectedComponent === "HomeSectionAdmin"}
              onClick={() => handleNavigation("HomeSectionAdmin")}
            >
              🏠 Home Sections
            </NavItem>

            <NavItem
              active={selectedComponent === "PartnerAdmin"}
              onClick={() => handleNavigation("PartnerAdmin")}
            >
              🤝 Partners
            </NavItem>

            <NavItem
              active={selectedComponent === "AdminServices"}
              onClick={() => handleNavigation("AdminServices")}
            >
              ⚙️ Services
            </NavItem>

            <NavItem
              active={selectedComponent === "ContactLeads"}
              onClick={() => handleNavigation("ContactLeads")}
            >
              📋 Contact Leads
            </NavItem>

            <NavItem
              active={selectedComponent === "QuickMvpAdmin"}
              onClick={() => handleNavigation("QuickMvpAdmin")}
            >
              🚀 Quick MVP Plans
            </NavItem>

            <NavItem
              active={selectedComponent === "CustomPlanOptions"}
              onClick={() => handleNavigation("CustomPlanOptions")}
            >
              📐 Custom Plan Options
            </NavItem>

            <NavItem
              active={selectedComponent === "AdminBanner"}
              onClick={() => handleNavigation("AdminBanner")}
            >
              🖼️ Home Page Banner
            </NavItem>

            <NavItem
              active={selectedComponent === "AdminProducts"}
              onClick={() => handleNavigation("AdminProducts")}
            >
              📦 Products
            </NavItem>

            <NavItem
              active={selectedComponent === "PostJob"}
              onClick={() => handleNavigation("PostJob")}
            >
              📝 Post Job
            </NavItem>

            <NavItem
              active={selectedComponent === "ViewJobs"}
              onClick={() => handleNavigation("ViewJobs")}
            >
              💼 View Jobs
            </NavItem>

            <NavItem
              active={selectedComponent === "ViewResumes"}
              onClick={() => handleNavigation("ViewResumes")}
            >
              📄 View Resumes
            </NavItem>

            <NavItem
              active={selectedComponent === "EngagementModels"}
              onClick={() => handleNavigation("EngagementModels")}
            >
              🔗 Engagement Models
            </NavItem>

            <NavItem
              active={selectedComponent === "ResourceAdmin"}
              onClick={() => handleNavigation("ResourceAdmin")}
            >
              📰 Blog & Resources
            </NavItem>

            <NavItem
              active={selectedComponent === "ExpertsAdmin"}
              onClick={() => handleNavigation("ExpertsAdmin")}
            >
              🧑‍💼 Experts
            </NavItem>

          </NavList>
        </Sidebar>

        {/* CONTENT */}
        <Content>{renderComponent()}</Content>
      </Layout>

      {/* MOBILE TOGGLE */}
      {!sidebarOpen && (
        <SidebarToggle onClick={() => setSidebarOpen(true)}>☰</SidebarToggle>
      )}

      {/* BACKDROP */}
      {sidebarOpen && <Backdrop onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default SideBar;