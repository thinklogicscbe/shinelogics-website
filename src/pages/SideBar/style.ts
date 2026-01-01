import styled from "styled-components";

/* ===== LAYOUT ===== */
export const Layout = styled.div`
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 240px 1fr;
  height: 100vh;

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
  z-index: 1001;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 150px;
`;

export const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;

/* ===== SIDEBAR ===== */
export const Sidebar = styled.aside<{ open: boolean }>`
  background: #0f172a;
  padding: 20px 0;

  @media (max-width: 1024px) {
    position: fixed;
    top: 64px;
    left: 0;
    width: 260px;
    height: calc(100vh - 64px);
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease;
    z-index: 1001; /* ✅ BELOW MODAL, ABOVE CONTENT */
  }
`;


export const SidebarHeader = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
    color: white;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
`;

/* ===== NAV ===== */
export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li<{ active?: boolean }>`
  padding: 14px 24px;
  cursor: pointer;
  font-size: 15px;
  color: ${({ active }) => (active ? "#ffffff" : "#cbd5f5")};
  background: ${({ active }) => (active ? "#1e293b" : "transparent")};
  border-left: ${({ active }) => (active ? "4px solid #6366f1" : "4px solid transparent")};

  &:hover {
    background: #1e293b;
    color: white;
  }
`;

/* ===== CONTENT ===== */
export const Content = styled.main`
  background: #f8fafc;
  padding: 32px;
  overflow-y: auto;

  /* ✅ Mobile fix: leave space for burger */
  @media (max-width: 1024px) {
    padding-left: 72px;
  }

  @media (max-width: 640px) {
    padding: 20px 16px 20px 72px;
  }
`;



/* ===== BACKDROP ===== */
export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;

  @media (min-width: 1025px) {
    display: none;
  }
`;


/* ===== MOBILE TOGGLE BUTTON ===== */
export const SidebarToggle = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;

    /* ✅ BELOW HEADER, NOT OVER CONTENT */
    top: 72px;          /* header height (64px) + spacing */
    left: 16px;

    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #4f46e5;
    color: white;
    border: none;
    font-size: 22px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1100;
  }
`;


