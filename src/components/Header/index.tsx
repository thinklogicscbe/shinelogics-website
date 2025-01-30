import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { SvgIcon } from "../../common/SvgIcon";


import {
  HeaderSection,
  LogoContainer,
  Burger,
  NavLinks,
  StyledButton,
  DropdownWrapper,
  DropdownContent,
  DropdownArrow,
  DropdownWrapperMobile,
  StyledButton1,
} from "./styles";

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);
  const [, setIsMobile] = useState(window.innerWidth <= 768); // Track if the screen is mobile

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  // Cleanup on component unmount
  return () => window.removeEventListener("resize", handleResize);
}, []);

const toggleDrawer = () => {
  setVisibility(!visible);
  setMobileDropdownVisible(false); // Close dropdown when the drawer is toggled
};

const showDropdown = () => {
  setDropdownVisible(true);
};

const hideDropdown = () => {
  setDropdownVisible(false);
};

const handleLinkClick = (path: string) => {
  setActiveLink(path);
  setVisibility(false); // Close drawer after link click
  setMobileDropdownVisible(false); // Close dropdown after link click
};

const handleMobileDropdownToggle = () => {
  setMobileDropdownVisible(!mobileDropdownVisible);
};

const navigationLinks = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/service", label: "Service" },
  { path: "/product", label: "Product", hasDropdown: true },
  { path: "/career", label: "Career" },
  { path: "/contact", label: "Contact" },
];

const productDropdownLinks = [
  { path: "/productcompo/erp", label: "ERP (Enterprise Resource Planning)" },
  { path: "/productcompo/ems", label: "EMS (Employee Management System)" },
  { path: "/productcompo/e-commerce", label: "ECOMMERCE" },
];

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <SvgIcon  src="shinelogics-logo.svg" width="300px" height="60px" />
        
      </LogoContainer>

      <Burger onClick={toggleDrawer}>
        <div />
        <div />
        <div />
      </Burger>

      {/* Desktop Navigation */}
      <NavLinks>
        {navigationLinks.map((link) => (
          <div
            key={link.path}
            onMouseEnter={link.hasDropdown ? showDropdown : undefined}
            onMouseLeave={link.hasDropdown ? hideDropdown : undefined}
            style={{ position: "relative" }}
          >
            <NavLink
              to={link.path}
              onClick={(e) => {
                if (link.path === "/product") {
                  e.preventDefault();
                } else {
                  handleLinkClick(link.path);
                }
              }}
            >
              <StyledButton
                className={activeLink === link.path ? "active" : ""}
              >
                {link.label}
              </StyledButton>
            </NavLink>
            {link.hasDropdown && dropdownVisible && (
              <DropdownWrapper className={dropdownVisible ? "visible" : ""}>
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <NavLink
                    key={sublink.path}
                    to={sublink.path}
                    onClick={() => handleLinkClick(sublink.path)}
                  >
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </NavLink>
                ))}
              </DropdownWrapper>
            )}
          </div>
        ))}
      </NavLinks>

      {/* Mobile Drawer */}
      <Drawer
        closable={false}
        open={visible}
        onClose={toggleDrawer}
        placement="right"
        style={{ width: "300px" }}
      >
        {navigationLinks.map((link) => (
          <div key={link.path} style={{ position: "relative" }}>
            <NavLink to={link.path}>
              <StyledButton1
                className={activeLink === link.path ? "active" : ""}
                onClick={(e) => {
                  if (link.path === "/product") {
                    e.preventDefault();
                    handleMobileDropdownToggle(); 
                  } else {
                    handleLinkClick(link.path);
                    toggleDrawer(); 
                  }
                }}
              >
                {link.label}
              </StyledButton1>
            </NavLink>
            {link.hasDropdown && mobileDropdownVisible && (
              <DropdownWrapperMobile className={mobileDropdownVisible ? "visible" : ""}>
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <div
                    key={sublink.path}
                    onClick={() => {
                      handleLinkClick(sublink.path);
                      toggleDrawer(); 
                    }}
                  >
                    <NavLink to={sublink.path}>
                      <DropdownContent>{sublink.label}</DropdownContent>
                    </NavLink>
                  </div>
                ))}
              </DropdownWrapperMobile>
            )}
          </div>
        ))}
      </Drawer>
    </HeaderSection>
  );
};

export default Header;
