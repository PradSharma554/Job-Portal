"use client";
import React from 'react';
import Link from "next/link";
import { JobCard } from "@/paths";
import SearchComponent from '@/components/molecules/SearchComponent';

const AllJobs = ({ jobs, query, setQuery, isLoading, isError, savedJobIds, toggleSaveJob }) => {
    if (isError) return <div className=' mx-auto mt-12'>Error loading jobs</div>
    return (
        <div className="mt-12 mx-auto mb-12">
            <div className="mb-12">
                <h1 className="semi-bold">Show Result ({jobs?.length || 0})</h1>
            </div>
            <SearchComponent query={query} setQuery={setQuery} />
            {isLoading && <div className=' mx-auto mt-12'>Loading...</div>}
            <div className="mt-6">
                {jobs?.map((job) => (
                    <Link
                        key={job._id.toString()}
                        href={`/job/jobDetails/${job._id.toString()}`}
                    >
                        <JobCard
                            job={job}
                            isSaved={savedJobIds?.includes(job._id)}
                            onToggleSave={toggleSaveJob}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllJobs;
