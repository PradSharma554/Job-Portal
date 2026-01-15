"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import HeroImg from '@/public/images/hero.svg'
import { useRouter } from 'next/navigation'
import SearchComponent from '../molecules/SearchComponent'

const Hero = () => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    // useEffect(() => {
    //     if (query.trim()) {
    //         router.push(`/job/alljobs?search=${query}`)
    //     }
    // }, [query])

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/job/alljobs?search=${query}`)
        }
    }

    return (
        <div className='pt-16 md:pt-20 pb-8 md:pb-12'>
            <div className='w-full min-h-[60vh] flex flex-col items-center justify-center'>
                <div className='w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 item-center gap-[2rem]'>
                    {/* content */}
                    <div>
                        <h1 className='text-[28px] sm:text-[35px] lg:text-[45px] xl:text-[60px] text-[#05264e] leading-normal lg:leading-relaxed font-extrabold'>The <span className='text-blue-500'>Easiest Way</span> <br /> To Get Your Dream jobs </h1>
                        <p className='text-[#4f5e6f] text-[16px] md:text-[18px] mt-[1rem]'>Looking for your dream job? Look no further! Our platform provides the simplest path to securing the job you have always wanted. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, praesentium. Provident voluptatem nobis recusandae. With our user-friendly interface and extensive job listings, finding your dream job has never been easier..</p>
                        {/* search box */}
                        <SearchComponent query={query} setQuery={setQuery} handleSearch={handleSearch} />
                    </div>
                    {/* image */}
                    <div className='hidden lg:block'>
                        <Image src={HeroImg} alt="hero image" width={700} height={400} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
