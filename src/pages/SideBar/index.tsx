import { useState } from "react";
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
  Content,
  Backdrop,
  SidebarToggle,
} from "./style";

import ViewProfile from "../ViewProfile";
import PostJob from "../PostJob";
import ViewJobs from "../ViewJobs";
import Dashboard from "../Dashboard";
import EngagementModelAdmin from "../EngagementModelAdmin";
import ResourceAdmin from "../ResourceAdmin";
import ExpertAdmin from "../ExpertAdmin";

import logo1 from "../../assets/shinelogics-logo.png";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState<string>(
    localStorage.getItem("selectedComponent") || "Dashboard"
  );

  const handleNavigation = (component: string) => {
    setSelectedComponent(component);
    localStorage.setItem("selectedComponent", component);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ViewJobs":
        return <ViewJobs />;
      case "PostJob":
        return <PostJob />;
      case "ViewResumes":
        return <ViewProfile />;
      case "EngagementModels":
        return <EngagementModelAdmin />;
      case "ResourceAdmin":
        return <ResourceAdmin />;
      case "ExpertsAdmin":
        return <ExpertAdmin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout>
        {/* HEADER */}
        <Header>
          <LogoWrapper>
            <LogoImage src={logo1} alt="Logo" />
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
            <NavItem
              active={selectedComponent === "Dashboard"}
              onClick={() => handleNavigation("Dashboard")}
            >
              Dashboard
            </NavItem>

            <NavItem
              active={selectedComponent === "PostJob"}
              onClick={() => handleNavigation("PostJob")}
            >
              Post Job
            </NavItem>

            <NavItem
              active={selectedComponent === "ViewJobs"}
              onClick={() => handleNavigation("ViewJobs")}
            >
              View Jobs
            </NavItem>

            <NavItem
              active={selectedComponent === "ViewResumes"}
              onClick={() => handleNavigation("ViewResumes")}
            >
              View Resumes
            </NavItem>

            <NavItem
              active={selectedComponent === "EngagementModels"}
              onClick={() => handleNavigation("EngagementModels")}
            >
              Engagement Models
            </NavItem>

            <NavItem
              active={selectedComponent === "ResourceAdmin"}
              onClick={() => handleNavigation("ResourceAdmin")}
            >
              Blog and Resources
            </NavItem>

            <NavItem
              active={selectedComponent === "ExpertsAdmin"}
              onClick={() => handleNavigation("ExpertsAdmin")}
            >
              Experts
            </NavItem>
          </NavList>
        </Sidebar>

        {/* CONTENT */}
        <Content>{renderComponent()}</Content>
      </Layout>

      {/* MOBILE TOGGLE */}
      {!sidebarOpen && (
        <SidebarToggle onClick={() => setSidebarOpen(true)}>
          ☰
        </SidebarToggle>
      )}

      {/* BACKDROP */}
      {sidebarOpen && <Backdrop onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default SideBar;
