export interface ConsultationPayload {
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
