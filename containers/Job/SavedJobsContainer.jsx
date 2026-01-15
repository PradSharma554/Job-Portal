"use client"
import React, { Children, cloneElement } from 'react'
import { useGetSavedJobs, useToggleSaveJob, useGetAllJobs } from '@/queries/jobQueries'

const SavedJobsContainer = ({ children }) => {
    // 1. Get saved job IDs
    const { data: savedJobIds, isLoading: isLoadingSaved } = useGetSavedJobs();

    // 2. We also need to fetch the actual job details. 
    // Ideally, the API /api/user/saved could return the full job objects populated.
    // However, since we currently only get IDs, let's assume we can fetch all jobs and filter client side 
    // (efficient for small datasets) OR we should update the API.
    // For now, to stick to the pattern without changing backend excessively if not requested:
    // Let's rely on useGetAllJobs but this is inefficient if we have many jobs.
    // A better approach: update /api/user/saved to return populated jobs.
    // Let's TRY to see if we can use existing hooks intelligently.
    // If we use getAllJobs(), we fetch everything. 
    // Let's modify the query hook to potentially accept specific IDs or just rely on API update.
    // Since I cannot read mind, I will assume updating the API is cleaner, OR I can just filter from all jobs if dataset is small.
    // Given the project scale, filtering all jobs is acceptable for a "demo".

    const { data: allJobs, isLoading: isLoadingAll } = useGetAllJobs();
    const { mutate: toggleSaveJob } = useToggleSaveJob();

    const jobs = allJobs?.filter(job => savedJobIds?.includes(job._id)) || [];

    const isLoading = isLoadingSaved || isLoadingAll;

    return Children.only(
        cloneElement(children, {
            jobs,
            isLoading,
            savedJobIds: savedJobIds || [], // Pass this so cards show "saved" state correctly (they are all saved here, but consistent props)
            toggleSaveJob
        })
    );
}

export default SavedJobsContainer
