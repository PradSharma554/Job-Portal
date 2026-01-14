"use client"
import React from 'react'
import { useGetJobDetails, useGetAllJobs } from '@/queries/jobQueries' // Assuming related jobs are fetched from all jobs for now or similar
import { JobCard } from "@/paths";
import Link from 'next/link';
import { ApplyButton } from "@/paths";

const JobDetailsContainer = ({ id, session }) => {
    const { data: job, isLoading, isError } = useGetJobDetails(id);
    // Fetching some "related" jobs - just fetching all and slicing for simplicity in this demo container
    // Ideally, there should be a dedicated endpoint or query parameter for related jobs
    const { data: allJobs } = useGetAllJobs();

    const relatedJobs = allJobs?.filter(j => j._id !== id).slice(0, 4) || [];

    if (isLoading) return <div className='mt-20 w-[80%] mx-auto'>Loading...</div>;
    if (isError) return <div className='mt-20 w-[80%] mx-auto'>Error loading job details</div>;
    if (!job) return <div className='mt-20 w-[80%] mx-auto'>Job not found</div>;

    return (
        <div className='mt-20 mb-12'>
            <div className='block sm:flex items-center justify-between w-[80%] mx-auto'>
                <div className='flex-[0.7]'>
                    <JobCard job={job} />
                </div>
                {session && <ApplyButton />}
                {!session && <Link href={'/signup'}>
                    <button type='button' className='px-8 py-3 bg-emerald-600 rounded-lg text-white'>Signup</button>
                </Link>}
            </div>
            <div className='mt-16 w-[80%] mx-auto'>
                <h1 className='text-xl font-semibold'>Job Description</h1>
                <p className='mt-4 text-black text-opacity-70'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis deleniti blanditiis aliquid voluptatem, saepe autem omnis, aperiam consequatur quos voluptas quisquam, corporis facere. Tempore maxime, laboriosam corporis dolorum animi nihil!</p>
                <div className='mt-10 '>
                    <h1 className='text-xl font-semibold'>Key Resposibilities</h1>
                    <p className='mt-4 text-black text-opacity-70'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis deleniti blanditiis aliquid voluptatem, saepe autem omnis, aperiam consequatur quos voluptas quisquam, corporis facere. Tempore maxime, laboriosam corporis dolorum animi nihil!</p>
                </div>
                <div className='mt-10 '>
                    <h1 className='text-xl font-semibold'>Key Resposibilities</h1>
                    <ul className='mt-4'>
                        <li className='text-black text-opacity-70'>React JS</li>
                        <li className='text-black text-opacity-70'>HTML5</li>
                        <li className='text-black text-opacity-70'>CSS3</li>
                        <li className='text-black text-opacity-70'>Javascript</li>
                        <li className='text-black text-opacity-70'>Tailwindcss</li>
                    </ul>
                </div>

                <div className='mt-10'>
                    <h1 className='text-xl font-semibold'>Related Jobs</h1>
                    {relatedJobs?.map((job) => <Link key={job._id.toString()} href={`/job/jobDetails/${job._id.toString()}`} className='space-y-6'>
                        <JobCard job={job} />
                    </Link>

                    )}
                </div>
            </div>

        </div>
    )
}

export default JobDetailsContainer
