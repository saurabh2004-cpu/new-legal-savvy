import React from "react";
import { User, BookOpen, Clock, Calendar, FileEdit, CheckCircle2 } from "lucide-react";

interface BlogDetailsProps {
    blog: any;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
    if (!blog) return null;

    // Generate read time dynamically based on word count
    const calculateReadTime = () => {
        const text = `${blog.description || ""} ${(blog.points || []).join(" ")}`;
        const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        return `${minutes} min.`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const readTime = calculateReadTime();

    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto py-8 sm:py-12 md:py-16 px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-16 items-start">
                    {/* Left Sidebar Info Cards */}
                    <div className="flex flex-col gap-5 lg:sticky lg:top-8">
                        {/* Block 1: Author & Category */}
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

                        {/* Block 2: Read Time, Published, Updated */}
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

                    {/* Right Main Article Content */}
                    <div className="flex flex-col">
                        <h1 className="font-[Geist] text-[1.85rem] sm:text-[2.3rem] lg:text-[2.75rem] font-semibold leading-[1.18] tracking-normal text-[#0F172A] mb-6 md:mb-8">
                            {blog.title}
                        </h1>

                        <div className="font-[Geist] text-base sm:text-lg leading-relaxed text-black/80 space-y-6">
                            {blog.description && (
                                <p className="font-normal text-black/80 leading-relaxed">
                                    {blog.description}
                                </p>
                            )}

                            {blog.points && blog.points.length > 0 && (
                                <div className="space-y-4 my-6">
                                    {blog.points.map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3.5">
                                            <CheckCircle2 size={20} strokeWidth={1.5} className="text-black/80 shrink-0 mt-0.5" />
                                            <span className="font-normal text-black/85 leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
