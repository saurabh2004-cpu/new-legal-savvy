import cron from "node-cron";
import { Keyword } from "../models/keyword.model.js";
import { processKeywords } from "./gemini.js";
import { PageContent } from "../models/pageContent.model.js";

// Run every 1 minute to stay safely within Gemini API rate limits
cron.schedule("*/10 * * * * *", async () => {
    console.log("cron started")
    try {
        const keywords = await Keyword.find({ status: "pending" }).limit(1);
        await PageContent.deleteMany({});

        const firstKeyword = keywords[0];

        if (!firstKeyword) return;

        console.log(`[Cron Task] Found pending keyword: "${firstKeyword.keyword}". Starting processing...`);
        await processKeywords(keywords);

        console.log("all keywords processed")
    } catch (error) {
        console.error("[Cron Task] Error encountered in keyword processing cycle:", error);
    }


});
