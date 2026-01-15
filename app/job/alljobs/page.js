import React from "react";
import AllJobsContainer from "@/containers/Job/AllJobsContainer";
import AllJobs from "@/components/Job/AllJobs";

const AllJobsPage = () => {
  return (
    <React.Suspense fallback={<div>Loading jobs...</div>}>
      <AllJobsContainer>
        <AllJobs />
      </AllJobsContainer>
    </React.Suspense>
  );
};

export default AllJobsPage;
