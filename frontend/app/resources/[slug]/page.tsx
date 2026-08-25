import { Metadata, ResolvingMetadata } from "next";
import { getBlogBySlug } from "@/services/blogServices";
import Hero6 from "@/components/common/Hero6";
import BlogDetails from "@/components/resources/BlogDetails";
import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    if (!blog) return { title: "Blog Not Found" };

    const imagePath = getImageUrl(blog.image);

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

    const blog = await getBlogBySlug(slug);
    if (!blog) return notFound();

    const imagePath = getImageUrl(blog.image);

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
        <main className="bg-[#FFFFFF]">
            <Hero6
                title={blog.title}
                publishedDate={formatDate(blog.createdAt)}
                readTime={calculateReadTime()}
                author={blog.author}
                category={blog.category}
                image={imagePath}
                className="h-[100vh] lg:h-screen min-h-[600px]"
            />
            <BlogDetails blog={blog} />
            <FeaturedBlogs />
        </main>
    );
}