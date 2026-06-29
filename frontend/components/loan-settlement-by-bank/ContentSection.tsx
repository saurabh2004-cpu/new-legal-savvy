import Link from "next/link";

interface ContentSectionProps {
  bankName?: string;
}

export default function ContentSection({ bankName = "Tirap" }: ContentSectionProps) {
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <nav
            className="
                flex
                items-center
                gap-2
                text-[0.875rem]
                font-[Geist]
                font-normal
                leading-[100%]
                tracking-[0%]
                text-gray-500
                flex-wrap
              "
          >
            <Link
              href="/"
              className="
                font-[Geist]
                font-normal
                text-[0.875rem]
                leading-[100%]
                tracking-[0%]
                hover:text-blue-600
                transition-colors
              "
            >
              Home
            </Link>

            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            <Link
              href="/loan-settlement-by-bank"
              className="
              font-[Geist]
              font-semibold
              text-[0.875rem]
              leading-[100%]
              tracking-[0%]
              hover:text-blue-600
              transition-colors
            "
            >
              Loan Settlement by Bank
            </Link>

            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            <span
              className="
              font-[Geist]
              font-medium
              text-[0.95rem]
              leading-[100%]
              tracking-[0%]
              text-gray-900
            "
            >
              Loan Settlement in {bankName}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[97vw] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Sidebar - Table of Contents */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm border-b pb-4">
                Table of Contents
              </h3>
              <nav className="space-y-3 text-sm font-medium text-gray-600">
                <a href="#introduction" className="block hover:text-blue-600 transition-colors">
                  1. Loan Settlement Overview
                </a>
                <a href="#legal-rights" className="block hover:text-blue-600 transition-colors">
                  2. Your Legal Rights
                </a>
                <a href="#rbi-guidelines" className="block hover:text-blue-600 transition-colors">
                  3. RBI Guidelines
                </a>
                <a href="#credit-card-settlement" className="block hover:text-blue-600 transition-colors">
                  4. Credit Card Settlement
                </a>
                <a href="#personal-loan-settlement" className="block hover:text-blue-600 transition-colors">
                  5. Personal Loan Settlement
                </a>
                <a href="#process" className="block hover:text-blue-600 transition-colors">
                  6. The Settlement Process
                </a>
                <a href="#harassment-protection" className="block hover:text-blue-600 transition-colors">
                  7. Harassment Protection
                </a>
                <a href="#cibil-impact" className="block hover:text-blue-600 transition-colors">
                  8. CIBIL Score Impact
                </a>
                <a href="#why-choose-us" className="block hover:text-blue-600 transition-colors">
                  9. Why Choose CredSettle
                </a>
                <a href="#sarfaesi-act" className="block hover:text-blue-600 transition-colors">
                  10. SARFAESI &amp; Sec 138
                </a>
                <a href="#diy-risks" className="block hover:text-blue-600 transition-colors">
                  11. DIY Settlement Risks
                </a>
                <a href="#management-vs-settlement" className="block hover:text-blue-600 transition-colors">
                  12. Management vs Settlement
                </a>
                <a href="#success-stories" className="block hover:text-blue-600 transition-colors">
                  13. Success Stories
                </a>
                <a href="#future-planning" className="block hover:text-blue-600 transition-colors">
                  14. Life After Settlement
                </a>
                <a href="#reviews" className="block hover:text-blue-600 transition-colors">
                  15. Client Reviews
                </a>
                <a href="#faqs" className="block hover:text-blue-600 transition-colors">
                  16. Frequently Asked Questions
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-6 min-w-0">
            <article className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">

              <section id="introduction" className="mb-12 scroll-mt-32">
                <h2
                  className="
                    font-[Geist]
                    font-semibold
                    text-[2rem]
                    md:text-[2.25rem]
                    leading-[100%]
                    tracking-[0%]
                    text-gray-900
                    mb-6
                  "
                >
                  Expert Loan Settlement in {bankName}
                </h2>
                <p className="mb-4">
                  Facing mounting debt in <strong>{bankName}</strong>? CredSettle provides expert legal representation to help you negotiate with banks and NBFCs. We understand the mental and financial toll of debt, and we are here to fight for your financial freedom. The demand for specialized <strong>loan settlement in {bankName}</strong> has seen a significant rise as more individuals seek legal ways to escape the debt trap of high-interest personal loans and credit cards.
                </p>
                <p className="mb-4">
                  Loan settlement is a 100% legal process governed by RBI guidelines. It allows genuine borrowers who have suffered financial setbacks—such as job loss, medical emergencies, or business failure—to close their accounts for a lower, negotiated amount. If you are looking for professional assistance for <strong>loan settlement in {bankName}</strong>, our team of experienced advocates is ready to guide you through every step of the legal negotiation process.
                </p>
                <p className="mb-4">
                  In a bustling hub like {bankName}, the cost of living and financial pressures can sometimes lead to an unmanageable accumulation of debt. Many residents find themselves struggling with multiple EMIs, where a single missed payment can trigger a cascade of penalties and interest, making it impossible to clear the original principal. This is where the strategic intervention of <strong>loan settlement in {bankName}</strong> becomes essential. Our approach is not just about reducing the debt, but about providing a comprehensive legal shield that protects your rights as a borrower.
                </p>
              </section>

              <section id="legal-rights" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights Against Harassment</h2>
                <p className="mb-4">
                  Banks and recovery agents must follow the RBI Fair Practices Code. They cannot harass you, use abusive language, or visit your workplace illegally. Once you hire CredSettle for <strong>loan settlement in {bankName}</strong>, we formally notify the bank, and all communication is routed through our legal team, putting an immediate stop to harassment.
                </p>
                <p className="mb-4">
                  It is a common misconception that defaulting on a loan means losing all your rights. On the contrary, the law protects you from undignified recovery practices. In {bankName}, we have seen numerous cases where recovery agents exceed their legal boundaries. Our <strong>loan settlement in {bankName}</strong> services include filing formal complaints with the Banking Ombudsman and the police if harassment persists. We ensure that you are treated with respect throughout the negotiation period.
                </p>
                <p className="mb-4">
                  The psychological impact of debt harassment can be devastating. By choosing a professional legal partner for <strong>loan settlement in {bankName}</strong>, you delegate the stressful communication to experts. This allows you to focus on your recovery while we handle the aggressive recovery departments of banks and NBFCs. Our legal notices are designed to remind financial institutions of their obligations under the law, often leading to a more cooperative negotiation stance.
                </p>
              </section>

              <section id="rbi-guidelines" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">RBI Guidelines for Loan Settlement</h2>
                <p className="mb-4">
                  The Reserve Bank of India has clear frameworks regarding One Time Settlement (OTS). These guidelines are meant to provide a path for recovery of bad loans while offering relief to genuine defaulters. Our expertise in <strong>loan settlement in {bankName}</strong> involves leveraging these very guidelines to ensure that our clients get the most favorable terms possible.
                </p>
                <p className="mb-4">
                  Understanding the nuances of RBI circulars is crucial for a successful <strong>loan settlement in {bankName}</strong>. For instance, the timing of the settlement can significantly impact the waiver percentage. Typically, once a loan is classified as a Non-Performing Asset (NPA), banks are more inclined to settle to avoid the costs and delays of prolonged litigation. We track these stages meticulously for every client.
                </p>
                <p className="mb-4">
                  Moreover, the RBI emphasizes that recovery through settlement should be transparent and non-discriminatory. When we represent you for <strong>loan settlement in {bankName}</strong>, we ensure that the bank applies these principles fairly to your case. We analyze the bank's internal settlement policies, which they often don't disclose to individual borrowers, but are bound to follow during legal negotiations.
                </p>
              </section>

              <section id="credit-card-settlement" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit Card Settlement in {bankName}</h2>
                <p className="mb-4">
                  Credit card debt is often the most stressful due to its compounding interest rates, sometimes exceeding 40% per annum. If you are struggling with a mountain of card debt, <strong>loan settlement in {bankName}</strong> specifically tailored for credit cards can be your lifeline. We work to freeze further interest accumulation and negotiate a lump-sum payment that usually covers only a fraction of the total outstanding amount.
                </p>
                <p className="mb-4">
                  The process for <strong>loan settlement in {bankName}</strong> for credit cards differs from term loans. Since credit cards are completely unsecured, banks recognize the high risk of total recovery failure. This gives us significant leverage during negotiations. We have successfully closed numerous credit card accounts in {bankName} with waivers ranging from 50% to even 70% in extreme hardship cases.
                </p>
                <p className="mb-4">
                  Don't let credit card companies continue to trap you in the 'minimum due' cycle. That cycle only serves to increase their profits while keeping you in debt forever. Our <strong>loan settlement in {bankName}</strong> strategy breaks this cycle permanently, allowing you to settle the debt for a manageable amount and regain control over your financial life.
                </p>
              </section>

              <section id="personal-loan-settlement" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Loan Settlement Strategies</h2>
                <p className="mb-4">
                  Personal loans, much like credit cards, are unsecured and often have high-interest rates. Whether you took a loan for a wedding, medical emergency, or travel, if you can no longer afford the EMIs, <strong>loan settlement in {bankName}</strong> is a viable legal option. We analyze your loan agreement and repayment history to build a strong case for financial hardship.
                </p>
                <p className="mb-4">
                  In {bankName}, personal loan defaults often attract legal notices under Section 138 of the Negotiable Instruments Act if checks are bounced. Part of our <strong>loan settlement in {bankName}</strong> service involves handling these legal notices. We represent you in court if necessary and integrate the legal defense with the settlement negotiation to ensure no criminal liability arises from your civil debt.
                </p>
                <p className="mb-4">
                  Our goal with <strong>loan settlement in {bankName}</strong> for personal loans is to reach a 'Full and Final' settlement. This ensures that once you pay the agreed amount, the bank has no further claims on you. We meticulously review the settlement letter provided by the bank to ensure there are no hidden clauses that could allow them to reopen the case later.
                </p>
              </section>

              <section id="process" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">The CredSettle Settlement Process</h2>
                <p className="mb-4">
                  Our systematic approach to <strong>loan settlement in {bankName}</strong> is designed to be transparent, efficient, and legally sound. We understand that every financial situation is unique, which is why we provide personalized strategies for each of our clients.
                </p>
                <ol className="space-y-6 list-decimal list-inside text-gray-700 mb-6">
                  <li className="mb-2">
                    <strong>Financial Audit &amp; Debt Analysis:</strong> The first step in our <strong>loan settlement in {bankName}</strong> process is a deep dive into your financial health. We analyze your total outstanding debt, the interest rates, your current income, and the reasons for your default. This helps us determine the most realistic settlement target.
                  </li>
                  <li className="mb-2">
                    <strong>Legal Representation &amp; Strategy:</strong> Once you enroll for <strong>loan settlement in {bankName}</strong> with us, we issue a formal letter of representation to all your creditors. This legally informs them that all future communications regarding your debt must be directed to our firm.
                  </li>
                  <li className="mb-2">
                    <strong>Immediate Harassment Stop:</strong> As soon as the banks receive our legal notice, the aggressive recovery activities typically halt. If any agent continues to contact you, we handle it legally, ensuring your peace of mind is restored during the <strong>loan settlement in {bankName}</strong> process.
                  </li>
                  <li className="mb-2">
                    <strong>Intensive Negotiation Phase:</strong> Our expert negotiators engage with the settlement departments of your banks. We use your financial hardship evidence and the current market conditions in {bankName} to push for the highest possible waiver. This is the core of our <strong>loan settlement in {bankName}</strong> service.
                  </li>
                  <li className="mb-2">
                    <strong>Settlement Verification &amp; Closure:</strong> After a successful negotiation, the bank issues a formal settlement letter. We verify this document to ensure it clearly states that the payment will settle the entire debt 'full and final'. After you pay, we ensure you receive the No Dues Certificate (NDC).
                  </li>
                </ol>
              </section>

              <section id="harassment-protection" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Protecting Your Reputation and Peace</h2>
                <p className="mb-4">
                  Debt often brings social stigma, but it shouldn't. Financial setbacks can happen to anyone. Our <strong>loan settlement in {bankName}</strong> services are discreet and professional. We ensure that the settlement process doesn't disrupt your daily life or your social standing in the city.
                </p>
                <p className="mb-4">
                  Many people in {bankName} fear that their neighbors or employers will find out about their debt issues. We take extreme measures to prevent this. By taking over all communications, we ensure that recovery agents don't have a reason to visit your home or office. A professional approach to <strong>loan settlement in {bankName}</strong> is the best way to handle your debt with dignity.
                </p>
                <p className="mb-4">
                  Remember, the sooner you start the process for <strong>loan settlement in {bankName}</strong>, the more options you have. Delaying often leads to more legal notices and higher accumulated penalties, which can make the negotiation harder. Take the first step today by consulting with our legal experts.
                </p>
              </section>

              <section id="cibil-impact" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding CIBIL Post-Settlement</h2>
                <p className="mb-4">
                  A major concern for anyone seeking <strong>loan settlement in {bankName}</strong> is the impact on their credit score. It's important to be honest: a settlement will reflect as 'Settled' on your CIBIL report, which initially lowers your score. However, this is far better than having multiple 'Default' or 'Written Off' entries that stay for even longer.
                </p>
                <p className="mb-4">
                  As part of our <strong>loan settlement in {bankName}</strong> package, we don't just leave you after the settlement. We provide a comprehensive roadmap on how to rebuild your credit history. In {bankName}, many of our past clients have successfully rebuilt their scores to 750+ within 18-24 months of their settlement by following our expert advice on disciplined financial habits.
                </p>
                <p className="mb-4">
                  Rebuilding your credit after <strong>loan settlement in {bankName}</strong> involves starting with small, secured credit lines and ensuring 100% timely payments. Over time, these positive entries will outweigh the 'Settled' status, making you eligible for credit again. We believe in providing solutions that help you not just today, but for your entire financial future.
                </p>
              </section>

              <section id="why-choose-us" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why CredSettle for Loan Settlement in {bankName}?</h2>
                <p className="mb-4">
                  Choosing the right partner for <strong>loan settlement in {bankName}</strong> is crucial. CredSettle stands out due to our legal heritage and our dedicated focus on borrower rights. We are not just a negotiation firm; we are a legal advocacy group committed to financial justice.
                </p>
                <ul className="space-y-4 list-disc list-inside text-gray-700 mb-6">
                  <li>
                    <strong>City-Specific Expertise:</strong> We understand the local banking environment and the specific recovery patterns prevalent in {bankName}.
                  </li>
                  <li>
                    <strong>Transparent Fee Structure:</strong> No hidden costs. We provide a clear fee structure for our <strong>loan settlement in {bankName}</strong> services right from the start.
                  </li>
                  <li>
                    <strong>Dedicated Legal Cell:</strong> Every case is supervised by qualified lawyers who ensure that all settlements are legally airtight.
                  </li>
                  <li>
                    <strong>Proven Track Record:</strong> We have helped thousands of individuals in {bankName} and across India successfully settle their debts.
                  </li>
                </ul>
                <p className="mb-4">
                  In {bankName}, where financial competition is fierce, CredSettle acts as your professional buffer. We don't just negotiate; we educate. Our clients for <strong>loan settlement in {bankName}</strong> leave the process not just debt-free, but financially wiser. We help you understand the traps that led to the debt in the first place and provide tools to avoid them in the future.
                </p>
              </section>

              <section id="sarfaesi-act" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigating SARFAESI and Sec 138 in {bankName}</h2>
                <p className="mb-4">
                  Many residents seeking <strong>loan settlement in {bankName}</strong> are often already facing legal threats. The Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, 2002, and Section 138 of the Negotiable Instruments Act are common legal tools used by banks. Understanding these is vital for any borrower in default.
                </p>
                <p className="mb-4">
                  Under the SARFAESI Act, banks can take possession of secured assets without the intervention of a court. However, there are many procedural safeguards that banks must follow. As part of our <strong>loan settlement in {bankName}</strong> services, we scrutinize every notice sent by the bank. If there is a procedural lapse, we use it as leverage to push for a better settlement deal.
                </p>
                <p className="mb-4">
                  Section 138 deals with cheque bounce cases, which are criminal in nature. If you are worried about criminal proceedings while pursuing <strong>loan settlement in {bankName}</strong>, our legal team provides the necessary defense. We work to resolve the underlying debt so that the criminal case can be settled and withdrawn, protecting you from potential jail time or heavy fines.
                </p>
                <p className="mb-4">
                  Legal complexity shouldn't be a barrier to your peace of mind. By integrating legal defense with <strong>loan settlement in {bankName}</strong>, we provide a holistic solution that covers all bases. We ensure that all legal notices are replied to within the statutory periods, preserving your rights and building a record of your bonafide intent to settle.
                </p>
              </section>

              <section id="diy-risks" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">The Risks of DIY Loan Settlement</h2>
                <p className="mb-4">
                  Some individuals attempt to negotiate <strong>loan settlement in {bankName}</strong> on their own. While this is possible, it comes with significant risks. Banks are experienced negotiators with massive legal departments. An individual borrower often lacks the knowledge of 'benchmark settlement rates' and might end up paying much more than necessary.
                </p>
                <p className="mb-4">
                  Furthermore, without a legal representative for <strong>loan settlement in {bankName}</strong>, you remain directly exposed to the high-pressure tactics of recovery departments. They may make verbal promises that are never reflected in the final settlement letter. We have seen cases where borrowers paid a 'settlement' amount only to find out later that the bank treated it as a part-payment and continued recovery for the balance.
                </p>
                <p className="mb-4">
                  A professional for <strong>loan settlement in {bankName}</strong> ensures that every communication is documented. We insist on a formal offer letter on the bank's letterhead before any payment is made. This letter must clearly state that the payment is for 'Full and Final Settlement' and that all legal cases will be withdrawn. This protection is what you pay for when you hire experts.
                </p>
                <p className="mb-4">
                  In the long run, the money saved through better negotiation techniques and the protection from legal pitfalls far outweighs the professional fees of a <strong>loan settlement in {bankName}</strong> expert. We treat your debt as if it were our own, fighting for every rupee of waiver possible.
                </p>
              </section>

              <section id="management-vs-settlement" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Debt Management vs. Loan Settlement in {bankName}</h2>
                <p className="mb-4">
                  It is important to distinguish between debt management and <strong>loan settlement in {bankName}</strong>. Debt management involves restructuring your loans—perhaps by extending the tenure or slightly reducing the interest rate—to make the monthly payments more affordable. This is often a good option for those who still have a regular income but are temporarily over-leveraged.
                </p>
                <p className="mb-4">
                  However, if your financial situation has deteriorated to the point where any EMI is impossible, then <strong>loan settlement in {bankName}</strong> is the only practical way out. Settlement is a more aggressive approach that targets the principal amount itself. It is for those who need a clean break from their debt to start over.
                </p>
                <p className="mb-4">
                  Choosing between these two depends on a detailed financial analysis. When you come to us for <strong>loan settlement in {bankName}</strong>, we first assess if restructuring is a better path for you. If not, we pivot to a robust settlement strategy. Our goal is always the long-term financial health of our clients in {bankName}.
                </p>
                <p className="mb-4">
                  Many local financial 'advisors' in {bankName} might push you toward more loans to pay off existing ones. This is a classic debt trap. We strongly advise against taking 'top-up' loans or high-interest private loans. Instead, a legal <strong>loan settlement in {bankName}</strong> provides a permanent closure to the debt without adding new liabilities.
                </p>
              </section>

              <section id="success-stories" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Success Stories in {bankName}</h2>
                <p className="mb-4">
                  To understand the impact of professional <strong>loan settlement in {bankName}</strong>, consider these real-world examples (names changed for privacy). Last month, we helped a small business owner in {bankName} who was struggling with ₹25 Lakhs in unsecured debt across five different banks. After our intervention, we secured settlements for a total of ₹11 Lakhs, a 56% waiver.
                </p>
                <p className="mb-4">
                  Another case involved a young professional in {bankName} who had accumulated ₹8 Lakhs in credit card debt due to medical expenses. The interest was growing at almost ₹30,000 every month. Through our specialized <strong>loan settlement in {bankName}</strong> approach, we settled the entire amount for ₹3.2 Lakhs, allowing them to finally focus on their health and career again.
                </p>
                <p className="mb-4">
                  These aren't just numbers; they represent lives transformed. The relief that comes with receiving a No Dues Certificate after months of stress is immeasurable. This is why we are so passionate about <strong>loan settlement in {bankName}</strong>. We provide the legal muscle you need to take on powerful financial institutions and win your freedom back.
                </p>
              </section>

              <section id="future-planning" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Life After Loan Settlement in {bankName}</h2>
                <p className="mb-4">
                  Once the <strong>loan settlement in {bankName}</strong> is complete, a new chapter begins. Many worry that they will never get credit again. While it takes time, it is entirely possible to regain creditworthiness. The key is to demonstrate a new, disciplined approach to finances.
                </p>
                <p className="mb-4">
                  We advise our {bankName} clients to start with a 'Secured Credit Card' against a fixed deposit. This is one of the fastest ways to start reporting positive data to credit bureaus after a <strong>loan settlement in {bankName}</strong>. Within a year of consistent, timely payments on such a card, your score will begin a steady climb.
                </p>
                <p className="mb-4">
                  Financial literacy is the best defense against future debt. As part of our commitment to the community in {bankName}, we provide free resources and webinars for our past clients. We believe that everyone deserves a second chance, and <strong>loan settlement in {bankName}</strong> is exactly that—a second chance at financial life.
                </p>
                <p className="mb-4">
                  In conclusion, if you are feeling the weight of unmanageable debt, don't suffer in silence. The legal path of <strong>loan settlement in {bankName}</strong> is designed to help people exactly in your position. With CredSettle by your side, you have a partner who understands the law, the banks, and most importantly, your need for a fresh start. Contact us today to begin your journey toward financial freedom.
                </p>
              </section>

              <section id="reviews" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Experiences in {bankName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">
                      "I was terrified of the recovery calls for my 3 credit cards. CredSettle took over the case and settled my 12 Lakh debt for just 4.5 Lakhs in {bankName}. Life saving service!"
                    </p>
                    <p className="font-bold text-gray-900">- Rahul Sharma, {bankName}</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">
                      "Best experience with <strong>loan settlement in {bankName}</strong>. They are professional and keep their promises. The harassment stopped from day one."
                    </p>
                    <p className="font-bold text-gray-900">- Anita Desai, {bankName}</p>
                  </div>
                </div>
              </section>

              <section id="faqs" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions on Loan Settlement in {bankName}
                </h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">What is loan settlement and how does it work?</h4>
                    <p className="text-gray-600 m-0">
                      Loan settlement, also known as debt settlement, is a legal financial process where a borrower negotiates with the lender to pay a lump sum amount that is lower than the total outstanding debt to close the loan account. This is typically done through a One Time Settlement (OTS) scheme under RBI guidelines.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Is loan settlement legal in India?</h4>
                    <p className="text-gray-600 m-0">
                      Yes, loan settlement is completely legal in India. It is governed by guidelines issued by the Reserve Bank of India (RBI) and is a standard banking practice for recovering non-performing assets (NPAs).
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">How much can I save through loan settlement?</h4>
                    <p className="text-gray-600 m-0">
                      Typically, borrowers can save anywhere from 30% to 50% of the total outstanding amount, depending on the age of the default and the bank's policies.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Will loan settlement affect my CIBIL score?</h4>
                    <p className="text-gray-600 m-0">
                      Yes, it will drop your score initially and show as 'Settled'. However, CredSettle provides a roadmap to rebuild your score to 750+ within 12-24 months.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">How long does the settlement process take?</h4>
                    <p className="text-gray-600 m-0">
                      On average, the process takes between 3 to 6 months to reach a final agreement and receive the official settlement letter.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">What is the role of a lawyer in loan settlement?</h4>
                    <p className="text-gray-600 m-0">
                      A loan settlement lawyer protects your rights, handles all communications with the bank to stop harassment, and ensures you get the best possible waiver legally.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Can the bank sue me during or after the settlement process?
                    </h4>
                    <p className="text-gray-600 m-0">
                      While a bank has the right to take legal action for default, proactive negotiation for settlement often prevents litigation. Once a settlement is reached and the NDCs are issued, the bank cannot take further legal action for that debt.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Which types of loans can be settled?</h4>
                    <p className="text-gray-600 m-0">
                      Unsecured loans like personal loans, credit card debts, and business loans without collateral are most suitable for settlement. Secured loans like home loans are harder but can be negotiated under specific hardship conditions.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">
                      What is the difference between loan settlement and loan restructuring?
                    </h4>
                    <p className="text-gray-600 m-0">
                      Restructuring involves changing the EMI or tenure of the loan to make it manageable, while settlement involves closing the loan account completely by paying a reduced lump sum amount.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Is there a minimum debt amount required for settlement?</h4>
                    <p className="text-gray-600 m-0">
                      Generally, banks consider settlement for amounts above ₹1-2 Lakhs, but CredSettle can assist with various debt portfolios depending on the financial hardship of the borrower.
                    </p>
                  </div>
                </div>
              </section>

            </article>
          </main>

          {/* Right Sidebar - Urgent Call */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4">Urgent Help?</h3>
                <p className="text-gray-400 mb-8 text-sm">Speak with our senior debt advisor in {bankName} now.</p>
                <a
                  href="tel:+918800226635"
                  className="block w-full bg-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-white"
                >
                  Call +91-8800226635
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
