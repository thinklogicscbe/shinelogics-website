import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
import PathTracker from "../router/PathTracker"; // Import PathTracker

const AppRouter: React.FC = () => {
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
      <Header />
      <Routes>
        {routes.map((routeItem) => {
          const LazyComponent = lazy(
            () => import(`../pages/${routeItem.component}/index`)
          );

          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              element={
                <PathTracker path={routeItem.path}>
                  <LazyComponent />
                </PathTracker>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <PathTracker path="*">
              <NotFoundPage />
            </PathTracker>
          }
        />
      </Routes>
      <Footer />
      <ChatbotButton />
    </Suspense>
  );
};

export default AppRouter;
