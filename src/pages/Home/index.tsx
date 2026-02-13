import { lazy, Suspense } from "react";

import SuccessMetrics from "../../components/Success-metrics/SuccessMetrics";
import CallToAction from "../../components/Call-to-action/CallToAction";
import TrustedPartners from "../../components/Trusted-partners/TrustedPartners";
import Shineplatforms from "../../components/HomeCompo/Shineplatforms";

/* LAZY LOADED SECTIONS */
const Homes = lazy(() => import("../../components/HomeCompo/home"));
const Pdaas = lazy(() => import("../../components/HomeCompo/pdaas"));
const OurService = lazy(() => import("../../components/HomeCompo/ourService"));
const OurProduct = lazy(() => import("../../components/HomeCompo/ourProduct"));
const WhyChooseUs = lazy(
  () => import("../../components/Choose-Us/WhyChooseUs")
);


const Home = () => {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
      <div>
        <Homes />
        <Pdaas />
        <Shineplatforms />

        <OurService />
        <WhyChooseUs />
        <TrustedPartners />
        <SuccessMetrics />
        <CallToAction />
        <OurProduct />
      </div>
    </Suspense>
  );
};

export default Home;
