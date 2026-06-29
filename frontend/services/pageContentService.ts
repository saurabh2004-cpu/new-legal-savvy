import { axiosInstance } from "@/app/utils/axios";

export async function getPageData(slug: string) {
    try {
        const res = await axiosInstance.get(`/page-contents/get-page-content-by-slug/${slug}`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error("Failed to fetch page content:", error);
        return null;
    }
}

export async function getAllPagesData() {
    try {
        const res = await axiosInstance.get(`/page-contents/get-all-page-contents`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data; 
    } catch (error) {
        console.error("Failed to fetch page content:", error);
        return null;
    }
}
