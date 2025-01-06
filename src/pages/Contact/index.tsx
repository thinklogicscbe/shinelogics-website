import { lazy } from "react";

const Contacts = lazy(() => import("../../components/ContactCompo/contact"));

const Contact = () => {
  return (
    <Contacts />
  );
};

export default Contact;
