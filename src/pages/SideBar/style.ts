import styled from "styled-components";

/* ===== LAYOUT ===== */
export const Layout = styled.div`
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 260px 1fr;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== HEADER ===== */
export const Header = styled.header`
  grid-column: 1 / -1;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1200;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 150px;
`;

export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

/* ===== SIDEBAR ===== */
export const Sidebar = styled.aside<{ open: boolean }>`
  background: linear-gradient(180deg, #020617, #0f172a);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* DESKTOP */
  @media (min-width: 1025px) {
    position: relative;
  }

  /* MOBILE */
  @media (max-width: 1024px) {
    position: fixed;
    top: 64px;
    left: 0;
    width: 260px;
    height: calc(100vh - 64px);
    transform: ${({ open }) =>
      open ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.35s ease;
    z-index: 1100;
  }
`;

export const SidebarHeader = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    color: white;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
`;

/* ===== NAV LIST (SCROLLABLE) ===== */
export const NavList = styled.ul`
  list-style: none;
  padding: 12px 0;
  margin: 0;

  flex: 1;
  overflow-y: auto;

  /* custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const NavItem = styled.li<{ active?: boolean }>`
  padding: 14px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#ffffff" : "#c7d2fe")};

  background: ${({ active }) =>
    active ? "rgba(99,102,241,0.15)" : "transparent"};

  border-left: 4px solid
    ${({ active }) => (active ? "#6366f1" : "transparent")};

  transition: all 0.25s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.15);
    color: #ffffff;
  }
`;

/* ===== CONTENT ===== */
export const Content = styled.main`
  background: #f8fafc;
  padding: 28px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    padding-left: 80px;
  }

  @media (max-width: 640px) {
    padding: 20px 16px 20px 80px;
  }
`;

/* ===== BACKDROP ===== */
export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1000;

  @media (min-width: 1025px) {
    display: none;
  }
`;

/* ===== MOBILE TOGGLE ===== */
export const SidebarToggle = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 74px;
    left: 16px;

    width: 46px;
    height: 46px;
    border-radius: 12px;

    background: linear-gradient(135deg, #4f46e5, #6366f1);
    color: white;
    border: none;
    font-size: 22px;

    align-items: center;
    justify-content: center;
    cursor: pointer;

    z-index: 1201;
    box-shadow: 0 10px 30px rgba(79, 70, 229, 0.5);
  }
`;
