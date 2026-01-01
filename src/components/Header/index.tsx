import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";

import {
  HeaderSection,
  LogoContainer,
  Burger,
  NavLinks,
  StyledButton,
  DropdownWrapper,
  DropdownContent,
  DropdownArrow,
  MobileNavItem,
  MobileDropdown,
  MobileDropdownItem,
  DrawerHeader,
  CloseIcon,
} from "./styles";

import logo1 from "../../assets/shinelogics-logo(1).png";

/* ================= TYPES ================= */

type ActiveMenu =
  | "product"
  | "insights"
  | "service"
  | "about"
  | "contact"
  | "quickmvp"
  | "";

/* ================= ROUTE GROUPS ================= */

const productRoutes = [
  "/ProductCompo/erp",
  "/ProductCompo/ems",
  "/ProductCompo/e-commerce",
];

const insightsRoutes = ["/career", "/engagementModels", "/Blog-Resource"];

/* ================= DROPDOWN DATA ================= */

const productDropdownLinks = [
  { path: "/ProductCompo/erp", label: "ERP (Enterprise Resource Planning)" },
  { path: "/ProductCompo/ems", label: "EMS (Employee Management System)" },
  { path: "/ProductCompo/e-commerce", label: "E-Commerce" },
];

const insightDropdownLinks = [
  { path: "/career", label: "Career" },
  { path: "/engagementModels", label: "Engagement Models" },
  { path: "/Blog-Resource", label: "Blog & Resources" },
];

const Header = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [visible, setVisibility] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>("");

  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [insightDropdownVisible, setInsightDropdownVisible] = useState(false);

  const [mobileProductDropdownVisible, setMobileProductDropdownVisible] =
    useState(false);
  const [mobileInsightDropdownVisible, setMobileInsightDropdownVisible] =
    useState(false);

  /* ================= EFFECT ================= */

  useEffect(() => {
    const handleResize = () => {
      setProductDropdownVisible(false);
      setInsightDropdownVisible(false);
      setMobileProductDropdownVisible(false);
      setMobileInsightDropdownVisible(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= NAVIGATION HANDLER ================= */

  const navigateWithMenu = (path: string) => {
    if (productRoutes.includes(path)) setActiveMenu("product");
    else if (insightsRoutes.includes(path)) setActiveMenu("insights");
    else if (path === "/service") setActiveMenu("service");
    else if (path === "/about") setActiveMenu("about");
    else if (path === "/contact") setActiveMenu("contact");
    else if (path === "/quickmvp") setActiveMenu("quickmvp");
    else setActiveMenu("");

    navigate(path);

    setVisibility(false);
    setProductDropdownVisible(false);
    setInsightDropdownVisible(false);
    setMobileProductDropdownVisible(false);
    setMobileInsightDropdownVisible(false);
  };

  /* ================= NAV DATA ================= */

  const navigationLinks = [
    { key: "product", label: "Products (AS)", hasDropdown: true },
    { key: "service", path: "/service", label: "Service" },
    { key: "insights", label: "Insights", hasDropdown: true },
    { key: "about", path: "/about", label: "About" },

    // BUTTONS WITH NEXT ARROW
    {
      key: "contact",
      path: "/contact",
      label: "Contact",
      isButton: true,
    },
    {
      key: "quickmvp",
      path: "/quickmvp",
      label: "Explore Quick MVP",
      isButton: true,
      primary: true,
    },
  ];

  return (
    <HeaderSection>
      {/* LOGO */}
      <LogoContainer to="/" onClick={() => setActiveMenu("")}>
        <img src={logo1} alt="logo" />
      </LogoContainer>

      {/* BURGER */}
      <Burger onClick={() => setVisibility(true)}>
        <div />
        <div />
        <div />
      </Burger>

      {/* DESKTOP NAV */}
      <NavLinks>
        {navigationLinks.map((link) => (
          <div
            key={link.key}
            style={{ position: "relative" }}
            onMouseEnter={() => {
              if (link.key === "product") setProductDropdownVisible(true);
              if (link.key === "insights") setInsightDropdownVisible(true);
            }}
            onMouseLeave={() => {
              setProductDropdownVisible(false);
              setInsightDropdownVisible(false);
            }}
          >
            <StyledButton
              className={[
                activeMenu === link.key ? "active" : "",
                link.isButton ? "nav-button" : "",
                link.primary ? "primary" : "",
              ].join(" ")}
              onClick={(e) => {
                if (link.hasDropdown) e.preventDefault();
                else navigateWithMenu(link.path!);
              }}
            >
              <span>{link.label}</span>
              {link.isButton && <span className="arrow">→</span>}
            </StyledButton>

            {/* PRODUCT DROPDOWN (DIRECT ITEMS) */}
            {link.key === "product" && productDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {productDropdownLinks.map((item) => (
                  <DropdownContent
                    key={item.path}
                    onClick={() => navigateWithMenu(item.path)}
                  >
                    {item.label}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}

            {/* INSIGHTS DROPDOWN */}
            {link.key === "insights" && insightDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {insightDropdownLinks.map((item) => (
                  <DropdownContent
                    key={item.path}
                    onClick={() => navigateWithMenu(item.path)}
                  >
                    {item.label}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}
          </div>
        ))}
      </NavLinks>

      {/* MOBILE DRAWER */}
      <Drawer open={visible} placement="right" closable={false} width={300}>
        <DrawerHeader>
          <CloseIcon onClick={() => setVisibility(false)}>✕</CloseIcon>
        </DrawerHeader>

        {navigationLinks.map((link) => (
          <div key={link.key}>
            <MobileNavItem
              className={activeMenu === link.key ? "active" : ""}
              onClick={() => {
                if (link.key === "product")
                  setMobileProductDropdownVisible((p) => !p);
                else if (link.key === "insights")
                  setMobileInsightDropdownVisible((p) => !p);
                else navigateWithMenu(link.path!);
              }}
            >
              {link.label}
            </MobileNavItem>

            {/* MOBILE PRODUCTS */}
            {link.key === "product" && mobileProductDropdownVisible && (
              <MobileDropdown>
                {productDropdownLinks.map((item) => (
                  <MobileDropdownItem
                    key={item.path}
                    onClick={() => navigateWithMenu(item.path)}
                  >
                    {item.label}
                  </MobileDropdownItem>
                ))}
              </MobileDropdown>
            )}

            {/* MOBILE INSIGHTS */}
            {link.key === "insights" && mobileInsightDropdownVisible && (
              <MobileDropdown>
                {insightDropdownLinks.map((item) => (
                  <MobileDropdownItem
                    key={item.path}
                    onClick={() => navigateWithMenu(item.path)}
                  >
                    {item.label}
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
