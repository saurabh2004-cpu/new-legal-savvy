export interface FaqItem {
  question: string;
  answer: string;
}

export type FaqPageKey =
  | "home"
  | "about"
  | "service"
  | "resources"
  | "contact";

export const faqs: Record<FaqPageKey, FaqItem[]> = {
  home: [
    {
      question: "What does a loan settlement company do?",
      answer:
        "A loan settlement company negotiates with your bank or NBFC on your behalf to agree a reduced, one-time payoff instead of the full outstanding balance. At Legal Savvy this negotiation is handled by our legal team and follows the RBI Fair Practices Code, with each offer confirmed to you in writing.",
    },
    {
      question: "Do I need a lawyer for loan settlement in India?",
      answer:
        "You are not legally required to hire a lawyer to settle a loan, but a legal team reviews the settlement letter, NOC, and No-Dues Certificate for enforceability, and can represent you if a dispute reaches the Debt Recovery Tribunal or Banking Ombudsman.",
    },
    {
      question:
        "How is RBI-compliant loan settlement different from an informal settlement?",
      answer:
        "An RBI-compliant process follows the Reserve Bank of India Fair Practices Code for lenders and recovery agents, so communication is documented and recovery-agent conduct is restricted. An informal settlement negotiated outside this framework has no such safeguards.",
    },
    {
      question:
        "What is the difference between a loan settlement company and a debt settlement company?",
      answer:
        "In India the two terms are largely used interchangeably for a company that negotiates a reduced payoff with your lender. What differs between providers is who does the negotiating, a licensed legal team or an unregulated agent, and whether the settlement is documented in writing.",
    },
  ],

  about: [
    {
      question:
        "Is Legal Savvy a law firm or a loan settlement company?",
      answer:
        "Legal Savvy is a debt settlement company in India staffed by licensed advocates, not a traditional law firm. That distinction matters for loan settlement specifically: an advocate can draft your settlement letter and represent you before the Debt Recovery Tribunal or Banking Ombudsman if a dispute arises, which a non-legal agent cannot do.",
    },
    {
      question:
        "Can I meet the lawyer handling my loan settlement case?",
      answer:
        "Yes. Unlike settlement agencies that route your case through a call centre, Legal Savvy assigns your case to a specific advocate you can speak with directly throughout the negotiation, from the first offer to the final closure letter.",
    },
    {
      question:
        "How do I check if a debt settlement company in India is legitimate?",
      answer:
        "Ask whether your case is handled by a licensed advocate, whether every offer and settlement is confirmed in writing, and whether the company follows the RBI Fair Practices Code for lender communication. A legitimate company will answer all three without hesitation.",
    },
    {
      question:
        "What happens to my case if a loan settlement company shuts down?",
      answer:
        "This is why written documentation matters: if a settlement company stops operating mid-process, a signed settlement letter or One-Time Settlement (OTS) agreement with your lender stays valid, because it is an agreement between you and the bank, not the settlement company.",
    },
  ],

  service: [
    {
      question:
        "What is the difference between a personal loan settlement and an NBFC loan settlement?",
      answer:
        "The negotiation process is similar, but NBFCs follow the RBI Fair Practices Code for NBFCs rather than the code that applies to banks. Legal Savvy checks which framework applies to your lender before starting negotiations, since it affects the timeline and what recovery conduct is permitted.",
    },
    {
      question:
        "Can I settle a credit card debt the same way as a personal loan?",
      answer:
        "Yes, though credit card debt is unsecured and often carries a higher interest rate, so the outstanding balance can grow faster while a settlement is negotiated. Legal Savvy factors this into the timeline and negotiates directly with your card issuer where possible.",
    },
    {
      question:
        "What counts as a One-Time Settlement (OTS) versus a regular repayment plan?",
      answer:
        "A One-Time Settlement closes your loan account with a single negotiated payment for less than the full outstanding balance. A repayment plan keeps the loan open and has you continue paying EMIs, sometimes restructured. Legal Savvy confirms which one your lender is actually offering before you agree to anything.",
    },
    {
      question:
        "Since an unsecured loan has no collateral, can the bank seize my property to recover it?",
      answer:
        "No. An unsecured loan, such as a personal loan, credit card, or most digital lending app loans, has no asset attached that a lender can seize directly. A lender can still pursue recovery through calls, notices, or the Debt Recovery Tribunal, but not through repossession.",
    },
  ],

  resources: [
    {
      question: "What topics do your articles cover?",
      answer:
        "Our blog covers loan settlement processes, RBI guidelines, borrower rights under the Fair Practices Code, CIBIL score management, SARFAESI and Sec 138 explainers, and real-world settlement case studies. Every article is reviewed by our legal team for accuracy.",
    },
    {
      question: "Can I use your articles as legal advice?",
      answer:
        "Our articles are educational and informational. They explain how settlement works, what the law says, and what to expect, but they are not a substitute for advice specific to your situation. For that, speak with one of our advocates directly.",
    },
    {
      question: "How often do you publish new content?",
      answer:
        "We publish new articles and case studies regularly, covering changes in RBI policy, notable settlement outcomes, and practical guidance for borrowers. Subscribe to stay updated.",
    },
    {
      question: "Do you share real settlement case studies?",
      answer:
        "Yes. We publish anonymised case studies that describe the type of loan, the lender, the hardship situation, and the outcome. These help prospective clients understand what is realistic and how the process works in practice.",
    },
    {
      question: "Can I suggest a topic for your blog?",
      answer:
        "Absolutely. If there is a specific question about loan settlement, borrower rights, or bank recovery practices that you would like us to cover, reach out through our contact page and we will consider it for a future article.",
    },
  ],

  contact: [
    {
      question: "What treatments do you offer?",
      answer: "We offer a full range of dental treatments under one roof, including dental implants, orthodontics (Invisalign and fixed braces), teeth whitening, porcelain veneers, smile design, crowns and bridges, composite bonding, and preventive and general dentistry. Our multidisciplinary team covers all dental specialties without the need for external referrals."
    },
    {
      question: "How do I book as a new patient?",
      answer: "We accept new patients and welcome patients from all backgrounds, including those who have not visited a dentist in a long time. We recommend booking an initial consultation as a first step — this gives us time to carry out a full assessment, understand your dental history and goals, and discuss all available treatment options without pressure. You can book online or call our reception team directly."
    },
    {
      question: "How does the treatment planning process work?",
      answer: "Every treatment begins with a thorough examination, intraoral photographs, and the relevant diagnostic imaging (digital X-rays or 3D CBCT scan). From this assessment, we prepare a written treatment plan outlining all proposed procedures, sequencing, expected timelines, and full cost breakdown before any clinical work begins. You are never committed to anything without your explicit agreement."
    },
    {
      question: "How long does treatment take?",
      answer: "It depends on the treatment. Teeth whitening and composite bonding can often be completed in a single appointment. Porcelain veneers typically require two to three visits. Dental implants involve a phased process over three to six months, depending on bone condition and the restoration chosen. Orthodontic treatment ranges from six months to two years. We will give you a clear timeline at your consultation."
    }
  ],
};