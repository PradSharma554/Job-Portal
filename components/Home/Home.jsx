import React from 'react'
import { Hero, JobCategory } from '../../paths'
import FeatureJobsContainer from '@/containers/Home/FeatureJobsContainer'

const Home = () => {
    return (
        <div>
            <Hero />
            <JobCategory />
            <FeatureJobsContainer />
        </div>
    )
}

export default Home
