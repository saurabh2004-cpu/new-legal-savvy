"use client";

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { createConsultation } from "../../services/consultation.service";
import { ConsultationPayload } from "../../types/consultation";

/* ───────────────── Types ───────────────── */

interface FormData {
    name: string;
    phone: string;
    alternatePhone: string;
    email: string;
    city: string;
    customCity: string;
    maritalStatus: string;
    spouseIncome: string;
    employmentStatus: string;
    monthlyIncome: string;
    creditCardDues: string;
    personalLoanDues: string;
    paymentStatus: string;
    facingHarassment: string;
    receivedLegalNotice: string;
    settlementTime: string;
    anyPastSettlement: string;
    fundsRequirement: string;
    preferredLanguage: string;
    receivedSettlementLetter: string;
    convenientCallTime: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

interface InputFieldProps {
    label: string;
    type?: "text" | "tel" | "email";
    name: keyof FormData;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
}

interface SelectFieldProps {
    label: string;
    name: keyof FormData;
    value: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    options: string[];
    error?: string;
}

/* ───────────────── Shared Styles ───────────────── */

const fieldClass =
    "w-full bg-transparent outline-none border-none text-[0.82rem] md:text-[0.88rem] text-black placeholder:text-black/30";

const fieldStyle = {
    fontFamily: "Geist",
    fontWeight: 300,
    fontSize: "var(--field-font-size, 20px)",
    lineHeight: "120%",
    letterSpacing: "0%",
    leadingTrim: "none",
    color: "black",
} as any;

/* ───────────────── Inputs ───────────────── */

const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    error,
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!value;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`relative border-b pt-6 pb-2 transition-colors duration-300 ${error ? "border-red-500" : isFocused ? "border-black/30" : "border-black/10"
                }`}
        >
            <label
                className={`absolute left-0 origin-left transition-all duration-200 ease-out pointer-events-none
                    ${isFocused || hasValue
                        ? "-translate-y-5 sm:-translate-y-6 lg:-translate-y-7 scale-75 text-black/45"
                        : "translate-y-0 scale-100 text-black/70"
                    } ${error ? "!text-red-500" : ""}`}
                style={{
                    ...fieldStyle,
                    bottom: "8px",
                }}
            >
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={fieldClass}
                style={fieldStyle}
            />
            {error && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-sans">{error}</span>}
        </motion.div>
    );
};

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    error,
}: SelectFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`border-b pb-3 relative transition-colors duration-300 ${error ? "border-red-500" : isOpen ? "border-black/30" : "border-black/10"}`}
        >
            <label
                className={`mb-2 block ${error ? "text-red-500" : "text-black/55"}`}
                style={fieldStyle}
            >
                {label}
            </label>

            <div className="relative" ref={wrapperRef}>
                <div
                    className={`${fieldClass} flex justify-between items-center cursor-pointer select-none`}
                    style={fieldStyle}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={value ? "text-black" : "text-black/30"}>
                        {value || "- Select -"}
                    </span>
                    <ChevronDown className={`absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform duration-300 pointer-events-none ${isOpen ? "rotate-180" : ""} ${error ? "text-red-500" : "text-black/40"}`} />
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-[100] mt-4 w-full max-h-[16rem] overflow-y-auto rounded-xl bg-[#E6DCD6] shadow-[0_10px_40px_rgba(0,0,0,0.15)] custom-scrollbar py-2 border border-black/5"
                        >
                            <div
                                onClick={() => handleSelect("")}
                                className={`px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-[#CDC2BB] ${value === "" ? "bg-[#CDC2BB] font-medium" : ""} text-[0.82rem] md:text-[0.88rem] text-black`}
                                style={fieldStyle}
                            >
                                - Select -
                            </div>
                            {options.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => handleSelect(opt)}
                                    className={`px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-[#CDC2BB] ${value === opt ? "bg-[#CDC2BB] font-medium" : ""} text-[0.82rem] md:text-[0.88rem] text-black`}
                                    style={fieldStyle}
                                >
                                    {opt}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {error && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-sans">{error}</span>}
        </motion.div>
    );
};

