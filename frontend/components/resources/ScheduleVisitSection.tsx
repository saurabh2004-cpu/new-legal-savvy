"use client";

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

/* ───────────────── Types ───────────────── */

interface FormData {
    name: string;
    phone: string;
    alternatePhone: string;
    email: string;
    gender: string;
    city: string;
    monthlyIncome: string;
    creditCardDues: string;
    personalLoanDues: string;
    paymentStatus: string;
    facingHarassment: string;
    resolutionFunds: string;
    preferredLanguage: string;
    message: string;
}

interface RadioOption {
    value: string;
    label: string;
}

interface InputFieldProps {
    label: string;
    type?: "text" | "tel" | "email";
    name: keyof FormData;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectFieldProps {
    label: string;
    name: keyof FormData;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    long?: boolean;
}

interface RadioGroupProps {
    label: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
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
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!value;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`relative border-b pt-6 pb-2 transition-colors duration-300 ${isFocused ? "border-black/30" : "border-black/10"
                }`}
        >
            <label
                className={`absolute left-0 origin-left transition-all duration-200 ease-out pointer-events-none
                    ${isFocused || hasValue
                        ? "-translate-y-5 sm:-translate-y-6 lg:-translate-y-7 scale-75 text-black/45"
                        : "translate-y-0 scale-100 text-black/70"
                    }`}
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
        </motion.div>
    );
};

