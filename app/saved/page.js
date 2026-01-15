import React from "react";
import SavedJobsContainer from "@/containers/Job/SavedJobsContainer";
import SavedJobs from "@/components/Job/SavedJobs";

const SavedJobsPage = () => {
  return (
    <SavedJobsContainer>
      <SavedJobs />
    </SavedJobsContainer>
  );
};

export default SavedJobsPage;
