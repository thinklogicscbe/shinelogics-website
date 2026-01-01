import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderSection = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensures vertical alignment */
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column; 
    padding: 15px;
    text-align: left;
    align-items: flex-start; /* Align left for mobile */
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;


export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  margin-bottom: 10px;
  padding: 0.25rem 0.75rem;

  /* Increase navbar logo area */
  height: 40px;
  max-width: 240px;

  img {
    margin-top: 10px;
    max-height: 220px;   /* 🔥 bigger logo */
    width: auto;
    max-width: 100%;
    object-fit: contain;
    display: block;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    height: 64px;

    img {
      max-height: 52px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    height: 56px;
    max-width: 200px;

    img {
      max-height: 160px;
    }
  }
`;






export const Burger = styled.div`
  cursor: pointer;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;

  div {
    background-color: #333;
    width: 100%;
    height: 3px;
    border-radius: 2px;
  }

  @media (max-width: 932px) {
    display: flex; 
    position: absolute;
    right: 25px; 
    top: 30px; 
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 8px;
  color: #0f172a;
  transition: all 0.25s ease;
  margin-left : 20px;

  &:hover {
    color: #2563eb;
  }

  &.active {
    color: #2563eb;
  }

  &.nav-button {
    background: #e5e7eb;
    font-weight: 600;
  }

  &.nav-button:hover {
    background: #c7d2fe;
    transform: translateY(-1px);
  }

  &.primary {
    background: #2563eb;
    color: white;
  }

  &.primary:hover {
    background: #1d4ed8;
  }
`;

export const StyledButton1 = styled.span`
  padding: 10px 15px;
  font-size: 16px;
  color: #333;

  .active & {
    font-weight: bold;
    color: #007bff;
  }
`;

export const DropdownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  width: 200px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.visible {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;
export const DropdownWrapperMobile = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;

  &.visible {
    display: block;
  }
`;

export const DropdownArrow = styled.div`
  position: absolute;
  top: -6px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
`;

export const DropdownContent = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

/* ================= MOBILE NAV ================= */

export const MobileNavItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  &.nav-button {
    background: #e5e7eb;
    font-weight: 600;
    margin: 8px 0;
    text-align: center;
  }

  &.primary {
    background: #2563eb;
    color: white;
  }
`;


/* ================= MOBILE DROPDOWN ================= */

export const MobileDropdown = styled.div`
  margin-left: 12px;
  margin-top: 6px;
  margin-bottom: 10px;

  border-left: 3px solid #e5e7eb;
  padding-left: 12px;
`;

export const MobileDropdownItem = styled.div`
  padding: 10px 12px;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
  border-radius: 6px;

  transition: all 0.25s ease;

  &:hover {
    background: #e0e7ff;
    color: #1e40af;
  }
`;

/* ================= DRAWER HEADER ================= */

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

/* ================= CLOSE ICON ================= */

export const CloseIcon = styled.span`
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  color: #020617;

  padding: 6px 10px;
  border-radius: 50%;

  transition: all 0.25s ease;

  &:hover {
    background: #e5e7eb;
    color: #2563eb;
  }
`;






