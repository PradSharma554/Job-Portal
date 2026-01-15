import Link from 'next/link'
import React from 'react'
import LogoImage from '@/public/images/logo.png'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/Auth'
import User from '../Helpers/User'

const Nav = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className='h-[13vh] shadow-md'>
            <div className='w-[90%] md-[80%] h-full mx-auto flex items-center justify-between'>
                {/* logo */}
                <div>
                    <div className=''>
                        <Link href='/'>
                            <div className='font-extrabold text-black cursor-pointer text-3xl'>
                                Job Portal
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex space-x-2 items-center'>
                    {/* <Image src={''} alt='user logo' /> */}
                    {!session && <Link href={'/signup'}><button className='px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-800 transition-colors duration-300'>Sign up</button></Link>}
                    {session && <Link
                        href="/saved"
                        className='px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300'
                    >
                        Saved Jobs</Link>}
                    {session && <User session={session} />}

                    {session && <Link href="/job/post">
                        <button className='px-4 py-1.5 text-[14px] h-[3em] sm:text-[16px] sm:px-6 
                    sm:py-2 bg-orange-600 hover:bg-orange-800  font-semibold text-white  rounded-lg 
                    transition-colors duration-300'>Post a job</button>
                    </Link>}
                </div>
            </div>
        </div>
    )
}

export default Nav
