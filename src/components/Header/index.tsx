import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  DrawerNavWrapper,
  StyledButton,
  Outline,
} from "./styles";

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleDrawer = () => {
    setVisibility(!visible);
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/service", label: "Service" },
    { path: "/product", label: "Product" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <SvgIcon src="logo.svg" width="300px" height="60px" />
      </LogoContainer>
      <NotHidden>
        {navigationLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => handleLinkClick(link.path)} // Set active link on click
          >
            <StyledButton className={activeLink === link.path ? "active" : ""}>
              {link.label}
            </StyledButton>
          </NavLink>
        ))}
      </NotHidden>
      <Burger onClick={toggleDrawer}>
        <Outline />
      </Burger>
      <Drawer
        closable={false}
        open={visible}
        onClose={toggleDrawer}
        placement="right"
      >
        <DrawerNavWrapper>
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => {
                handleLinkClick(link.path);
                toggleDrawer();
              }}
            >
              <StyledButton className={activeLink === link.path ? "active" : ""}>
                {link.label}
              </StyledButton>
            </NavLink>
          ))}
        </DrawerNavWrapper>
      </Drawer>
    </HeaderSection>
  );
};

export default Header;
