import ReactDOM from "react-dom/client"; // Use react-dom/client for React 18
import { HashRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";
import { ToastContainer } from "react-toastify";


const App = () => (
  <HashRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </HashRouter>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create the React 18 root
  root.render(<App />);
}
