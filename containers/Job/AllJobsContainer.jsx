"use client"
import React, { useEffect } from 'react'
import { useGetAllJobs } from '@/queries/jobQueries'
import Link from "next/link";
import { JobCard } from "@/paths";
import SearchComponent from '@/components/molecules/SearchComponent';
import { useQueryState } from 'nuqs';

const AllJobsContainer = ({ search }) => {
    const { data: jobs, isLoading, isError } = useGetAllJobs(search);

    const [query, setQuery] = useQueryState('search', { default: '' });

    // useEffect(() => {
    //     if (query.trim()) {
    //         router.push(`/job/alljobs?search=${query}`)
    //     }
    // }, [query])

    if (isLoading) return <div className='w-[80%] mx-auto mt-12'>Loading...</div>;
    if (isError) return <div className='w-[80%] mx-auto mt-12'>Error loading jobs</div>;

    return (
        <div className="mt-12 w-[80%] mx-auto mb-12">
            <div className="mb-12">
                <h1 className="semi-bold">Show Result ({jobs?.length || 0})</h1>
            </div>
            <SearchComponent query={query} setQuery={setQuery} />
            <div className="space-y-10">
                {jobs?.map((job) => (
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
}

export default AllJobsContainer
