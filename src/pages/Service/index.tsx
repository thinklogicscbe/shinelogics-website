import { lazy } from "react";

const Services = lazy(() => import("../../components/ServiceCompo/service"));

const Service = () => {
  return (
    <Services />
  );
};

export default Service;
