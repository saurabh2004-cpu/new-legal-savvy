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

export async function getBlogBySlug(slug: string) {
    try {
        const res = await axiosInstance.get(`/blogs/get-blog-by-slug/${slug}`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch blog with slug ${slug}:`, error);
        return null;
    }
}

export async function createBlog(data: FormData) {
    return await axiosInstance.post("/blogs/create-blog", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export async function updateBlog(id: string, data: FormData) {
    return await axiosInstance.put(`/blogs/update-blog/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export async function deleteBlog(id: string) {
    return await axiosInstance.delete(`/blogs/delete-blog/${id}`);
}

/**
 * @deprecated Slugs are now managed and returned directly by the backend API.
 */
export function generateSlug(title: string): string {
    if (!title) return "";
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
