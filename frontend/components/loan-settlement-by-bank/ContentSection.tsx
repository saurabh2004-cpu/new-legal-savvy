import Link from "next/link";

interface ContentSectionProps {
  bankName?: string;
}

export default function ContentSection({ bankName = "Tirap" }: ContentSectionProps) {
  return (
    <section className="w-full pb-1">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto py-4 px-6 md:px-10 lg:px-16">
          <nav
            className="flex items-center gap-2 text-[0.875rem] font-normal leading-[100%] tracking-[0%] text-gray-500 flex-wrap"
          >
            <Link
              href="/"
              className="font-normal text-[0.875rem] leading-[100%] tracking-[0%] hover:text-blue-600 transition-colors"
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
              className="font-medium text-[0.875rem] leading-[100%] tracking-[0%] hover:text-blue-600 transition-colors"
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
              className="font-medium text-[0.95rem] leading-[100%] tracking-[0%] text-gray-900"
            >
              Loan Settlement in {bankName}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      {/* <div className="max-w-[97vw] mx-auto px-4 py-16"> */}
      <div className="max-w-8xl mx-auto py-16 px-6 md:px-10 lg:px-16 rounded-xl">
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
                  3. OTS Settlement
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
                  7. CIBIL Score Impact
                </a>
                <a href="#cibil-impact" className="block hover:text-blue-600 transition-colors">
                  8. Legal Notice
                </a>
                <a href="#reviews" className="block hover:text-blue-600 transition-colors">
                  9. Client Reviews
                </a>
                <a href="#faqs" className="block hover:text-blue-600 transition-colors">
                  10. Frequently Asked Questions
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-6 min-w-0">
            <article className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">

              <section id="introduction" className="mb-12 scroll-mt-32">
                <h2
                  className="font-semibold text-[2rem] md:text-[2.25rem] leading-[100%] tracking-[0%] text-gray-900 mb-6"
                >
                  How {bankName} Loan Settlement Works
                </h2>
                <p className="mb-4">
                  Loan settlement means your lender agrees to accept a single reduced payment that closes the account, instead of you continuing to pay the full outstanding balance. With <strong>{bankName}</strong>, Legal Savvy reviews your loan agreement and statement history, then puts a One-Time Settlement proposal to the bank on your behalf. What <strong>{bankName}</strong> will accept depends on its own internal settlement policy and how long the account has been overdue, so we do not quote a figure before reading your file.
                </p>

              </section>

              <section id="legal-rights" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Rights When {bankName} Recovery Agents Call
                </h2>
                <p className="mb-4">
                  <strong>{bankName}</strong> is entitled to recover what it is owed. It is not entitled to threaten you, call outside 8 a.m. to 7 p.m., or contact your relatives, employer or neighbours about your debt. Those limits come from the RBI Fair Practices Code, and the bank stays responsible for any agency it appoints. Legal Savvy helps you record what is happening and put <strong>{bankName}</strong> on formal written notice.
                </p>
              </section>

              <section id="rbi-guidelines" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  One-Time Settlement (OTS) with {bankName}
                </h2>
                <p className="mb-4">
                  An OTS is a single negotiated payment that closes the loan account for less than the full outstanding amount. Most banks including <strong>{bankName}</strong> have an internal OTS policy setting out what they can accept and who has to approve it, which is why the achievable figure varies between lenders. Legal Savvy prepares the proposal, negotiates the amount and timeline, and confirms the settlement in writing before any money moves.
                </p>
              </section>

              <section id="credit-card-settlement" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {bankName} Credit Card Settlement
                </h2>
                <p className="mb-4">
                  Credit card dues behave differently from a loan account. Interest is charged monthly on the revolving balance and late fees stack on top, so the outstanding figure keeps moving while a settlement is being negotiated. Legal Savvy reviews your <strong>{bankName}</strong> statements to separate principal from accumulated interest and charges, then negotiates a settlement figure with the card division directly.
                </p>
              </section>

              <section id="personal-loan-settlement" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {bankName} Personal Loan Settlement
                </h2>
                <p className="mb-4">
                  A personal loan is unsecured, so <strong>{bankName}</strong> has no asset to seize if you fall behind. What it can do is add penal interest, report the account to the credit bureaus, and route it to recovery. Legal Savvy reviews your repayment history to build the hardship case, then negotiates a settlement. If a cheque has bounced, the Section 138 notice is handled alongside the negotiation rather than separately.
                </p>
              </section>

              <section id="process" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  The Settlement Process, Step by Step
                </h2>
                <ul className="space-y-6 list-inside text-gray-700 mb-6">
                  <li className="mb-2">
                    Step 1: We review your loan agreement, statements and current repayment capacity.
                  </li>
                  <li className="mb-2">
                    Step 2: We issue a letter of representation to {bankName}, after which communication routes through us.
                  </li>
                  <li className="mb-2">
                    Step 3: We prepare and submit the OTS proposal.
                  </li>
                  <li className="mb-2">
                    Step 4: We negotiate the amount and timeline, confirming every offer to you in writing.
                  </li>
                  <li className="mb-2">
                    Step 5: Once paid, we request the settlement letter and No-Dues Certificate.
                  </li>
                </ul>
              </section>

              <section id="harassment-protection" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What Settlement Does to Your CIBIL Record
                </h2>
                <p className="mb-4">
                  This is worth being straight about. A settled account is reported to the credit bureaus as "settled", not "closed", and that affects your score. It is generally viewed less harshly than an account left in default or written off, but it is not neutral. Legal Savvy explains exactly how your <strong>{bankName}</strong> account will be reported before you agree to anything, so the decision is an informed one.
                </p>
              </section>

              <section id="cibil-impact" className="mb-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  If {bankName} Sends a Legal Notice
                </h2>
                <p className="mb-4">
                  A notice under SARFAESI applies to secured lending, and a Section 138 notice follows a bounced cheque. Neither means the matter is closed to negotiation, and many accounts are settled while proceedings are pending. If <strong>{bankName}</strong> files before the Debt Recovery Tribunal, or the matter is listed for a Lok Adalat sitting, Legal Savvy prepares the file and appears alongside you.
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
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      How do I settle a loan with {bankName}?
                    </h3>
                    <p className="text-gray-600 m-0">
                      You or your representative submit a One-Time Settlement proposal to {bankName} setting out your financial position and the amount you can pay. The bank assesses it against its internal settlement policy and the status of your account. If accepted, the terms are recorded in a settlement letter, which you should have in writing before paying anything.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      How long does a {bankName} loan settlement take?
                    </h3>
                    <p className="text-gray-600 m-0">
                      It depends on how far the account has progressed and how quickly {bankName} responds. A straightforward negotiation may conclude in a few weeks; a file already in recovery takes longer. Anyone quoting a guaranteed timeline before reading your account details is guessing.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Can I settle a {bankName} credit card and a personal loan together?
                    </h3>
                    <p className="text-gray-600 m-0">
                      They are negotiated separately because they sit with different divisions and are governed by different internal policies, even at the same bank. Legal Savvy can run both negotiations in parallel and keep you updated on each, but the settlement letters will be separate documents.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      What can I do about {bankName} recovery agent calls?
                    </h3>
                    <p className="text-gray-600 m-0">
                      The RBI Fair Practices Code restricts recovery contact to between 8 a.m. and 7 p.m. and prohibits intimidation, abusive language, or contacting people other than you and any guarantor. Record what happens, then put the bank on formal written notice. If its grievance process does not resolve it, the matter can go to the Banking Ombudsman.
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Will {bankName} agree to a settlement?
                    </h3>
                    <p className="text-gray-600 m-0">
                      There is no guarantee, and any firm promising one is overstating what it can do. Whether a bank settles depends on its own policy, how long the account has been overdue, and the strength of the hardship case put to it. What Legal Savvy can commit to is preparing that case properly and getting every offer in writing.
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
                <h3 className="text-2xl font-bold mb-4">Talk to a Lawyer</h3>
                <p className="text-gray-400 mb-8 text-sm">Speak with our senior debt advisor in {bankName} now.</p>
                <a
                  href="tel:+91 92304 45513"
                  className="block w-full bg-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-white"
                >
                  Call +91 92304 45513
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
