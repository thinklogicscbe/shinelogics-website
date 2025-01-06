import { lazy } from "react";

const Abouts = lazy(() => import("../../components/AboutCompo/about"));

const About = () => {
  return (
    <Abouts />
  );
};

export default About;
