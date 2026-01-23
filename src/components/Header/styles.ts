import styled from "styled-components";
import { NavLink } from "react-router-dom";

/* ================= HEADER ================= */


export const AsAText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #020617;

  margin: 0 2px;

  cursor: default;
  user-select: none;
  white-space: nowrap;

  display: flex;           /* 🔥 IMPORTANT */
  align-items: center;     /* 🔥 IMPORTANT */
  height: 40px;            /* 🔥 MATCH button height */
  line-height: 1;

  &.pas-as-a {
    margin: 0 2px;
  }

    /* 🔥 HIDE "as a" ON MOBILE */
  @media (max-width: 768px) {
    display: none;
  }
`;


export const HeaderSection = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  align-items: center; /* 🔥 key */
  justify-content: space-between;

  min-height: 80px; /* ✅ consistent height */

  background-color: #ffffff;
  padding: 0 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    min-height: 64px;
    padding: 0 15px;
  }
`;


/* ================= NAV LINKS ================= */

export const ActiveLink = styled(NavLink)`
  font-size: 15px;
  font-weight: 700;
  color: #020617;
  text-decoration: none;

  margin-left: 20px; /* keep horizontal spacing only */

  display: flex;
  align-items: center; /* 🔥 vertically centered */

  &.active {
    color: #166534;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 5px;
  }

  &:hover {
    color: #166534;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 5px;
  }
`;


/* ================= LOGO ================= */

export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%; /* 🔥 match header */
  max-width: 240px;
  padding: 0;

  img {
    max-height: 56px; /* 🔥 control image, not container */
    width: auto;
    object-fit: contain;
    display: block;
    margin-bottom: 10px
  }

  @media (max-width: 768px) {
    img {
      max-height: 40px;
    }
  }
`;


/* ================= BURGER ================= */

export const Burger = styled.div`
  cursor: pointer;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;

  div {
    background-color: #020617;
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

/* ================= DESKTOP NAV ================= */

export const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ================= BUTTONS ================= */

export const StyledButton = styled.button`
  background: none;
  border: none;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  padding: 10px 16px;
  border-radius: 10px;
  margin-left: 20px;

  color: #020617;
  transition: all 0.25s ease;


    &.pas-button {
    margin-left: 4px;     /* 🔥 tight ONLY for Products & Service */
    padding-left: 6px;
    padding-right: 6px;
  }


  .main-label {
    pointer-events: auto; /* dropdown works here */
  }

  .suffix {
    margin-left: 5px;
    font-size: 15px;
    font-weight: 700;
    color: #64748b;
    pointer-events: none; /* 🔥 NOT clickable */
  }

  &:hover {
    color: #1d4ed8;
  }

  &.active {
    color: #1d4ed8;
    font-weight: 700;
  }

  &.nav-button {
    background: #e5e7eb;
    font-weight: 700;
  }

  &.nav-button:hover {
    background: #c7d2fe;
  }

  &.primary {
    background: #2563eb;
    color: white;
    font-weight: 700;
  }

  &.primary:hover {
    background: #1d4ed8;
  }
`;

/* ================= DROPDOWN (DESKTOP) ================= */

export const DropdownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;

  background-color: #ffffff;
  width: 220px;
  border-radius: 10px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.12);

  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.25s ease, transform 0.25s ease;

  &.visible {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropdownContent = styled.div`
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #020617;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
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
  border-bottom: 6px solid #ffffff;
`;

/* ================= MOBILE NAV ================= */

export const MobileNavItem = styled.div`
  padding: 16px;
  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 600;
  color: #020617;

  cursor: pointer;
  border-radius: 14px;
  transition: all 0.25s ease;

    .main-label {
    pointer-events: auto; /* dropdown trigger */
  }

  .suffix {
    margin-left: 6px;
    font-size: 15px;
    font-weight: 700;
    color: #64748b;
    pointer-events: none; /* 🔥 NOT clickable */
  }

  &:hover {
    background: #f1f5f9;
  }

  &.active {
    font-weight: 700;
    color: #1d4ed8;
  }

  &.nav-button {
    background: #f1f5f9;
    font-weight: 700;
  }

  &.primary {
    background: #2563eb;
    color: white;
    font-weight: 700;
  }

  &.primary:hover {
    background: #1d4ed8;
  }
`;

/* ================= MOBILE DROPDOWN ================= */

export const MobileDropdown = styled.div`
  margin-left: 14px;
  margin-top: 6px;
  margin-bottom: 12px;

  border-left: 3px solid #e5e7eb;
  padding-left: 14px;
`;

export const MobileDropdownItem = styled.div`
  padding: 12px 14px;
  font-size: 15px;
  font-weight: 600;
  color: #334155;

  cursor: pointer;
  border-radius: 8px;
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
