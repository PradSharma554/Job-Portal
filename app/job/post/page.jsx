"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostJobContainer from '@/containers/Job/PostJobContainer';

const PostJob = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signup');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!session) return null; // Or some loading state while redirecting

    return <PostJobContainer />;
};

export default PostJob;
