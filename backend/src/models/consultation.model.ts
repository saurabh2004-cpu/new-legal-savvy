import mongoose, { Schema, Document } from "mongoose";

export interface IConsultation {
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  city: string;
  customCity?: string;
  maritalStatus: string;
  spouseIncome?: string;
  employmentStatus: string;
  monthlyIncome: string;
  totalCreditCardDues: string;
  totalLoanDues: string;
  convenientCallTime: string;
  
  // Conditional fields
  paymentStatus?: string;
  facingHarassment?: string;
  receivedLegalNotice?: string;
  settlementTime?: string;
  pastSettlement?: string;
  receivedSettlementLetter?: string;
  fundsRequirement?: string;
  preferredLanguage?: string;
  message?: string;
}

export interface ConsultationDocument extends IConsultation, Document {}

const consultationSchema = new Schema<ConsultationDocument>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    alternatePhone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    customCity: { type: String, trim: true },
    maritalStatus: { type: String, required: true, trim: true },
    spouseIncome: { type: String, trim: true },
    employmentStatus: { type: String, required: true, trim: true },
    monthlyIncome: { type: String, required: true, trim: true },
    totalCreditCardDues: { type: String, required: true, trim: true },
    totalLoanDues: { type: String, required: true, trim: true },
    convenientCallTime: { type: String, required: true, trim: true },
    
    // Conditional fields (not strictly required at DB schema level)
    paymentStatus: { type: String, trim: true },
    facingHarassment: { type: String, trim: true },
    receivedLegalNotice: { type: String, trim: true },
    settlementTime: { type: String, trim: true },
    pastSettlement: { type: String, trim: true },
    receivedSettlementLetter: { type: String, trim: true },
    fundsRequirement: { type: String, trim: true },
    preferredLanguage: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Consultation = mongoose.model<ConsultationDocument>("Consultation", consultationSchema);
