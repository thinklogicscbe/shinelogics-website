import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  background-color: #1e293b; /* Dark navy background */
  color: #ffffff; /* White text for readability */
  width: 22rem;
  padding: 2.5rem;
  height: 100vh;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border-right: 2px solid rgba(255, 255, 255, 0.2); /* Subtle border */

  @media (max-width: 768px) {
    display: none;
  }

  h2{

  font-size: 1.6rem
 
  
  }
`;


export const MobileSidebar = styled.div`
  background-color: #1e293b;
  color: white;
  width: 20rem;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: block;

  &.active {
    transform: translateX(0);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  margin-top: 2rem;
`;

export const NavItem = styled.li`
  list-style: none;
  margin-bottom: 1.2rem;
`;

export const NavLink = styled.a`
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background-color: #475569;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
  height: 100vh;
  background-color: #ffffff;
`;

export const Header = styled.header`
  background-color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e8f0;
`;

export const HeaderLeft = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;
  align-items: center;
`;

export const ToggleButton = styled.button`
  padding: 1rem;
  background-color: #1e293b;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #374151;
  }
`;

export const Main = styled.main`
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 80vh;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FormContainer = styled.form`
  display: flex;
  gap: 3rem;
`;

export const FormColumn = styled.div`
  flex: 1;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: #1e293b;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #374151;
  }
`;
