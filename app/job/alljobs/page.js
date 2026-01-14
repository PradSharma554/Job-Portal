import React from "react";
import Link from "next/link";
import { JobCard } from "@/paths";
import Job from "@/models/Job";
import connectToMongoDB from "@/lib/mongodb";

const AllJobs = async () => {
  await connectToMongoDB();
  const jobs = await Job.find({}).lean();

  return (
    <div className="mt-12 w-[80%] mx-auto mb-12">
      <div className="mb-12">
        <h1 className="semi-bold">Show Result ({jobs.length})</h1>
      </div>
      <div className="space-y-10">
        {jobs.map((job) => (
          <Link
            key={job._id.toString()}
            href={`/job/jobDetails/${job._id.toString()}`}
          >
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
