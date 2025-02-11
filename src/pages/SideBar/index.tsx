import { useState } from "react";
import {
    SidebarContainer,
   
    CloseButton,
    Backdrop,
    List,
    ListItem,
    ContentWrapper

   
} from "./style";

  // Import the ViewJobs component
import ViewProfile from "../ViewProfile";
import PostJob from "../PostJob";
import ViewJobs from "../ViewJobs";

const SideBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedComponent, setSelectedComponent] = useState<string>(""); // State to track the selected component

    const toggleDrawer = () => {
        setOpen(!open);
    };

   const handleNavigation = (component: string) => {
    console.log("Navigating to:", component);
    setSelectedComponent(component);
    setOpen(false);
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
                return <div>Welcome to the Dashboard</div>; // Default content
        }
    };

    return (
        <>
            {/* Burger Icon (Only for mobile/tablet, positioned below navbar) */}
            {/* <MenuButton onClick={toggleDrawer} open={open}>☰</MenuButton> */}

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

            {/* Backdrop for overlay effect (only for mobile view) */}
            {open && <Backdrop onClick={toggleDrawer} />}

            {/* Main Content Area */}

            <ContentWrapper>
            {renderComponent()}  {/* Render the selected component dynamically */}

            </ContentWrapper>
            
           
                 
                
           
        </>
    );
};

export default SideBar;
