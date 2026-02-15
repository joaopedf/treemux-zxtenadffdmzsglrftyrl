import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const { imageDescription, userNotes } = await req.json();

  try {
    const result = await generateObject({
      model: openrouter("anthropic/claude-sonnet-4") as Parameters<typeof generateObject>[0]["model"],
      schema: z.object({
        title: z.string().describe("A compelling, specific title for the listing (e.g., 'Herman Miller Aeron Chair — Size B')"),
        description: z.string().describe("A detailed 2-3 sentence description highlighting key features, condition, and why someone would want it"),
        suggestedPrice: z.number().describe("A fair suggested price in USD based on the item and condition"),
        category: z.string().describe("One of: Electronics, Furniture, Clothing, Sports, Music, Home, Books, Automotive"),
        condition: z.enum(["new", "like-new", "good", "fair", "poor"]),
        tags: z.array(z.string()).describe("3-5 relevant search tags"),
      }),
      prompt: `Generate a compelling marketplace listing based on:

Item description: ${imageDescription}
${userNotes ? `Seller notes: ${userNotes}` : ""}

Create an attractive listing that would sell well on a local marketplace. Be specific about the item, use em-dashes for style, and suggest a competitive price.`,
    });

    return Response.json(result.object);
  } catch {
    // Fallback without AI
    return Response.json({
      title: imageDescription || "Item for Sale",
      description: userNotes || "Great item in good condition. Contact for more details.",
      suggestedPrice: 50,
      category: "Home",
      condition: "good",
      tags: ["for-sale"],
    });
  }
}
