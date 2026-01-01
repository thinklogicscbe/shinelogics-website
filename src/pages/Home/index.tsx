import { lazy } from "react";
import SuccessMetrics from "../../components/Success-metrics/SuccessMetrics";
import CallToAction from "../../components/Call-to-action/CallToAction";
import TrustedPartners from "../../components/Trusted-partners/TrustedPartners";


const Homes = lazy(() => import("../../components/HomeCompo/home"));
const Pdaas = lazy(() => import("../../components/HomeCompo/pdaas"));
const OurService = lazy(() => import("../../components/HomeCompo/ourService"));
const OurProduct = lazy(() => import("../../components/HomeCompo/ourProduct"));
const WhyChooseUs = lazy(() => import("../../components/Choose-Us/WhyChooseUs"));


const Home = () => {
  return (
   <div>
     <Homes />
     <Pdaas/>
     <OurService/>
     <WhyChooseUs/>
     <TrustedPartners />
     <SuccessMetrics />
     <CallToAction />
     <WhyChooseUs />

     <OurProduct/>
   </div>
  );
};

export default Home;
