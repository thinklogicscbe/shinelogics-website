import { lazy } from "react";

const Homes = lazy(() => import("../../components/HomeCompo/home"));

const Home = () => {
  return (
    <Homes />
  );
};

export default Home;
