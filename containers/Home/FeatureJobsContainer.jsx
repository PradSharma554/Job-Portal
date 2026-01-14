"use client"
import React from 'react'
import { useGetFeaturedJobs } from '@/queries/jobQueries'
import FeatureJobs from '@/components/Home/FeatureJobs'

const FeatureJobsContainer = () => {
    const { data: jobs, isLoading, isError } = useGetFeaturedJobs();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading featured jobs</div>;

    return <FeatureJobs jobs={jobs || []} />
}

export default FeatureJobsContainer
