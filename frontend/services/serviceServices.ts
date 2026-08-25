import { axiosInstance } from "@/app/utils/axios";

export async function getAllServices() {
    try {
        const res = await axiosInstance.get(`/services/get-all-services`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return null;
    }
}

export async function getServiceById(id: string) {
    try {
        const res = await axiosInstance.get(`/services/get-service-by-id/${id}`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch service with id ${id}:`, error);
        return null;
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        const res = await axiosInstance.get(`/services/get-service-by-slug/${slug}`);
        if (!res.data.success) {
            return null;
        }
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch service with slug ${slug}:`, error);
        return null;
    }
}

export async function createService(data: FormData) {
    return await axiosInstance.post("/services/create-service", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export async function updateService(id: string, data: FormData) {
    return await axiosInstance.put(`/services/update-service/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export async function deleteService(id: string) {
    return await axiosInstance.delete(`/services/delete-service/${id}`);
}
