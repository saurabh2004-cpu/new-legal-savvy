import { axiosInstance } from "@/app/utils/axios";
import { ConsultationPayload } from "../types/consultation";

export async function createConsultation(data: ConsultationPayload) {
    try {
        const res = await axiosInstance.post("/consultations/create-consultation", data);
        return res.data;
    } catch (error: any) {
        console.error("Failed to create consultation:", error);
        throw error;
    }
}
