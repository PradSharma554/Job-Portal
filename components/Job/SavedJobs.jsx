"use client";
import React from 'react';
import Link from "next/link";
import { JobCard } from "@/paths";

const SavedJobs = ({ jobs, isLoading, savedJobIds, toggleSaveJob }) => {
    if (isLoading) return <div className=' mx-auto mt-12'>Loading saved jobs...</div>;

    if (jobs?.length === 0) {
        return (
            <div className='mx-auto mt-12 mb-12 text-center'>
                <h1 className='text-2xl font-bold mb-4'>No Saved Jobs Yet</h1>
                <p className='text-gray-600 mb-8'>Browse our jobs and bookmark your favorites!</p>
                <Link href='/job/alljobs'>
                    <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Browse Jobs</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="mt-12 mx-auto mb-12">
            <div className="mb-12">
                <h1 className="semi-bold text-2xl">Your Saved Jobs ({jobs?.length})</h1>
            </div>
            <div className="space-y-10">
                {jobs?.map((job) => (
                    <Link
                        key={job._id.toString()}
                        href={`/job/jobDetails/${job._id.toString()}`}
                    >
                        <JobCard
                            job={job}
                            isSaved={true} // In this list, they are all saved
                            onToggleSave={toggleSaveJob}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SavedJobs;
