// import { useState } from "react";
// import { Row, Col, Drawer } from "antd";
// import { withTranslation, TFunction } from "react-i18next";
// import Container from "../../common/Container";
// import { SvgIcon } from "../../common/SvgIcon";
// import { Button } from "../../common/Button";
// import Home from "../home/home";  
// import {
//   HeaderSection,
//   LogoContainer,
//   Burger,
//   NotHidden,
//   Menu,
//   CustomNavLinkSmall,
//   Label,
//   Outline,
//   Span,
// } from "./styles";

// const Header = ({ t }: { t: TFunction }) => {
//   const [visible, setVisibility] = useState(false);

//   const toggleButton = () => {
//     setVisibility(!visible);
//   };

//   const MenuItem = () => {
//     const scrollTo = (id: string) => {
//       const element = document.getElementById(id) as HTMLDivElement;
//       element.scrollIntoView({
//         behavior: "smooth",
//       });
//       setVisibility(false);
//     };
//     return (
//       <>
//         <CustomNavLinkSmall onClick={() => scrollTo("about")}>
//           <Span>{t("About")}</Span>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
//           <Span>{t("Mission")}</Span>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall onClick={() => scrollTo("product")}>
//           <Span>{t("Product")}</Span>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall
//           style={{ width: "180px" }}
//           onClick={() => scrollTo("contact")}
//         >
//           <Span>
//             <Button>{t("Contact")}</Button>
//           </Span>
//         </CustomNavLinkSmall>
//       </>
//     );
//   };

//   return (
//     <HeaderSection>
//       <Container>
//         <Row justify="space-between">
//           <LogoContainer to="/" aria-label="homepage">
//             <SvgIcon src="logo.svg" width="101px" height="64px" />
//           </LogoContainer>
//           <NotHidden>
//             <MenuItem />
//           </NotHidden>
//           <Burger onClick={toggleButton}>
//             <Outline />
//           </Burger>
//         </Row>
//         <Drawer closable={false} open={visible} onClose={toggleButton}>
//           <Col style={{ marginBottom: "2.5rem" }}>
//             <Label onClick={toggleButton}>
//               <Col span={12}>
//                 <Menu>Menu</Menu>
//               </Col>
//               <Col span={12}>
//                 <Outline />
//               </Col>
//             </Label>
//           </Col>
//           <MenuItem />
//         </Drawer>
//       </Container>

//       <Home />

//     </HeaderSection>
//   );
// };

// export default withTranslation()(Header);


// import { NavLink } from "react-router-dom";
// import { Row, Col, Drawer } from "antd";
// import { useState } from "react";
// import { SvgIcon } from "../../common/SvgIcon";
// import { Button } from "../../common/Button";
// import {
//   HeaderSection,
//   LogoContainer,
//   Burger,
//   NotHidden,
//   CustomNavLinkSmall,
//   Outline,
// } from "./styles";

// const Header = () => {
//   const [visible, setVisibility] = useState(false);

//   const toggleDrawer = () => {
//     setVisibility(!visible);
//   };

//   return (
//     <HeaderSection>
//       <Row justify="space-between">
//         <LogoContainer to="/" aria-label="homepage">
//           <SvgIcon src="logo.svg" width="101px" height="64px" />
//         </LogoContainer>
//         <NotHidden>
//           <NavLink to="/about">
//             <Button>About</Button>
//           </NavLink>
//           <NavLink to="/mission">
//             <Button>Mission</Button>
//           </NavLink>
//           <NavLink to="/product">
//             <Button>Product</Button>
//           </NavLink>
//           <NavLink to="/contact">
//             <Button>Contact</Button>
//           </NavLink>
//         </NotHidden>
//         <Burger onClick={toggleDrawer}>
//           <Outline />
//         </Burger>
//       </Row>
//       <Drawer closable={false} open={visible} onClose={toggleDrawer}>
//         <CustomNavLinkSmall onClick={toggleDrawer}>
//           <NavLink to="/about">About</NavLink>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall onClick={toggleDrawer}>
//           <NavLink to="/mission">Mission</NavLink>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall onClick={toggleDrawer}>
//           <NavLink to="/product">Product</NavLink>
//         </CustomNavLinkSmall>
//         <CustomNavLinkSmall onClick={toggleDrawer}>
//           <NavLink to="/contact">Contact</NavLink>
//         </CustomNavLinkSmall>
//       </Drawer>
//     </HeaderSection>
//   );
// };

// export default Header;


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

  // Toggle Drawer visibility
  const toggleDrawer = () => {
    setVisibility(!visible);
  };

  // Navigation Links
  const navigationLinks = [
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
      {/* Desktop Navigation */}
      <NotHidden>
        {navigationLinks.map((link) => (
          <NavLink key={link.path} to={link.path}>
            <Button>{link.label}</Button>
          </NavLink>
        ))}
      </NotHidden>
      {/* Mobile Navigation Toggle */}
      <Burger onClick={toggleDrawer}>
        <Outline />
      </Burger>
      {/* Drawer for Mobile Navigation */}
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

