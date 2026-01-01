import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";

// import { SvgIcon } from "../../common/SvgIcon";

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
  MobileNavItem,
  MobileDropdown,
  MobileDropdownItem,
  DrawerHeader,
  CloseIcon
} from "./styles";

import logo1 from "../../assets/shinelogics-logo.png";



const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [insightDropdownVisible, setInsightDropdownVisible] = useState(false);
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);
  const [mobileInsightDropdownVisible, setMobileInsightDropdownVisible] =
    useState(false);
  const [, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setProductDropdownVisible(false);
      setInsightDropdownVisible(false);
      setMobileDropdownVisible(false);
      setMobileInsightDropdownVisible(false);
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
    setMobileInsightDropdownVisible(false);
    localStorage.setItem("currentPath", path);
    window.dispatchEvent(new Event("storage"));
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
    {
      path: "/product",
      label: "Product & Solutions",
      hasDropdown: true,
      showDropdown: showProductDropdown,
      hideDropdown: hideProductDropdown,
    },
    { path: "/service", label: "Service" },
    {
      path: "/career",
      label: "Insights",
      hasDropdown: true,
      showDropdown: showInsightDropdown,
      hideDropdown: hideInsightDropdown,
    },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/quickmvp", label: "Explore Quick MVP" },
  ];

  console.log(navigationLinks);

  const productDropdownLinks = [
    { path: "/productcompo/erp", label: "ERP (Enterprise Resource Planning)" },
    { path: "/productcompo/ems", label: "EMS (Employee Management System)" },
    { path: "/productcompo/e-commerce", label: "ECOMMERCE" },
  ];

  const insightDropdownLinks = [
    { path: "/career", label: "Career" },
    { path: "/engagementModels", label: "Engagement Models" },
    { path: "/Blog-Resource", label: "Blog & Resources" },
    // { path: "/productEngineering", label: "Product Engineering" },
    // { path: "/resourseEngineering", label: "Resourse Engineering" },
  ];

  return (
    <HeaderSection>
      <LogoContainer to="/" aria-label="homepage">
        <img src={logo1} />
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
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={(e) => link.hasDropdown && e.preventDefault()}
            >
              <StyledButton>{link.label}</StyledButton>
            </NavLink>

            {/* Product Dropdown */}
          
            {link.path === "/product" && productDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {productDropdownLinks.map((sublink) => (
                  <NavLink
                    key={sublink.path}
                    to={sublink.path}
                    onClick={() => handleLinkClick(sublink.path)}
                  >
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </ActiveLink>
                ))}
              </DropdownWrapper>
            )}

            {/* Insights Dropdown */}
            {link.path === "/career" && insightDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {insightDropdownLinks.map((sublink) => (
                  <NavLink
                    key={sublink.path}
                    to={sublink.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => handleLinkClick(sublink.path)}
                  >
                    <DropdownContent>{sublink.label}</DropdownContent>
                  </ActiveLink>
                ))}
              </DropdownWrapper>
            )}


          </div>
        ))}
      </NavLinks>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
 <Drawer
  closable={false}
  open={visible}
  onClose={toggleDrawer}
  placement="right"
  width={300}
>
  {/* Close Icon */}
  <DrawerHeader>
    <CloseIcon onClick={toggleDrawer}>✕</CloseIcon>
  </DrawerHeader>

  {navigationLinks.map((link) => (
    <div key={link.path}>
      <MobileNavItem
        className={activeLink === link.path ? "active" : ""}
        onClick={() => {
          if (link.path === "/product") {
            setMobileDropdownVisible((prev) => !prev);
            setMobileInsightDropdownVisible(false);
          } 
          else if (link.path === "/career") {
            setMobileInsightDropdownVisible((prev) => !prev);
            setMobileDropdownVisible(false);
          } 
          else {
            // ✅ ACTUAL NAVIGATION
            setActiveLink(link.path);
            navigate(link.path);
            toggleDrawer();

            // close dropdowns
            setMobileDropdownVisible(false);
            setMobileInsightDropdownVisible(false);
          }
        }}
      >
        {link.label}
        {(link.path === "/product" || link.path === "/career") && (
          <span>
            {(link.path === "/product" && mobileDropdownVisible) ||
            (link.path === "/career" && mobileInsightDropdownVisible)
              ? "▲"
              : "▼"}
          </span>
        )}
      </MobileNavItem>

      {/* Product Dropdown */}
      {link.path === "/product" && mobileDropdownVisible && (
        <MobileDropdown>
          {productDropdownLinks.map((sublink) => (
            <MobileDropdownItem
              key={sublink.path}
              onClick={() => {
                setActiveLink(sublink.path);
                navigate(sublink.path);
                toggleDrawer();
                setMobileDropdownVisible(false);
              }}
            >
              {sublink.label}
            </MobileDropdownItem>
          ))}
        </MobileDropdown>
      )}

      {/* Insights Dropdown */}
      {link.path === "/career" && mobileInsightDropdownVisible && (
        <MobileDropdown>
          {insightDropdownLinks.map((sublink) => (
            <MobileDropdownItem
              key={sublink.path}
              onClick={() => {
                setActiveLink(sublink.path);
                navigate(sublink.path);
                toggleDrawer();
                setMobileInsightDropdownVisible(false);
              }}
            >
              {sublink.label}
            </MobileDropdownItem>
          ))}
        </MobileDropdown>
      )}
    </div>
  ))}
</Drawer>

    </HeaderSection>
  );
};

export default Header;
