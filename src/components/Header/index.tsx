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
  AsAText,
} from "./styles";

import logo1 from "../../assets/logo_3.png";

/* ================= TYPES ================= */

type ActiveMenu =
  | "product"
  | "insights"
  | "service"
  | "about"
  | "contact"
  | "quickmvp"
  | "";

/* 🔥 NEW: Product Type for Header */
type HeaderProduct = {
  _id: string;
  title: string;
  slug: string;
};

/* ================= ROUTE GROUPS ================= */

const productRoutes = [
  "/ProductCompo/erp",
  "/ProductCompo/ems",
  "/ProductCompo/e-commerce",
];

const insightsRoutes = ["/career", "/engagementModels", "/Blog-Resource"];

/* ================= DROPDOWN DATA ================= */

/* INSIGHTS (UNCHANGED) */
const insightsDropdownLinks = [
  { path: "/engagementModels", label: "Engagement Models" },
  { path: "/Blog-Resource", label: "Blog & Resources" },
];

/* ABOUT (UNCHANGED) */
const aboutDropdownLinks = [
  { path: "/career", label: "Career" },
  { path: "/about/mission", label: "Mission & Vision" },
  { path: "/about/services", label: "What We Do" },
  { path: "/about/industries", label: "Industries" },
  { path: "/about/experts", label: "Our Experts" },
];

const Header = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [visible, setVisibility] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>("");

  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [insightDropdownVisible, setInsightDropdownVisible] = useState(false);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);

  const [mobileProductDropdownVisible, setMobileProductDropdownVisible] =
    useState(false);
  const [mobileInsightDropdownVisible, setMobileInsightDropdownVisible] =
    useState(false);
  const [mobileAboutDropdownVisible, setMobileAboutDropdownVisible] =
    useState(false);

  /* 🔥 NEW: Dynamic Products from Admin */
  const [productLinks, setProductLinks] = useState<HeaderProduct[]>([]);

  /* ================= EFFECTS ================= */

  // Existing resize effect (UNCHANGED)
  useEffect(() => {
    const handleResize = () => {
      setProductDropdownVisible(false);
      setInsightDropdownVisible(false);
      setAboutDropdownVisible(false);
      setMobileProductDropdownVisible(false);
      setMobileInsightDropdownVisible(false);
      setMobileAboutDropdownVisible(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 NEW: Fetch products for header dropdown
  useEffect(() => {
    fetchHeaderProducts();
  }, []);

  const fetchHeaderProducts = async () => {
    try {
      const res = await fetch("http://localhost:3006/api/products");
      const data = await res.json();
      setProductLinks(data.result || []);
    } catch (err) {
      console.error("Failed to load products for header", err);
    }
  };

  /* ================= NAVIGATION HANDLER ================= */

  const navigateWithMenu = (path: string) => {
    if (productRoutes.includes(path)) setActiveMenu("product");
    else if (insightsRoutes.includes(path)) setActiveMenu("insights");
    else if (path.startsWith("/about")) setActiveMenu("about");
    else if (path === "/service") setActiveMenu("service");
    else if (path === "/contact") setActiveMenu("contact");
    else if (path === "/quickmvp") setActiveMenu("quickmvp");
    else setActiveMenu("");

    navigate(path);

    setVisibility(false);
    setProductDropdownVisible(false);
    setInsightDropdownVisible(false);
    setAboutDropdownVisible(false);
    setMobileProductDropdownVisible(false);
    setMobileInsightDropdownVisible(false);
    setMobileAboutDropdownVisible(false);
  };

  /* ================= NAV DATA ================= */

  const navigationLinks = [
    { key: "product", label: "Products", hasDropdown: true },

    { key: "as-a", label: "as a", isStatic: true },

    { key: "service", path: "/service", label: "Service" },
    { key: "insights", label: "Insights", hasDropdown: true },
    { key: "about", label: "About", hasDropdown: true },
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
              if (link.key === "about") setAboutDropdownVisible(true);
            }}
            onMouseLeave={() => {
              setProductDropdownVisible(false);
              setInsightDropdownVisible(false);
              setAboutDropdownVisible(false);
            }}
          >
            {link.isStatic ? (
              <AsAText className="pas-as-a">{link.label}</AsAText>
            ) : (
              <StyledButton
                className={[
                  link.key === "product" || link.key === "service"
                    ? "pas-button"
                    : "",
                  activeMenu === link.key ? "active" : "",
                  link.isButton ? "nav-button" : "",
                  link.primary ? "primary" : "",
                ].join(" ")}
                onClick={(e) => {
                  if (link.hasDropdown) e.preventDefault();
                  else navigateWithMenu(link.path!);
                }}
              >
                <span className="main-label">{link.label}</span>
                {link.isButton && <span className="arrow">→</span>}
              </StyledButton>
            )}

            {/* ================= PRODUCT DROPDOWN (DYNAMIC) ================= */}
            {link.key === "product" && productDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {productLinks.map((item) => (
                  <DropdownContent
                    key={item._id}
                    onClick={() =>
                      navigateWithMenu(`/ProductCompo/${item.slug}`)
                    }
                  >
                    {item.title}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}

            {/* ================= INSIGHTS DROPDOWN ================= */}
            {link.key === "insights" && insightDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {insightsDropdownLinks.map((item) => (
                  <DropdownContent
                    key={item.path}
                    onClick={() => navigateWithMenu(item.path)}
                  >
                    {item.label}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}

            {/* ================= ABOUT DROPDOWN ================= */}
            {link.key === "about" && aboutDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {aboutDropdownLinks.map((item) => (
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

        {navigationLinks
          .filter((link) => link.key !== "as-a") // 🔥 remove "as a" from mobile
          .map((link) => (
            <div key={link.key}>
              <MobileNavItem
                className={[
                  activeMenu === link.key ? "active" : "",
                  link.isButton ? "nav-button" : "",
                  link.primary ? "primary" : "",
                ].join(" ")}
                onClick={() => {
                  if (link.key === "product")
                    setMobileProductDropdownVisible((p) => !p);
                  else if (link.key === "insights")
                    setMobileInsightDropdownVisible((p) => !p);
                  else if (link.key === "about")
                    setMobileAboutDropdownVisible((p) => !p);
                  else navigateWithMenu(link.path!);
                }}
              >
                <span className="main-label">{link.label}</span>
                {link.isButton && <span className="arrow">→</span>}
              </MobileNavItem>

              {/* MOBILE PRODUCT (DYNAMIC) */}
              {link.key === "product" && mobileProductDropdownVisible && (
                <MobileDropdown>
                  {productLinks.map((item) => (
                    <MobileDropdownItem
                      key={item._id}
                      onClick={() =>
                        navigateWithMenu(`/ProductCompo/${item.slug}`)
                      }
                    >
                      {item.title}
                    </MobileDropdownItem>
                  ))}
                </MobileDropdown>
              )}

              {/* MOBILE INSIGHTS */}
              {link.key === "insights" && mobileInsightDropdownVisible && (
                <MobileDropdown>
                  {insightsDropdownLinks.map((item) => (
                    <MobileDropdownItem
                      key={item.path}
                      onClick={() => navigateWithMenu(item.path)}
                    >
                      {item.label}
                    </MobileDropdownItem>
                  ))}
                </MobileDropdown>
              )}

              {/* MOBILE ABOUT */}
              {link.key === "about" && mobileAboutDropdownVisible && (
                <MobileDropdown>
                  {aboutDropdownLinks.map((item) => (
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
