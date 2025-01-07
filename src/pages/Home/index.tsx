import { lazy } from "react";

const Homes = lazy(() => import("../../components/HomeCompo/home"));
const Pdaas = lazy(() => import("../../components/HomeCompo/pdaas"));
const OurService = lazy(() => import("../../components/HomeCompo/ourService"));
const OurProduct = lazy(() => import("../../components/HomeCompo/ourProduct"));


const Home = () => {
  return (
   <div>
     <Homes />
     <Pdaas/>
     <OurService/>
     <OurProduct/>
   </div>
  );
};

export default Home;
