import React, { useState, useEffect } from "react";
import {
  Container,
  Sidebar,
  Nav,
  NavItem,
  NavLink,
  MobileSidebar,
  MainContent,
  Header,
  HeaderLeft,
  HeaderRight,
  ToggleButton,
  Main,
  Title,
  Subtitle,
  Paragraph,
} from "./style";

const ADMIN: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize to detect mobile view dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {/* Sidebar */}
      {!isMobile && (
        <Sidebar>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            Admin Dashboard
          </h2>
          <Nav>
            <ul>
              <NavItem>
                <NavLink href="#">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
            </ul>
          </Nav>
        </Sidebar>
      )}

      {/* Mobile Sidebar */}
      {isMenuOpen && isMobile && (
        <MobileSidebar>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            Admin Dashboard
          </h2>
          <Nav>
            <ul>
              <NavItem>
                <NavLink href="#">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
            </ul>
          </Nav>
        </MobileSidebar>
      )}

      {/* Main Content Area */}
      <MainContent>
        {/* Header */}
        <Header>
          <HeaderLeft>Welcome, Admin</HeaderLeft>
          <HeaderRight>
            <span>John Doe</span>
            <span>Notifications</span>
            <span>Logout</span>
            {isMobile && (
              <ToggleButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? "Close Menu" : "Open Menu"}
              </ToggleButton>
            )}
          </HeaderRight>
        </Header>

        {/* Main Content */}
        <Main>
          <Title>Dashboard Overview</Title>
          <Subtitle>Recent Activity</Subtitle>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec arcu nec
            odio feugiat ultricies. Donec nec tortor vitae ante interdum tincidunt.
            Vestibulum euismod sapien et cursus scelerisque.
          </Paragraph>
        </Main>
      </MainContent>
    </Container>
  );
};

export default ADMIN;
