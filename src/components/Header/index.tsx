import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { FaRegUserCircle } from "react-icons/fa";

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
  PortalWrapper,
  PortalButton,
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

/* 🔥 Product Type */
type HeaderProduct = {
  _id: string;
  title: string;
  slug: string;
};

/* 🔥 Service Type */
type HeaderService = {
  _id: string;
  title: string;
};

/* ================= ROUTE GROUPS ================= */

const productRoutes = [
  "/ProductCompo/erp",
  "/ProductCompo/ems",
  "/ProductCompo/e-commerce",
];

const insightsRoutes = ["/career", "/engagementModels", "/Blog-Resource"];

/* ================= DROPDOWN DATA ================= */

const insightsDropdownLinks = [
  { path: "/engagementModels", label: "Engagement Models" },
  { path: "/Blog-Resource", label: "Blog & Resources" },
];

const aboutDropdownLinks = [
  { path: "/career", label: "Career" },
  // { path: "/about/mission", label: "Mission & Vision" },
  // { path: "/about/services", label: "What We Do" },
  // { path: "/about/industries", label: "Industries" },
  { path: "/about/experts", label: "Our Experts" },
  { path: "/About", label: "About Us" },
];

const Header = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [visible, setVisibility] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>("");

  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [insightDropdownVisible, setInsightDropdownVisible] = useState(false);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);

  const [mobileProductDropdownVisible, setMobileProductDropdownVisible] =
    useState(false);
  const [mobileServiceDropdownVisible, setMobileServiceDropdownVisible] =
    useState(false);
  const [mobileInsightDropdownVisible, setMobileInsightDropdownVisible] =
    useState(false);
  const [mobileAboutDropdownVisible, setMobileAboutDropdownVisible] =
    useState(false);

  /* 🔥 Dynamic dropdown data */
  const [productLinks, setProductLinks] = useState<HeaderProduct[]>([]);
  const [serviceLinks, setServiceLinks] = useState<HeaderService[]>([]);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    const handleResize = () => {
      setProductDropdownVisible(false);
      setServiceDropdownVisible(false);
      setInsightDropdownVisible(false);
      setAboutDropdownVisible(false);
      setMobileProductDropdownVisible(false);
      setMobileServiceDropdownVisible(false);
      setMobileInsightDropdownVisible(false);
      setMobileAboutDropdownVisible(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 🔥 Fetch products */
  useEffect(() => {
    fetchHeaderProducts();
    fetchHeaderServices();
  }, []);

  const fetchHeaderProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`);
      const data = await res.json();
      setProductLinks(data.result || []);
    } catch (err) {
      console.error("Failed to load products for header", err);
    }
  };

  const fetchHeaderServices = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/service`);
      const data = await res.json();
      setServiceLinks(data.data || []);
    } catch (err) {
      console.error("Failed to load services for header", err);
    }
  };

  /* ================= NAVIGATION HANDLER ================= */

  const navigateWithMenu = (path: string) => {
    if (productRoutes.includes(path)) setActiveMenu("product");
    else if (path.startsWith("/service")) setActiveMenu("service");
    else if (insightsRoutes.includes(path)) setActiveMenu("insights");
    else if (path.startsWith("/about")) setActiveMenu("about");
    else if (path === "/contact") setActiveMenu("contact");
    else if (path === "/quickmvp") setActiveMenu("quickmvp");
    else setActiveMenu("");

    navigate(path);

    setVisibility(false);
    setProductDropdownVisible(false);
    setServiceDropdownVisible(false);
    setInsightDropdownVisible(false);
    setAboutDropdownVisible(false);
    setMobileProductDropdownVisible(false);
    setMobileServiceDropdownVisible(false);
    setMobileInsightDropdownVisible(false);
    setMobileAboutDropdownVisible(false);
  };

  const navigateToPortal = () => {
    navigate("/login");
    setVisibility(false);
  };

  /* ================= NAV DATA ================= */

  const navigationLinks = [
    { key: "product", label: "Products", hasDropdown: true },
    { key: "as-a", label: "as a", isStatic: true },
    { key: "service", path: "/service", label: "Service", hasDropdown: true },
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

      {/* ================= DESKTOP NAV ================= */}
      <NavLinks>
        {navigationLinks.map((link) => (
          <div
            key={link.key}
            style={{ position: "relative" }}
            onMouseEnter={() => {
              if (link.key === "product") setProductDropdownVisible(true);
              if (link.key === "service") setServiceDropdownVisible(true);
              if (link.key === "insights") setInsightDropdownVisible(true);
              if (link.key === "about") setAboutDropdownVisible(true);
            }}
            onMouseLeave={() => {
              setProductDropdownVisible(false);
              setServiceDropdownVisible(false);
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

            {/* PRODUCT DROPDOWN */}
            {link.key === "product" && productDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {productLinks.map((item) => (
                  <DropdownContent
                    key={item._id}
                    onClick={() =>
                      navigateWithMenu(
                        `/ProductCompo/${encodeURIComponent(item.slug)}`,
                      )
                    }
                  >
                    {item.title}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}

            {/* SERVICE DROPDOWN */}
            {link.key === "service" && serviceDropdownVisible && (
              <DropdownWrapper className="visible">
                <DropdownArrow />
                {serviceLinks.map((item) => (
                  <DropdownContent
                    key={item._id}
                    onClick={() => {
                      navigate(`/service?id=${item._id}`);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                      setServiceDropdownVisible(false);
                    }}
                  >
                    {item.title}
                  </DropdownContent>
                ))}
              </DropdownWrapper>
            )}

            {/* INSIGHTS DROPDOWN */}
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

            {/* ABOUT DROPDOWN */}
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

        <PortalWrapper>
          <PortalButton
            type="button"
            aria-label="Open login"
            title="Login portal"
            onClick={navigateToPortal}
          >
            <FaRegUserCircle />
          </PortalButton>
        </PortalWrapper>
      </NavLinks>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer open={visible} placement="right" closable={false} width={300}>
        <DrawerHeader>
          <CloseIcon onClick={() => setVisibility(false)}>✕</CloseIcon>
        </DrawerHeader>

        {navigationLinks
          .filter((link) => link.key !== "as-a")
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
                  else if (link.key === "service")
                    setMobileServiceDropdownVisible((p) => !p);
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

              {/* MOBILE PRODUCT */}
              {link.key === "product" && mobileProductDropdownVisible && (
                <MobileDropdown>
                  {productLinks.map((item) => (
                    <MobileDropdownItem
                      key={item._id}
                      onClick={() =>
                        navigateWithMenu(
                          `/ProductCompo/${encodeURIComponent(item.slug)}`,
                        )
                      }
                    >
                      {item.title}
                    </MobileDropdownItem>
                  ))}
                </MobileDropdown>
              )}

              {/* MOBILE SERVICE */}
              {link.key === "service" && mobileServiceDropdownVisible && (
                <MobileDropdown>
                  {serviceLinks.map((item) => (
                    <MobileDropdownItem
                      key={item._id}
                      onClick={() => {
                        navigate(`/service?id=${item._id}`);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                        setVisibility(false);
                        setMobileServiceDropdownVisible(false);
                      }}
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

        <MobileNavItem onClick={navigateToPortal}>
          <span className="main-label">Login Portal</span>
        </MobileNavItem>
      </Drawer>
    </HeaderSection>
  );
};

export default Header;
