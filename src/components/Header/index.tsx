import { useState } from "react";
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
  StyledButton1
} from "./styles";

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDrawer = () => {
    setVisibility(!visible);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setVisibility(false);
  };

  const handleDropdownLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(true);
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/service", label: "Service" },
    { path: "/product", label: "Product", hasDropdown: true },
    { path: "/contact", label: "Contact" },
  ];

  const productDropdownLinks = [
    { path: "/product", label: "ERP(Enterprise resource planning)" },
    { path: "/product", label: "Category 2" },
    { path: "/product", label: "Category 3" },
  ];

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <SvgIcon src="logo.svg" width="300px" height="60px" />
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
            {link.hasDropdown && (
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
          <div
            key={link.path}
            onMouseEnter={link.hasDropdown ? showDropdown : undefined}
            onMouseLeave={link.hasDropdown ? hideDropdown : undefined}
            style={{ position: "relative" }}
          >
            <NavLink to={link.path}>
              <StyledButton1
                className={activeLink === link.path ? "active" : ""}
                onClick={(e) => {
                  if (link.path === "/product") {
                    e.preventDefault();
                  } else {
                    if (!link.hasDropdown) {
                      handleLinkClick(link.path);
                      toggleDrawer();
                    }
                  }
                }}
              >
                {link.label}
              </StyledButton1>
            </NavLink>
            {link.hasDropdown && (
              <DropdownWrapperMobile
                className={dropdownVisible ? "visible" : "hidden"}
              >
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <div
                    key={sublink.path}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownLinkClick(e);
                      handleLinkClick(sublink.path);
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