/* ───────────────── Data ───────────────── */

const CITIES = ["Delhi NCR", "Mumbai", "Hyderabad", "Pune", "Chennai", "Bengaluru", "Kolkata", "Others"];
const MARITAL_STATUS = ["Single", "Married"];
const EMPLOYMENT_STATUS = ["Not Employed", "Salaried", "Small Business", "Large Business"];
const INCOME_OPTIONS = ["No Income", "Below ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹75,000", "₹75,000 - ₹1,00,000", "Above ₹1,00,000"];
const CREDIT_CARD_DUES = ["No Dues", "Below ₹50,000", "₹50,000 - ₹1 Lakh", "₹1 Lakh - ₹5 Lakhs", "₹5 Lakhs - ₹10 Lakhs", "₹10 Lakhs - ₹20 Lakhs", "Above ₹20 Lakhs"];
const LOAN_DUES = ["No Dues", "Below ₹50,000", "₹50,000 - ₹1 Lakh", "₹1 Lakh - ₹5 Lakhs", "₹5 Lakhs - ₹10 Lakhs", "₹10 Lakhs - ₹20 Lakhs", "Above ₹20 Lakhs"];
const CALL_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];
const YES_NO = ["Yes", "No"];
const PAYMENT_STATUS = ["Regular", "Delayed", "Missed Payments", "NPA"];
const HARASSMENT_OPTIONS = ["No Harassment", "Facing Some Harassment (Getting Recovery Calls)", "Facing Severe Harassment"];
const SETTLEMENT_TIMES = ["Within 1 Month", "Within 3 Months", "Within 6 Months", "Within 12 Months"];
const FUNDS_REQUIREMENT = ["I can arrange Rs.1000 in 1-2 Days", "I can arrange Rs.1000 in 2-3 Days", "I cannot arrange Rs.1000 for starting the settlement process"];
const LANGUAGES = ["Comfortable with English (Suggested)", "Hindi", "Kannada", "Malayalam", "Telugu", "Tamil", "Other"];

const INITIAL_FORM_DATA: FormData = {
    name: "",
    phone: "",
    alternatePhone: "",
    email: "",
    city: "",
    customCity: "",
    maritalStatus: "",
    spouseIncome: "",
    employmentStatus: "",
    monthlyIncome: "",
    creditCardDues: "",
    personalLoanDues: "",
    paymentStatus: "",
    facingHarassment: "",
    receivedLegalNotice: "",
    settlementTime: "",
    anyPastSettlement: "",
    fundsRequirement: "",
    preferredLanguage: "",
    receivedSettlementLetter: "",
    convenientCallTime: "",
    message: "",
};

/* ───────────────── Main Component ───────────────── */

