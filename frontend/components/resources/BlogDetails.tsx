import React from 'react';
import { User, BookOpen, Clock, Calendar, FileEdit, CheckCircle2 } from 'lucide-react';

interface BlogDetailsProps {
    blog: any;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
    // Generate read time dynamically based on word count
    const calculateReadTime = () => {
        const text = `${blog.description || ''} ${(blog.points || []).join(' ')}`;
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        return `${minutes} MIN.`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const readTime = calculateReadTime();

    return (
        <section className="w-full max-w-[97vw] mx-auto px-6 xl:px-12 sm:px-8  py-6 xl:pt-22">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* Left Sidebar */}
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky lg:top-4 flex flex-col gap-6">
                        {/* Block 1 */}
                        <div className="bg-[#D4C8C0] rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-5">
                            {/* Row */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <User size={18} strokeWidth={1.5} />
                                    <span className="font-mono text-[16px] font-medium leading-none text-center text-[#00000094]">Author</span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="font-sans text-[17px] font-normal leading-none text-right text-[#000000B0]">{blog.author}</span>
                                </div>
                            </div>
                            {/* Row */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <BookOpen size={18} strokeWidth={1.5} />
                                    <span className="font-mono text-[16px] font-medium leading-none text-center text-[#00000094]">Category</span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="font-sans text-[17px] font-normal leading-none text-right text-[#000000B0]">{blog.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Block 2 */}
                        <div className="bg-[#D4C8C0] rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-5">
                            {/* Row */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <Clock size={18} strokeWidth={1.5} />
                                    <span className="font-mono text-[16px] font-medium leading-none text-center text-[#00000094]">Read Time</span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="font-sans text-[17px] font-normal leading-none text-right text-[#000000B0]">{readTime.toLowerCase()}</span>
                                </div>
                            </div>
                            {/* Row */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <Calendar size={18} strokeWidth={1.5} />
                                    <span className="font-mono text-[16px] font-medium leading-none text-center text-[#00000094]">Published</span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="font-sans text-[17px] font-normal leading-none text-right text-[#000000B0]">{formatDate(blog.createdAt)}</span>
                                </div>
                            </div>
                            {/* Row */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <FileEdit size={18} strokeWidth={1.5} />
                                    <span className="font-mono text-[16px] font-medium leading-none text-center text-[#00000094]">Updated</span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="font-sans text-[17px] font-normal leading-none text-right text-[#000000B0]">{formatDate(blog.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="col-span-1 lg:col-span-8 flex flex-col">
                    <h2 className="font-sans text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.2] text-black mb-8">
                        {blog.title}
                    </h2>

                    <div className="font-sans text-[16px] md:text-[18px] lg:text-[19px] font-normal leading-none capitalize text-black/80 flex flex-col gap-6">
                        <p>
                            {blog.description}
                        </p>

                        {blog.points && blog.points.length > 0 && (
                            <ul className="flex flex-col gap-6 my-4">
                                {blog.points.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="shrink-0 mt-1">
                                            <CheckCircle2 size={22} strokeWidth={1.5} className="text-black" />
                                        </div>
                                        <span className="leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
