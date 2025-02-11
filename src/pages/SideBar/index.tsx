import { useState } from "react";
import {
    SidebarContainer,
    CloseButton,
    Backdrop,
    List,
    ListItem,
    ContentWrapper
} from "./style";

// Import the components
import ViewProfile from "../ViewProfile";
import PostJob from "../PostJob";
import ViewJobs from "../ViewJobs";

const SideBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedComponent, setSelectedComponent] = useState<string>("");

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleNavigation = (component: string) => {
        console.log("Navigating to:", component);
        setSelectedComponent(component);
        setOpen(false); // Close sidebar after navigation
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case "ViewJobs":
                return <ViewJobs />;
            case "PostJob":
                return <PostJob />;
            case "ViewResumes":
                return <ViewProfile />;
            default:
                return <div>Welcome to the Dashboard</div>;
        }
    };

    return (
        <>
            {/* Sidebar Drawer */}
            <SidebarContainer open={open}>
                {/* Close Button inside Sidebar */}
                <CloseButton onClick={toggleDrawer}>✖</CloseButton>

                <List>
                    <ListItem onClick={() => handleNavigation("PostJob")}>Post Job</ListItem>
                    <ListItem onClick={() => handleNavigation("ViewJobs")}>View Jobs</ListItem>
                    <ListItem onClick={() => handleNavigation("ViewResumes")}>View Resumes</ListItem>
                </List>
            </SidebarContainer>

            {/* Backdrop */}
            {open && <Backdrop onClick={toggleDrawer} />}

            {/* Main Content Area */}
            <ContentWrapper>
                {renderComponent()} {/* Render selected component */}
            </ContentWrapper>
        </>
    );
};

export default SideBar;