export default function BookConsultation() {
    const pathname = usePathname();
    const isServiceDetailsPage = pathname === "/service-details";

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);

    // Derived states for conditional rendering
    const showCustomCity = formData.city === "Others";
    const showSpouseIncome = formData.maritalStatus === "Married";
    const showLoanSection = formData.personalLoanDues !== "";
    const showLegalNotice = showLoanSection && formData.facingHarassment === "Facing Severe Harassment";
    const showSettlementTime = showLoanSection && formData.facingHarassment === "Facing Some Harassment (Getting Recovery Calls)";
    const showSettlementLetter = formData.creditCardDues !== "" || (showLoanSection && formData.anyPastSettlement === "Yes");

    useEffect(() => {
        const section = sectionRef.current;
        const formContainer = formContainerRef.current;
        if (!section || !formContainer) return;

        const handleWheel = (e: WheelEvent) => {
            if (window.innerWidth < 1024) return;

            const { scrollTop, scrollHeight, clientHeight } = formContainer;
            const delta = e.deltaY;

            const isScrollable = scrollHeight > clientHeight;
            if (!isScrollable) return;

            const isAtTop = scrollTop === 0;
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1.5;

            const scrollingUp = delta < 0;
            const scrollingDown = delta > 0;

            if ((scrollingUp && !isAtTop) || (scrollingDown && !isAtBottom)) {
                e.preventDefault();
                formContainer.scrollBy({
                    top: delta,
                    behavior: "auto"
                });
            }
        };

        section.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            section.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        }
    };

    const handleSelectChange = (
        e: { target: { name: string; value: string } }
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            // Handle cascading state resets visually
            if (name === 'city' && value !== 'Others') newData.customCity = '';
            if (name === 'maritalStatus' && value !== 'Married') newData.spouseIncome = '';
            if (name === 'facingHarassment' && value !== 'Facing Severe Harassment') newData.receivedLegalNotice = '';
            if (name === 'facingHarassment' && value !== 'Facing Some Harassment (Getting Recovery Calls)') newData.settlementTime = '';
            if (name === 'personalLoanDues' && value === '') {
                newData.paymentStatus = '';
                newData.facingHarassment = '';
                newData.receivedLegalNotice = '';
                newData.settlementTime = '';
                newData.anyPastSettlement = '';
                newData.fundsRequirement = '';
                newData.preferredLanguage = '';
                newData.message = '';
            }

            return newData;
        });

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        // Validations
        if (!formData.name || formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
        if (!formData.alternatePhone || !/^\d{10}$/.test(formData.alternatePhone)) newErrors.alternatePhone = "Alternate phone must be 10 digits";
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";

        if (!formData.city) newErrors.city = "City is required";
        if (showCustomCity && !formData.customCity) newErrors.customCity = "Custom city is required";

        if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
        if (showSpouseIncome && !formData.spouseIncome) newErrors.spouseIncome = "Spouse income is required";

        if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required";
        if (!formData.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required";
        if (!formData.creditCardDues) newErrors.creditCardDues = "Credit card dues is required";
        if (!formData.personalLoanDues) newErrors.personalLoanDues = "Loan dues is required";

        if (showLoanSection) {
            if (!formData.paymentStatus) newErrors.paymentStatus = "Payment status is required";
            if (!formData.facingHarassment) newErrors.facingHarassment = "This field is required";
            if (showLegalNotice && !formData.receivedLegalNotice) newErrors.receivedLegalNotice = "This field is required";
            if (showSettlementTime && !formData.settlementTime) newErrors.settlementTime = "Settlement time is required";
            if (!formData.anyPastSettlement) newErrors.anyPastSettlement = "This field is required";
            if (!formData.fundsRequirement) newErrors.fundsRequirement = "Funds requirement is required";
            if (!formData.preferredLanguage) newErrors.preferredLanguage = "Preferred language is required";
        }

        if (showSettlementLetter && !formData.receivedSettlementLetter) newErrors.receivedSettlementLetter = "This field is required";
        if (!formData.convenientCallTime) newErrors.convenientCallTime = "Call time is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clean payload for submission
        const cleanedData: any = { ...formData };
        if (!showCustomCity) delete cleanedData.customCity;
        if (!showSpouseIncome) delete cleanedData.spouseIncome;
        if (!showSettlementLetter) delete cleanedData.receivedSettlementLetter;
        if (!showLoanSection) {
            delete cleanedData.paymentStatus;
            delete cleanedData.facingHarassment;
            delete cleanedData.receivedLegalNotice;
            delete cleanedData.settlementTime;
            delete cleanedData.anyPastSettlement;
            delete cleanedData.fundsRequirement;
            delete cleanedData.preferredLanguage;
            delete cleanedData.message;
        } else {
            if (!showLegalNotice) delete cleanedData.receivedLegalNotice;
            if (!showSettlementTime) delete cleanedData.settlementTime;
        }

        // Map to expected API payload
        const payload: ConsultationPayload = {
            name: cleanedData.name,
            phone: cleanedData.phone,
            alternatePhone: cleanedData.alternatePhone,
            email: cleanedData.email,
            city: cleanedData.city,
            customCity: cleanedData.customCity,
            maritalStatus: cleanedData.maritalStatus,
            spouseIncome: cleanedData.spouseIncome,
            employmentStatus: cleanedData.employmentStatus,
            monthlyIncome: cleanedData.monthlyIncome,
            totalCreditCardDues: cleanedData.creditCardDues,
            totalLoanDues: cleanedData.personalLoanDues,
            convenientCallTime: cleanedData.convenientCallTime,
            paymentStatus: cleanedData.paymentStatus,
            facingHarassment: cleanedData.facingHarassment,
            receivedLegalNotice: cleanedData.receivedLegalNotice,
            settlementTime: cleanedData.settlementTime,
            pastSettlement: cleanedData.anyPastSettlement,
            receivedSettlementLetter: cleanedData.receivedSettlementLetter,
            fundsRequirement: cleanedData.fundsRequirement,
            preferredLanguage: cleanedData.preferredLanguage,
            message: cleanedData.message,
        };

        setIsSubmitting(true);
        try {
            await createConsultation(payload);
            toast.success("Consultation request submitted successfully!");
            setFormData(INITIAL_FORM_DATA);
            setErrors({});
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`w-full px-4 py-6 lg:py-12 sm:px-6 md:px-8 lg:px-10 [--field-font-size:16px] md:[--field-font-size:18px] lg:[--field-font-size:20px] bg-[#CDC2BB] max-w-[97vw] mx-auto rounded-xl`}
        >
            <Toaster position="top-center" />
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.12); border-radius: 9999px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.25); }
            `}} />
            <div className="mx-auto flex justify-between flex-col gap-8 lg:flex-row lg:gap-16">

                {/* LEFT CONTENT */}
                <div className="px-0 lg:px-12 lg:sticky lg:top-10 lg:self-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:pt-8"
                    >
                        <h1 className="font-[Geist] font-semibold text-[2.4rem] md:text-[3.125rem] leading-[120%] tracking-[0%] text-black">
                            Book Consultation
                        </h1>

                        <div className="mt-8 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5">
                                    <Mail className="h-3.5 w-3.5 text-black/70" />
                                </div>
                                <span className="font-[Geist] font-normal text-[1rem] md:text-[1.125rem] leading-[120%] tracking-[0%] text-black/75">
                                    legal@thelegalstore.com
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5">
                                    <Phone className="h-3.5 w-3.5 text-black/70" />
                                </div>
                                <span className="font-[Geist] font-normal text-[1rem] md:text-[1.125rem] leading-[120%] tracking-[0%] text-black/75">
                                    +91 9230445513
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT FORM */}
                <motion.div
                    ref={formContainerRef}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[1.2rem] px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 lg:max-w-[48rem] scroll-smooth custom-scrollbar shadow-[0_10px_30px_rgba(0,0,0,0.03)] bg-[#E6DCD6]"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7"
                    >
                        <motion.div layout className="md:col-span-2 lg:col-span-1">
                            <InputField label="Name *" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <InputField label="Phone / Mobile *" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <InputField label="Alternate Phone / Mobile *" type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} error={errors.alternatePhone} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <InputField label="Email *" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="City *" name="city" value={formData.city} onChange={handleSelectChange} options={CITIES} error={errors.city} />
                        </motion.div>

                        <AnimatePresence>
                            {showCustomCity && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-1 lg:col-span-1"
                                >
                                    <InputField label="Please add your City *" name="customCity" value={formData.customCity} onChange={handleInputChange} error={errors.customCity} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Marital Status *" name="maritalStatus" value={formData.maritalStatus} onChange={handleSelectChange} options={MARITAL_STATUS} error={errors.maritalStatus} />
                        </motion.div>

                        <AnimatePresence>
                            {showSpouseIncome && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-1 lg:col-span-1"
                                >
                                    <SelectField label="Spouse Income *" name="spouseIncome" value={formData.spouseIncome} onChange={handleSelectChange} options={INCOME_OPTIONS} error={errors.spouseIncome} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Employment Status *" name="employmentStatus" value={formData.employmentStatus} onChange={handleSelectChange} options={EMPLOYMENT_STATUS} error={errors.employmentStatus} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Monthly Income *" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleSelectChange} options={INCOME_OPTIONS} error={errors.monthlyIncome} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Total Credit Card Dues *" name="creditCardDues" value={formData.creditCardDues} onChange={handleSelectChange} options={CREDIT_CARD_DUES} error={errors.creditCardDues} />
                        </motion.div>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Total Personal and Business Loan Dues *" name="personalLoanDues" value={formData.personalLoanDues} onChange={handleSelectChange} options={LOAN_DUES} error={errors.personalLoanDues} />
                        </motion.div>

                        <AnimatePresence>
                            {showLoanSection && (
                                <>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="md:col-span-1 lg:col-span-1"
                                    >
                                        <SelectField label="Payment Status *" name="paymentStatus" value={formData.paymentStatus} onChange={handleSelectChange} options={PAYMENT_STATUS} error={errors.paymentStatus} />
                                    </motion.div>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="md:col-span-1 lg:col-span-1"
                                    >
                                        <SelectField label="Facing Harassment? *" name="facingHarassment" value={formData.facingHarassment} onChange={handleSelectChange} options={HARASSMENT_OPTIONS} error={errors.facingHarassment} />
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showLegalNotice && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-1 lg:col-span-1"
                                >
                                    <SelectField label="Received Legal Notice? *" name="receivedLegalNotice" value={formData.receivedLegalNotice} onChange={handleSelectChange} options={YES_NO} error={errors.receivedLegalNotice} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showSettlementTime && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-1 lg:col-span-1"
                                >
                                    <SelectField label="Settlement Time *" name="settlementTime" value={formData.settlementTime} onChange={handleSelectChange} options={SETTLEMENT_TIMES} error={errors.settlementTime} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showLoanSection && (
                                <>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="md:col-span-1 lg:col-span-1"
                                    >
                                        <SelectField label="Any Past Settlement? *" name="anyPastSettlement" value={formData.anyPastSettlement} onChange={handleSelectChange} options={YES_NO} error={errors.anyPastSettlement} />
                                    </motion.div>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="md:col-span-1 lg:col-span-1"
                                    >
                                        <SelectField label="Settlement Starting Funds Requirement *" name="fundsRequirement" value={formData.fundsRequirement} onChange={handleSelectChange} options={FUNDS_REQUIREMENT} error={errors.fundsRequirement} />
                                    </motion.div>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="md:col-span-1 lg:col-span-1"
                                    >
                                        <SelectField label="Preferred Language for Communication *" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleSelectChange} options={LANGUAGES} error={errors.preferredLanguage} />
                                    </motion.div>


                                </>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showSettlementLetter && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:col-span-1 lg:col-span-1"
                                >
                                    <SelectField label="Received Settlement Letter? *" name="receivedSettlementLetter" value={formData.receivedSettlementLetter} onChange={handleSelectChange} options={YES_NO} error={errors.receivedSettlementLetter} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div layout className="md:col-span-1 lg:col-span-1">
                            <SelectField label="Convenient Call Time *" name="convenientCallTime" value={formData.convenientCallTime} onChange={handleSelectChange} options={CALL_TIMES} error={errors.convenientCallTime} />
                        </motion.div>



                        <motion.div layout className="md:col-span-2 lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.4 }}
                                className="pt-1"
                            >
                                <label className="mb-2 block text-black/55" style={fieldStyle}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Tell us more about your financial situation..."
                                    className="min-h-[5rem] w-full resize-none rounded-[0.7rem] bg-[#F0ECE7] px-4 py-3 outline-none font-[Geist] text-black placeholder:text-black/30"
                                    style={fieldStyle}
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div layout className="md:col-span-2 lg:col-span-1">
                            <motion.div whileHover={isSubmitting ? {} : { scale: 1.03 }} whileTap={isSubmitting ? {} : { scale: 0.98 }} className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`rounded-full px-6 py-2.5 font-[Geist] text-[0.82rem] font-medium text-white shadow-[0_6px_20px_rgba(255,59,48,0.25)] transition-all duration-300 ${isSubmitting ? 'bg-[#ff2d20]/70 cursor-not-allowed' : 'bg-[#ff3b30] hover:bg-[#ff2d20]'}`}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </motion.div>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}