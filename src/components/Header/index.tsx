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
  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [insightDropdownVisible, setInsightDropdownVisible] = useState(false);
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);
  const [, setIsMobile] = useState(window.innerWidth <= 768); // Track if the screen is mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setVisibility(!visible);
    setMobileDropdownVisible(false);
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setVisibility(false);
    setMobileDropdownVisible(false);
    setProductDropdownVisible(false);
    setInsightDropdownVisible(false);
  };

  // Product Dropdown Handlers
  const showProductDropdown = () => {
    setProductDropdownVisible(true);
    setInsightDropdownVisible(false);
  };
  const hideProductDropdown = () => {
    setProductDropdownVisible(false);
  };

  // Insight Dropdown Handlers
  const showInsightDropdown = () => {
    setInsightDropdownVisible(true);
    setProductDropdownVisible(false);
  };
  const hideInsightDropdown = () => {
    setInsightDropdownVisible(false);
  };

  // Mobile Dropdown Toggle
  const handleMobileDropdownToggle = () => {
    setMobileDropdownVisible(!mobileDropdownVisible);
  };

  const navigationLinks = [
    { path: "/product", label: "Product", hasDropdown: true, showDropdown: showProductDropdown, hideDropdown: hideProductDropdown },
    { path: "/service", label: "Service" },
    { path: "/career", label: "Insights", hasDropdown: true, showDropdown: showInsightDropdown, hideDropdown: hideInsightDropdown },
    { path: "/about", label: "About" },
  ];

  const productDropdownLinks = [
    { path: "/productcompo/erp", label: "ERP (Enterprise Resource Planning)" },
    { path: "/productcompo/ems", label: "EMS (Employee Management System)" },
    { path: "/productcompo/e-commerce", label: "ECOMMERCE" },
  ];

  const insightDropdownLinks = [
    { path: "/career", label: "Career" },
    { path: "/productEngineering", label: "Product Engineering" },
    { path: "/resourseEngineering", label: "Resourse Engineering" },
  ];

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <SvgIcon src="shinelogics-logo.svg" width="300px" height="60px" />
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
            onMouseEnter={link.hasDropdown ? link.showDropdown : undefined}
            onMouseLeave={link.hasDropdown ? link.hideDropdown : undefined}
            style={{ position: "relative" }}
          >
            <NavLink to={link.path} onClick={(e) => link.hasDropdown && e.preventDefault()}>
              <StyledButton className={activeLink === link.path ? "active" : ""}>
                {link.label}
              </StyledButton>
            </NavLink>

            {/* Product Dropdown */}
            {link.path === "/product" && productDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <NavLink key={sublink.path} to={sublink.path} onClick={() => handleLinkClick(sublink.path)}>
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </NavLink>
                ))}
              </DropdownWrapper>
            )}

            {/* Insights Dropdown */}
            {link.path === "/career" && insightDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {insightDropdownLinks.map((sublink) => (
                  <NavLink key={sublink.path} to={sublink.path} onClick={() => handleLinkClick(sublink.path)}>
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </NavLink>
                ))}
              </DropdownWrapper>
            )}
          </div>
        ))}
      </NavLinks>

      {/* Mobile Drawer */}
      <Drawer closable={false} open={visible} onClose={toggleDrawer} placement="right" style={{ width: "300px" }}>
        {navigationLinks.map((link) => (
          <div key={link.path} style={{ position: "relative" }}>
            <NavLink to={link.path}>
              <StyledButton1
                className={activeLink === link.path ? "active" : ""}
                onClick={(e) => {
                  if (link.hasDropdown) {
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

            {/* Mobile Product Dropdown */}
            {link.path === "/product" && mobileDropdownVisible && (
              <DropdownWrapperMobile className="visible">
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <NavLink key={sublink.path} to={sublink.path} onClick={() => handleLinkClick(sublink.path)}>
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </NavLink>
                ))}
              </DropdownWrapperMobile>
            )}

            {/* Mobile Insights Dropdown */}
            {link.path === "/career" && mobileDropdownVisible && (
              <DropdownWrapperMobile className="visible">
                <DropdownArrow />
                {insightDropdownLinks.map((sublink) => (
                  <NavLink key={sublink.path} to={sublink.path} onClick={() => handleLinkClick(sublink.path)}>
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </NavLink>
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
