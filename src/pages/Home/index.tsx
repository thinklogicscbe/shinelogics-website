import { lazy } from "react";

const Homes = lazy(() => import("../../components/HomeCompo/home"));
const Pdaas = lazy(() => import("../../components/HomeCompo/pdaas"));

const Home = () => {
  return (
   <div>
     <Homes />
     <Pdaas/>
   </div>
  );
};

export default Home;
