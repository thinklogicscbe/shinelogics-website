import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    SidebarContainer,
    CloseButton,
    Backdrop,
    List,
    ListItem,
    ContentWrapper,
    LogoutButtonWrapper,
    LogoutButton,
    LogoWrapper,
    LogoImage,
    LogoText,
    Header
} from "./style";

// Import the components
import ViewProfile from "../ViewProfile";
import PostJob from "../PostJob";
import ViewJobs from "../ViewJobs";
import Dashboard from "../Dashboard";

const SideBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    // Retrieve the stored component from local storage
    const [selectedComponent, setSelectedComponent] = useState<string>(
        localStorage.getItem("selectedComponent") || "Dashboard"
    );

    // Toggle Sidebar Drawer
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Handle navigation and store the selected component
    const handleNavigation = (component: string) => {
        console.log("Navigating to:", component);
        setSelectedComponent(component);
        localStorage.setItem("selectedComponent", component); // Store in local storage
        setOpen(false); // Close sidebar after navigation
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("selectedComponent"); // Clear selected component on logout
        navigate("/login");
    };

    // Render the selected component
    const renderComponent = () => {
        switch (selectedComponent) {
            case "ViewJobs":
                return <ViewJobs />;
            case "PostJob":
                return <PostJob />;
            case "ViewResumes":
                return <ViewProfile />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <>
            {/* Fixed Header */}
            <Header>
                <LogoWrapper>
                    <LogoImage src="/Group 450 (1).png" alt="Logo" />
                    <LogoText>Company Name</LogoText>
                </LogoWrapper>
                <LogoutButtonWrapper>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </LogoutButtonWrapper>
            </Header>

            {/* Sidebar Drawer */}
            <SidebarContainer open={open}>
                <CloseButton onClick={toggleDrawer}>✖</CloseButton>

                <List>
                    <ListItem onClick={() => handleNavigation("Dashboard")}>Dashboard</ListItem>
                    <ListItem onClick={() => handleNavigation("PostJob")}>Post Job</ListItem>
                    <ListItem onClick={() => handleNavigation("ViewJobs")}>View Jobs</ListItem>
                    <ListItem onClick={() => handleNavigation("ViewResumes")}>View Resumes</ListItem>
                </List>
            </SidebarContainer>

            {/* Backdrop */}
            {open && <Backdrop onClick={toggleDrawer} />}

            {/* Main Content Area */}
            <ContentWrapper>{renderComponent()}</ContentWrapper>
        </>
    );
};

export default SideBar;
