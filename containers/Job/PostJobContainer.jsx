"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePostJob } from '@/queries/jobQueries';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostJobForm from '@/components/Job/PostJobForm';

const jobTypes = ["Full Time", "Part Time", "Freelance", "Contract", "Internship"];
const imagePresets = [
    "/images/c1.png",
    "/images/c2.png",
    "/images/c3.png",
    "/images/c4.png",
    "/images/c5.png",
    "/images/c6.png"
];

const PostJobContainer = () => {
    const router = useRouter();
    const { mutate: postJob, isPending } = usePostJob();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        image: imagePresets[0],
        salary: '',
        location: '',
        jobtype: jobTypes[0]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageSelect = (img) => {
        setFormData({ ...formData, image: img });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postJob(formData, {
            onSuccess: () => {
                toast.success('Job Posted Successfully!');
                setTimeout(() => {
                    router.push('/');
                    router.refresh(); // Refresh to show new job in list (or query invalidation handles it if using client side list)
                }, 1500);
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to post job');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <PostJobForm
                formData={formData}
                handleChange={handleChange}
                handleImageSelect={handleImageSelect}
                handleSubmit={handleSubmit}
                loading={isPending}
                jobTypes={jobTypes}
                imagePresets={imagePresets}
            />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PostJobContainer;
