import React from "react";
import { useLocation } from "react-router-dom";
import JobOne from "../../components/JobCompo/jobOne";
import JobTwo from "../../components/JobCompo/jobTwo";
import JobThree from "../../components/JobCompo/jobThree";

const Jobs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const job = queryParams.get("job");

  return (
    <div>
      {job === "jobOne" && <JobOne />}
      {job === "jobTwo" && <JobTwo />}
      {job === "jobThree" && <JobThree />}
      {!job && <p>Please select a job listing from the career page.</p>}
    </div>
  );
};

export default Jobs;