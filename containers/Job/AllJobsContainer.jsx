"use client"
import React, { Children, cloneElement } from 'react'
import { useGetAllJobs, useGetSavedJobs, useToggleSaveJob } from '@/queries/jobQueries'
import { useQueryState } from 'nuqs';

const AllJobsContainer = ({ children }) => {
    const [query, setQuery] = useQueryState('search', {
        default: null,
        history: 'push',
    });

    const getAllJobs = useGetAllJobs({
        search: query,
    });
    const { data: savedJobIds } = useGetSavedJobs();
    const { mutate: toggleSaveJob } = useToggleSaveJob();

    const { data: jobs, isLoading, isError } = getAllJobs;

    return Children.only(
        cloneElement(children, {
            jobs,
            isLoading,
            isError,
            query,
            setQuery,
            savedJobIds: savedJobIds || [],
            toggleSaveJob
        })
    );
}

export default AllJobsContainer
