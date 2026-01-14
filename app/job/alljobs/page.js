import React from "react";
import AllJobsContainer from "@/containers/Job/AllJobsContainer";

const AllJobs = ({ searchParams }) => {
  return (
    <React.Suspense fallback={<div>Loading jobs...</div>}>
      <AllJobsContainer search={searchParams?.search} />
    </React.Suspense>
  );
};

export default AllJobs;
