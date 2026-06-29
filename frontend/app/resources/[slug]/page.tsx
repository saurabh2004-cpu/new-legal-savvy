import { Metadata, ResolvingMetadata } from "next";
import { getAllBlogs, getBlogById, generateSlug } from "@/services/blogServices";
import ResourceHero from "@/components/resources/ResourceHero";
import BlogDetails from "@/components/resources/BlogDetails";
import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const allBlogs = await getAllBlogs();
    if (!allBlogs) return { title: "Blog Not Found" };

    const blogSummary = allBlogs.find((b: any) => generateSlug(b.title) === slug);
    if (!blogSummary) return { title: "Blog Not Found" };

    const blog = await getBlogById(blogSummary._id);
    if (!blog) return { title: "Blog Not Found" };

    const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace("/api/v1", "");
    const imagePath = blog.image?.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`;

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: [imagePath],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;


    // Fetch all blogs to match the slug
    const allBlogs = await getAllBlogs();
    if (!allBlogs) return notFound();

    const blogSummary = allBlogs.find((b: any) => generateSlug(b.title) === slug);
    if (!blogSummary) return notFound();

    // Fetch the specific blog details
    const blog = await getBlogById(blogSummary._id);


    if (!blog) return notFound();

    const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace("/api/v1", "");
    const imagePath = blog.image?.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`;

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const calculateReadTime = () => {
        const text = `${blog.description || ''} ${(blog.points || []).join(' ')}`;
        const wordCount = text.split(/\s+/).filter((word: string) => word.length > 0).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        return `${minutes} MIN.`;
    };

    return (
        <div className="bg-[#D8D0CA] min-h-screen ">
            <div className="px-2 pt-2">
                <ResourceHero
                    title={blog.title}
                    publishedDate={formatDate(blog.createdAt)}
                    readTime={calculateReadTime()}
                    author={blog.author}
                    category={blog.category}
                    image={imagePath}
                />
            </div>
            <BlogDetails blog={blog} />
            <FeaturedBlogs />
        </div>
    );
}