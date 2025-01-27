import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e5e7eb;
`;

export const Sidebar = styled.aside`
  background-color: #1e293b; /* Dark slate background */
  color: white;
  width: 20rem;
  padding: 2rem;
  display: block;
  box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 18rem;
  }
  @media (max-width: 768px) {
    display: none; /* Hidden on smaller screens */
  }
`;

export const MobileSidebar = styled.div`
  background-color: #1e293b; /* Dark slate background */
  color: white;
  width: 18rem;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50; /* Ensure it stays above content */
  display: none;
  box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Nav = styled.nav``;

export const NavItem = styled.li`
  margin-bottom: 1rem;
`;

export const NavLink = styled.a`
  display: block;
  padding: 1rem;
  border-radius: 0.375rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    background-color: #475569; /* Slightly lighter hover effect */
  }

  @media (max-width: 425px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
  @media (max-width: 375px) {
    font-size: 0.9rem;
    padding: 0.7rem;
  }
  @media (max-width: 320px) {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem; /* Adjust padding for mobile */
  }
`;

export const Header = styled.header`
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 1024px) {
    padding: 1.2rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 425px) {
    padding: 0.8rem;
  }
`;

export const HeaderLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;

  @media (max-width: 425px) {
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1rem;
  color: #64748b;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  @media (max-width: 425px) {
    gap: 1rem;
    font-size: 0.9rem;
  }
  @media (max-width: 320px) {
    gap: 0.8rem;
    font-size: 0.8rem;
  }
`;

export const Main = styled.main`
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 425px) {
    padding: 0.8rem;
  }
  @media (max-width: 375px) {
    padding: 0.6rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1e293b;

  @media (max-width: 425px) {
    font-size: 1.8rem;
  }
  @media (max-width: 375px) {
    font-size: 1.6rem;
  }
  @media (max-width: 320px) {
    font-size: 1.4rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
  @media (max-width: 375px) {
    font-size: 1rem;
  }
  @media (max-width: 320px) {
    font-size: 0.9rem;
  }
`;

// Paragraph text
export const Paragraph = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;

  @media (max-width: 425px) {
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

export const ToggleButton = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 0.375rem;
  background-color: #1e293b;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #374151; /* Slight hover effect */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for mobile */
    padding: 0.7rem 1rem; /* Adjust padding for header alignment */
  }
`;

