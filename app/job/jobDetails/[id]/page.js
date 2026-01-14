import { authOptions } from "@/Auth";
import { getServerSession } from "next-auth";
import React from "react";
import JobDetailsContainer from "@/containers/Job/JobDetailsContainer";

const JobDeatils = async ({ params }) => {
  const session = await getServerSession(authOptions);

  return <JobDetailsContainer id={params.id} session={session} />;
};

export default JobDeatils;
