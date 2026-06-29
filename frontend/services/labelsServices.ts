import { axiosInstance } from "@/app/utils/axios";

export const getLabelsByType = async (type: string) => {
    try {
        const response = await axiosInstance.get(`/labels/get-label-by-type/${type}`);
        return response.data.data;
    } catch (error) {
        return [];
    }
}