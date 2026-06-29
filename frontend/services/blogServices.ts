import { axiosInstance } from "@/app/utils/axios";

export async function getAllBlogs() {
    try {
        const res = await axiosInstance.get(`/blogs/get-all-blogs`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return null;
    }
}

export async function getBlogById(id: string) {
    try {
        const res = await axiosInstance.get(`/blogs/get-blog-by-id/${id}`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch blog with id ${id}:`, error);
        return null;
    }
}

export function generateSlug(title: string): string {
    if (!title) return "";
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
