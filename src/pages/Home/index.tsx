import { lazy } from "react";

const Homes = lazy(() => import("../../components/home/home"));

const Home = () => {
  return (
    <Homes />
  );
};

export default Home;
