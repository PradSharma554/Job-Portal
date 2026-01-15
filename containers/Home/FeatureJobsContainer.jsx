"use client"
import React from 'react'
import { useGetFeaturedJobs, useGetSavedJobs, useToggleSaveJob } from '@/queries/jobQueries'
import FeatureJobs from '@/components/Home/FeatureJobs'

const FeatureJobsContainer = () => {
    const { data: jobs, isLoading, isError } = useGetFeaturedJobs();
    const { data: savedJobIds } = useGetSavedJobs();
    const { mutate: toggleSaveJob } = useToggleSaveJob();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading featured jobs</div>;

    return <FeatureJobs
        jobs={jobs || []}
        savedJobIds={savedJobIds || []}
        toggleSaveJob={toggleSaveJob}
    />
}

export default FeatureJobsContainer
