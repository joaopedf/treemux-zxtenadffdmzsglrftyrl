import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    const result = await generateObject({
      model: openrouter("anthropic/claude-sonnet-4") as Parameters<typeof generateObject>[0]["model"],
      schema: z.object({
        searchTerms: z.array(z.string()).describe("Key search terms extracted from the query"),
        category: z.string().optional().describe("Category if mentioned: Electronics, Furniture, Clothing, Sports, Music, Home, Books, Automotive"),
        maxPrice: z.number().optional().describe("Maximum price if mentioned"),
        minPrice: z.number().optional().describe("Minimum price if mentioned"),
        condition: z.string().optional().describe("Condition if mentioned: new, like-new, good, fair, poor"),
        sortBy: z.string().optional().describe("Sort preference: relevance, price-low, price-high, newest"),
        intent: z.string().describe("Brief description of what the user is looking for"),
      }),
      prompt: `Parse this marketplace search query into structured filters. Extract price ranges, categories, conditions, and search terms.

Query: "${query}"

Examples:
- "cheap furniture under 100" -> searchTerms: ["furniture"], category: "Furniture", maxPrice: 100, sortBy: "price-low"
- "macbook pro good condition" -> searchTerms: ["macbook", "pro"], category: "Electronics", condition: "good"
- "bike near me" -> searchTerms: ["bike"], category: "Sports"`,
    });

    return Response.json(result.object);
  } catch {
    // Fallback: simple keyword extraction without AI
    const words = query.toLowerCase().split(/\s+/);
    const priceMatch = query.match(/under\s*\$?(\d+)/i) || query.match(/below\s*\$?(\d+)/i) || query.match(/less\s+than\s*\$?(\d+)/i);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;

    const categories: Record<string, string> = {
      electronics: "Electronics", laptop: "Electronics", phone: "Electronics", camera: "Electronics", headphones: "Electronics", computer: "Electronics", macbook: "Electronics", switch: "Electronics",
      furniture: "Furniture", desk: "Furniture", chair: "Furniture", table: "Furniture", shelf: "Furniture",
      clothing: "Clothing", jacket: "Clothing", shirt: "Clothing", shoes: "Clothing",
      sports: "Sports", bike: "Sports", bicycle: "Sports",
      music: "Music", guitar: "Music", piano: "Music",
      home: "Home", vacuum: "Home", kitchen: "Home",
    };

    let category: string | undefined;
    for (const word of words) {
      if (categories[word]) {
        category = categories[word];
        break;
      }
    }

    return Response.json({
      searchTerms: words.filter((w: string) => w.length > 2 && !["the", "and", "for", "under", "below", "less", "than", "near", "find", "want", "need", "looking", "get"].includes(w)),
      category,
      maxPrice,
      intent: query,
    });
  }
}