const SelectField = ({
    label,
    name,
    value,
    onChange,
    children,
    long = false,
}: SelectFieldProps) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="border-b border-black/10 pb-3"
    >
        <label
            className="mb-2 block text-black/55"
            style={fieldStyle}
        >
            {label}
        </label>

        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${fieldClass} appearance-none pr-6 cursor-pointer`}
                style={fieldStyle}
            >
                {children}
            </select>

            <ChevronDown className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 pointer-events-none" />
        </div>
    </motion.div>
);

const RadioGroup = ({
    label,
    options,
    value,
    onChange,
}: RadioGroupProps) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="border-b border-black/10 pb-3"
    >
        <p
            className="mb-3 text-black/55"
            style={fieldStyle}
        >
            {label}
        </p>

        <div className="space-y-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => onChange(option.value)}
                >
                    <div
                        className={`flex h-[0.82rem] w-[0.82rem] items-center justify-center rounded-full border transition-all ${value === option.value
                            ? "border-[#ff4d3f]"
                            : "border-black/30"
                            }`}
                    >
                        {value === option.value && (
                            <div className="h-[0.38rem] w-[0.38rem] rounded-full bg-[#ff4d3f]" />
                        )}
                    </div>

                    <span className="font-[Geist] text-[0.76rem] text-black/80">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    </motion.div>
);

/* ───────────────── Data ───────────────── */

const EMPLOYMENT_OPTIONS: RadioOption[] = [
    { value: "not-employed", label: "Not Employed" },
    { value: "salaried", label: "Working as salaried Employee" },
    { value: "self-employed", label: "Self-employed / Small Business" },
    { value: "large-business", label: "Medium or Large Business" },
];

const SETTLEMENT_OPTIONS: RadioOption[] = [
    { value: "yes", label: "Yes, Have Done" },
    { value: "no", label: "No, Have Not Done" },
];

const INITIAL_FORM_DATA: FormData = {
    name: "",
    phone: "",
    alternatePhone: "",
    email: "",
    gender: "",
    city: "",
    monthlyIncome: "",
    creditCardDues: "",
    personalLoanDues: "",
    paymentStatus: "",
    facingHarassment: "",
    resolutionFunds: "",
    preferredLanguage: "",
    message: "",
};

/* ───────────────── Main Component ───────────────── */

export default function ScheduleVisitSection() {
    const [employment, setEmployment] = useState("self-employed");
    const [pastSettlement, setPastSettlement] = useState("no");
    const pathname = usePathname();

    const isServiceDetailsPage = pathname === "/service-details";

    const [formData, setFormData] =
        useState<FormData>(INITIAL_FORM_DATA);

    const sectionRef = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);

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
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectChange = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleTextAreaChange = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            ...formData,
            employment,
            pastSettlement,
        });
    };

    return (
        <section className="w-full py-1 px-2">
            <section
                ref={sectionRef}
                className="w-full max-w-8xl mx-auto py-4 pt-8 sm:pt-12 lg:pt-16 font-[Geist] text-black"
            >
                <div className="max-w-2xl lg:ml-40">
                    {/* TABS */}
                    <div className="flex items-center gap-6 mb-8 text-[0.95rem] md:text-[1rem]">
                        <button
                            className="
                            font-[Geist]
                            font-semibold
                            text-[1.5rem]
                            leading-[100%]
                            tracking-[0%]
                            capitalize
                            underline
                            underline-offset-8
                            decoration-solid
                            text-black
                            pb-1 
                        "
                        >
                            Forms
                        </button>
                        <button
                            className="
                        font-[Geist]
                        font-normal
                        text-[1.5rem]
                        leading-[100%]
                        tracking-[0%]
                        capitalize
                        text-[rgba(0,0,0,0.63)]
                        pb-1
                    "
                        >
                            Clinics
                        </button>

                        <button
                            className="
                            font-[Geist]
                            font-normal
                            text-[1.5rem]
                            leading-[100%]
                            tracking-[0%]
                            capitalize
                            text-[rgba(0,0,0,0.63)]
                            pb-1
                        "
                        >
                            Newsletter
                        </button>
                    </div>

                    {/* HEADING */}
                    <h1 className="w-[22.4375rem] h-[3.25rem] font-[Geist] text-[2rem] md:text-[2.25rem] font-semibold leading-[120%] tracking-[0%] text-black mb-4">
                        Schedule your visit
                    </h1>

                    {/* FORM CONTAINER */}
                    <motion.div
                        ref={formContainerRef}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full rounded-xl px-5 py-8 sm:px-10 sm:py-12 bg-[#C6BAB2]"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-y-3 sm:gap-y-4"
                        >
                            <InputField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                            <InputField
                                label="Phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />

                            <InputField
                                label="Alternate Phone Number"
                                type="tel"
                                name="alternatePhone"
                                value={formData.alternatePhone}
                                onChange={handleInputChange}
                            />

                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />

                            <SelectField
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </SelectField>

                            <SelectField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="nagpur">Nagpur</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="pune">Pune</option>
                            </SelectField>

                            <div className="pt-2">
                                <RadioGroup
                                    label="Employment Status"
                                    options={EMPLOYMENT_OPTIONS}
                                    value={employment}
                                    onChange={setEmployment}
                                />
                            </div>

                            <SelectField
                                label="Monthly Income"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="15k">₹15K - ₹25K</option>
                                <option value="50k">₹25K - ₹50K</option>
                            </SelectField>

                            <SelectField
                                label="Total Credit Card Dues"
                                name="creditCardDues"
                                value={formData.creditCardDues}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="1l">₹1L - ₹3L</option>
                                <option value="5l">₹5L - ₹10L</option>
                            </SelectField>

                            <SelectField
                                label="Total Personal Loan Dues"
                                name="personalLoanDues"
                                value={formData.personalLoanDues}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="1l">₹1L - ₹3L</option>
                                <option value="5l">₹5L - ₹10L</option>
                            </SelectField>

                            <SelectField
                                label="Payment Status"
                                name="paymentStatus"
                                value={formData.paymentStatus}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="regular">Regular</option>
                                <option value="defaulted">Defaulted</option>
                            </SelectField>

                            <SelectField
                                label="Facing Harassment ?"
                                name="facingHarassment"
                                value={formData.facingHarassment}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </SelectField>

                            <div className="pt-2">
                                <RadioGroup
                                    label="Any Past Settlement ?"
                                    options={SETTLEMENT_OPTIONS}
                                    value={pastSettlement}
                                    onChange={setPastSettlement}
                                />
                            </div>

                            <SelectField
                                long
                                label="Can you start resolution process with Rs.1,000 or Rs. 3,000 and arrange additional funds towards first instalment later. Is that manageable for you?"
                                name="resolutionFunds"
                                value={formData.resolutionFunds}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </SelectField>

                            <SelectField
                                long
                                label="What is your preferred language to communicate on Whatsapp or Phone Call ?"
                                name="preferredLanguage"
                                value={formData.preferredLanguage}
                                onChange={handleSelectChange}
                            >
                                <option value="" />
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="marathi">Marathi</option>
                            </SelectField>

                            {/* MESSAGE */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="pt-2"
                            >
                                <label
                                    className="mb-3 block text-black/55"
                                    style={fieldStyle}
                                >
                                    Message
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleTextAreaChange}
                                    rows={4}
                                    className="
                                    min-h-[7rem]
                                    w-full
                                    resize-none
                                    rounded-lg
                                    bg-[#F0ECE7]
                                    px-4 py-3
                                    outline-none
                                    font-[Geist]
                                    text-[0.82rem] md:text-[0.88rem]
                                    text-black
                                    border-none
                                "
                                    style={fieldStyle}
                                />
                            </motion.div>

                            {/* BUTTON */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="pt-6 flex"
                            >
                                <button
                                    type="submit"
                                    className="
                                  rounded-full
                                  bg-[#ff3b30]
                                  px-8 py-2.5
                                  font-[Geist]
                                  text-[0.9rem]
                                  font-medium
                                  text-white
                                  shadow-md
                                  transition-all
                                  duration-300
                                  hover:bg-[#ff2d20]
                                "
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </section>
    );
}