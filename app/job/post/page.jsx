"use client";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const jobTypes = ["Full Time", "Part Time", "Freelance", "Contract", "Internship"];
const imagePresets = [
    "/images/c1.png",
    "/images/c2.png",
    "/images/c3.png",
    "/images/c4.png",
    "/images/c5.png",
    "/images/c6.png"
];

const PostJob = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signup');
        }
    }, [status, router]);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        image: imagePresets[0],
        salary: '',
        location: '',
        jobtype: jobTypes[0]
    });

    if (status === 'loading') {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageSelect = (img) => {
        setFormData({ ...formData, image: img });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Job Posted Successfully!');
                setTimeout(() => {
                    router.push('/');
                    router.refresh();
                }, 1500);
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error('Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-blue-600 px-8 py-6">
                        <h2 className="text-3xl font-extrabold text-white text-center">Post a New Job</h2>
                        <p className="text-blue-100 text-center mt-2">Find the perfect candidate for your company</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
                        {/* Job Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g. Google, Microsoft"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                            />
                        </div>

                        {/* Location & Salary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. New York, Remote"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    required
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. $80k - $100k"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Job Type */}
                        <div>
                            <label htmlFor="jobtype" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select
                                id="jobtype"
                                name="jobtype"
                                value={formData.jobtype}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                            >
                                {jobTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Company Logo Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select Company Logo</label>
                            <div className="flex flex-wrap gap-4">
                                {imagePresets.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleImageSelect(img)}
                                        className={`cursor-pointer p-2 rounded-xl border-2 transition-all ${formData.image === img ? 'border-blue-600 bg-blue-50 scale-110' : 'border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <Image src={img} alt={`Logo ${idx + 1}`} width={50} height={50} className="object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                            >
                                {loading ? 'Posting...' : 'Post Job Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PostJob;
