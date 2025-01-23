import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import {
  LoaderContainer,
  Dot1,
  Dot2,
  Dot3,
  LoaderText,
} from "./style";

const Router = () => {
  return (
    <Suspense
      fallback={
        <LoaderContainer>
          <div>
            <Dot1 />
            <Dot2 />
            <Dot3 />
          </div>
          <LoaderText>Shinelogics</LoaderText> 
        </LoaderContainer>
      }
    >
      <Styles />
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
    </Suspense>
  );
};

export default Router;
