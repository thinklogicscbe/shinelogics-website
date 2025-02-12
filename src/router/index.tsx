import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import ScrollToTop from "../components/scrollCompo";
import ChatbotButton from "../components/ChatbotCompo";
import {
  LoaderContainer,
  Dot1,
  Dot2,
  Dot3,
  LoaderText,
  GlobalStyle,
} from "./style";
import NotFoundPage from "../components/NotFoundCompo";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooterPaths = ["/viewJobs", "/SideBar", "/viewProfile", "/PostJob", "/login"];
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  useEffect(() => {
    console.log("Current Path:", location.pathname);
  }, [location]);

  return (
    <Suspense
      fallback={
        <>
          <GlobalStyle />
          <LoaderContainer>
            <div>
              <Dot1 />
              <Dot2 />
              <Dot3 />
            </div>
            <LoaderText>Shinelogics</LoaderText>
          </LoaderContainer>
        </>
      }
    >
      <GlobalStyle />
      <Styles />
      <ScrollToTop />

      {!shouldHideHeaderFooter && <Header />}

      <Routes key={location.pathname}>
        {routes.map((routeItem) => {
          try {
            const LazyComponent = lazy(
              () => import(`../pages/${routeItem.component}/index`)
            );

            return (
              <Route
                key={routeItem.component}
                path={routeItem.path}
                element={<LazyComponent />}
              />
            );
          } catch (error) {
            console.error("Error loading component:", routeItem.component, error);
            return null;
          }
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
      {!shouldHideHeaderFooter && <ChatbotButton />}
    </Suspense>
  );
};

export default AppRouter;
