import { lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
      <Router>
        <ScrollToTop/>
        <Header />
        <Switch>
          {routes.map((routeItem) => (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() =>
                import(`../pages/${routeItem.component}/index`)
              )}
            />
          ))}
        </Switch>
        <Footer />
        <ChatbotButton />
      </Router>
    </Suspense>
  );
};

export default AppRouter;
