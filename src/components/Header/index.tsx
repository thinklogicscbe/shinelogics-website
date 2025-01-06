import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  CustomNavLinkSmall,
  Outline,
  DrawerNavWrapper,
} from "./styles";

const Header = () => {
  const [visible, setVisibility] = useState(false);

  const toggleDrawer = () => {
    setVisibility(!visible);
  };

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/mission", label: "Mission" },
    { path: "/product", label: "Product" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <SvgIcon src="logo.svg" width="101px" height="64px" />
      </LogoContainer>
      <NotHidden>
        {navigationLinks.map((link) => (
          <NavLink key={link.path} to={link.path}>
            <Button>{link.label}</Button>
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
            <NavLink key={link.path} to={link.path} onClick={toggleDrawer}>
              {link.label}
            </NavLink>
          ))}
        </DrawerNavWrapper>
      </Drawer>

    </HeaderSection>
  );
};

export default Header;

