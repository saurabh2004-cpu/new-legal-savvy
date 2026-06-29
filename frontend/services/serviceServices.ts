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
