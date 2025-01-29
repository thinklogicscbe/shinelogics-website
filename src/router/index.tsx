import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // Removed extra Router import
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
  GlobalStyle
} from "./style";

const AppRouter = () => {
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
      <Routes> {/* No extra Router here */}
        {routes.map((routeItem) => {
          const LazyComponent = lazy(() =>
            import(`../pages/${routeItem.component}/index`)
          );

          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              element={<LazyComponent />}
            />
          );
        })}
      </Routes>
      <Footer />
      <ChatbotButton />
    </Suspense>
  );
};

export default AppRouter;
