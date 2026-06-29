import { ChatGoogle } from "@langchain/google";
import type { KeywordDocument } from "../models/keyword.model.js";
import { PageContent } from "../models/pageContent.model.js";
import * as z from "zod";

const ZLandingPageContent = z.object({
    meta: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string())
    }),

    breadcrumb: z.object({
        currentPage: z.string()
    }),

    hero: z.object({
        heading: z.string(),
        description: z.string(),
        highlightedMessage: z.string().optional()
    }),

    leftSidebar: z.object({
        title: z.string(),
        chapters: z.array(
            z.object({
                id: z.string(),
                title: z.string()
            })
        )
    }),

    sections: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            content: z.array(z.string()),

            calloutBox: z
                .object({
                    title: z.string(),
                    statistic: z.string(),
                    description: z.string()
                })
                .optional(),

            numberedPoints: z
                .array(
                    z.object({
                        title: z.string(),
                        description: z.string()
                    })
                )
                .optional(),

            quoteBox: z
                .object({
                    title: z.string(),
                    quote: z.string()
                })
                .optional(),

            alertBox: z
                .object({
                    title: z.string(),
                    description: z.string()
                })
                .optional()
        })
    ),

    faqSection: z.object({
        title: z.string(),

        faqs: z.array(
            z.object({
                question: z.string(),
                answer: z.string()
            })
        )
    }),

    conclusion: z.object({
        title: z.string(),
        shortQuote: z.string(),
        commitmentTitle: z.string(),
        content: z.string()
    }),

    testimonials: z.object({
        title: z.string(),

        reviews: z.array(
            z.object({
                name: z.string(),
                location: z.string(),
                review: z.string(),
                rating: z.number()
            })
        )
    }),

    rightSidebar: z.object({
        primaryCard: z.object({
            title: z.string(),
            description: z.string(),
            buttonText: z.string(),

            benefits: z.array(z.string())
        }),

        guidesCard: z.object({
            title: z.string(),

            guides: z.array(
                z.object({
                    title: z.string(),
                    slug: z.string()
                })
            )
        })
    })
});

// Validation Pipeline Functions

const validateSEO = (meta: any) => {
    console.log("[Validation] Running SEO Validation...");
    if (!meta || !meta.title || !meta.description) {
        throw new Error("Validation Failed: SEO meta title or description is missing.");
    }
    if (meta.title.length > 70) {
        throw new Error(`Validation Failed: SEO title is too long (${meta.title.length} chars). Keep under 70.`);
    }
    if (meta.description.length > 170) {
        throw new Error(`Validation Failed: SEO description is too long (${meta.description.length} chars). Keep under 170.`);
    }
    if (!meta.keywords || meta.keywords.length === 0) {
        throw new Error("Validation Failed: SEO keywords are missing.");
    }
    console.log("[Validation] SEO Validation Passed.");
};

// Helper function to generate slug
const generateSlug = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

export const processKeywords = async (keywords: KeywordDocument[]) => {
    if (keywords.length === 0) return;

    const model = new ChatGoogle({
        model: "gemini-2.5-flash",
        apiKey: process.env.GOOGLE_API_KEY!,
    });

    const structuredModel = model.withStructuredOutput(ZLandingPageContent);

    console.log(`[Gemini Content Generation] Found ${keywords.length} pending keywords.`);
    for (const keywordDoc of keywords) {
        const keywordText = keywordDoc.keyword;
        const page_slug = generateSlug(keywordText);

        console.log(`[Gemini Content Generation] Generating content for keyword: "${keywordText}" (Slug: "${page_slug}")...`);

        const systemPrompt = `You are a professional legal content strategist and SEO writer for 'Legal Savvy', India's leading debt settlement and loan resolution company.

CORE MISSION: Generate structured JSON content only. Do NOT generate HTML. Do NOT generate Tailwind CSS. Do NOT generate layout markup. Only generate content matching the ZLandingPageContent schema exactly.

Generate a comprehensive, SEO-masterpiece legal landing page that ranks for "${keywordText}" while maintaining professional, authoritative, and conversion-focused content.

BRAND IDENTITY & POSITIONING
- Company: Legal Savvy (India's #1 Debt Resolution & Loan Settlement Expert)
- Contact: +91-8800226635
- Target Market: Indian borrowers facing loan defaults, harassment, financial stress

SEO OPTIMIZATION REQUIREMENTS (CRITICAL)
- Include "${keywordText}" naturally in the hero heading.
- Include keyword variants in section titles.
- Place keyword in the first section's content.
- Page title: Include keyword + "Legal Savvy" (max 60 characters)
- Meta description: Include keyword + unique value prop + CTA (max 155 characters)

CONTENT STRUCTURE & CHAPTERS (MUST INCLUDE ALL)
Generate MINIMUM 8-12 comprehensive sections. Each section: 300-500 words (substantial, not thin).
Chapter topics to cover: Problem Awareness, Understanding Core Issue (RBI rules), Solutions Overview, Process & Methodology, Financial Impact, Legal Framework, Common Concerns, Success Stories.

Use the provided ZLandingPageContent schema to structure this content accurately. Ensure the FAQ section has 10-15 FAQs.`;

        console.log("generating content");
        try {
            const res = await structuredModel.invoke([
                ["system", systemPrompt],
                ["human", 'Generate landing page content for keyword: "example loan settlement"'],
                ["ai", `{"meta":{"title":"Dealing with Collection Calls | Legal Savvy","description":"Navigate creditor communications with confidence.","keywords":["collection calls", "harassment"]},"breadcrumb":{"currentPage":"Collection Call Management"},"hero":{"heading":"Dealing with Collection Calls","description":"Stop harassment and enforce legal rights."},"leftSidebar":{"title":"Guide Outline","chapters":[{"id":"introduction","title":"Introduction"}]},"sections":[{"id":"introduction","title":"Introduction","content":["For thousands of Indian borrowers..."]}],"faqSection":{"title":"10+ Expert FAQs","faqs":[{"question":"Can recovery agents call after 7 PM?","answer":"No. RBI guidelines prohibit..."}]},"conclusion":{"title":"Reclaiming Your Peace of Mind","shortQuote":"Collection calls are temporary.","commitmentTitle":"The Legal Savvy Commitment","content":"Full text here."},"testimonials":{"title":"Client Success","reviews":[{"name":"Ananya Sharma","location":"Bangalore","review":"Testimonial text","rating":5}]},"rightSidebar":{"primaryCard":{"title":"Save on Interest!","description":"See how much you can save...","buttonText":"Calculate My Savings","benefits":["Principal Reduction Math"]},"guidesCard":{"title":"Must-Read Guides","guides":[{"title":"Vehicle Loan Strategy","slug":"vehicle-loan-strategy"}]}}}`],
                ["human", `Generate landing page content for keyword: "${keywordText}"`]
            ]);

            console.log("saving page content to db");

            // Save to database using the new schema
            await PageContent.findOneAndUpdate(
                { page_slug },
                {
                    page_slug,
                    pagecontent: res // Save as raw JSON object
                },
                { upsert: true, new: true }
            );

            console.log("saving page content to db success");

            // Update keyword status
            keywordDoc.status = "completed";
            await keywordDoc.save();

            console.log(`[Gemini Content Generation] Successfully generated and stored page content for: "${keywordText}"`);
        } catch (error) {
            console.error(`[Gemini Content Generation] Error generating content for: "${keywordText}"`, error);
            throw error;
        }
    }
};