import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import ChatbotButton from "../components/ChatbotCompo";
import {
  LoaderContainer,
  Dot1,
  Dot2,
  Dot3,
  LoaderText,
  GlobalStyle
} from "./style";

const Router = () => {
  return (
    // <Suspense
    //   fallback={
    //     <LoaderContainer>
    //       <div>
    //         <Dot1 />
    //         <Dot2 />
    //         <Dot3 />
    //       </div>
    //       <LoaderText>Shinelogics</LoaderText> 
    //     </LoaderContainer>
    //   }
    // >
    //   <Styles />
    //   <Header />
    //   <Switch>
    //     {routes.map((routeItem) => (
    //       <Route
    //         key={routeItem.component}
    //         path={routeItem.path}
    //         exact={routeItem.exact}
    //         component={lazy(() =>
    //           import(`../pages/${routeItem.component}/index`)
    //         )}
    //       />
    //     ))}
    //   </Switch>
    //   <Footer />
    //   <ChatbotButton/>
    // </Suspense>
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
  </Suspense>
  
  );
};

export default Router;
