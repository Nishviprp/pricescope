import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 1000 * 60 * 30;

const AFFILIATE_BASES: Record<string, string> = {
  Amazon:  "https://www.amazon.com/s?tag=YOURTAG-20&k=",
  Walmart: "https://www.walmart.com/search?q=",
  eBay:    "https://www.ebay.com/sch/i.html?_nkw=",
  BestBuy: "https://www.bestbuy.com/site/searchpage.jsp?st=",
  Target:  "https://www.target.com/s?searchTerm=",
};

// Try models in order until one works (all free tier)
const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
          }),
        }
      );
      if (res.status === 429) continue; // rate limited, try next model
      if (res.status === 404) continue; // model not available, try next
      if (!res.ok) {
        const err = await res.json();
        console.error(`Model ${model} error:`, err);
        continue;
      }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      if (text) return text;
    } catch (e) {
      console.error(`Model ${model} failed:`, e);
      continue;
    }
  }
  throw new Error("All models failed");
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query?.trim()) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables." },
      { status: 500 }
    );
  }

  const key = query.trim().toLowerCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  const prompt = `You are a price comparison data engine. Product searched: "${query}"

Return ONLY valid JSON with NO markdown, NO code fences, NO explanation. Start with { and end with }.

{
  "product": {
    "name": "full product name with model number",
    "category": "Electronics|Clothing|Home|Sports|Beauty|Toys|Books|Other",
    "emoji": "one relevant emoji",
    "description": "one concise sentence describing it",
    "specs": ["spec1", "spec2", "spec3"]
  },
  "retailers": [
    { "name": "Amazon",  "logo": "AMZ", "color": "#FF9900", "price": 299.99, "originalPrice": 349.99, "rating": 4.5, "reviewCount": 12480, "shipping": "Free shipping", "delivery": "Tomorrow",  "inStock": true,  "badge": "Prime" },
    { "name": "Walmart", "logo": "WMT", "color": "#0071CE", "price": 279.00, "originalPrice": null,   "rating": 4.2, "reviewCount": 3241,  "shipping": "Free shipping", "delivery": "2-3 days", "inStock": true,  "badge": "" },
    { "name": "eBay",    "logo": "EBY", "color": "#E53238", "price": 249.95, "originalPrice": null,   "rating": 3.9, "reviewCount": 542,   "shipping": "Free shipping", "delivery": "3-5 days", "inStock": true,  "badge": "Used" },
    { "name": "BestBuy", "logo": "BBY", "color": "#003B64", "price": 299.99, "originalPrice": 349.99, "rating": 4.4, "reviewCount": 5671,  "shipping": "Free shipping", "delivery": "Tomorrow",  "inStock": true,  "badge": "" },
    { "name": "Target",  "logo": "TGT", "color": "#CC0000", "price": 289.99, "originalPrice": 329.99, "rating": 4.1, "reviewCount": 1823,  "shipping": "Free + RedCard", "delivery": "2 days",   "inStock": false, "badge": "" }
  ]
}

Rules: realistic prices, 5-20% variance between stores, real specs for that product. Return ONLY JSON.`;

  try {
    const text = await callGemini(apiKey, prompt);
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    const result = {
      product: parsed.product,
      retailers: parsed.retailers.map((r: Record<string, unknown>) => ({
        ...r,
        affiliateUrl:
          (AFFILIATE_BASES[r.name as string] ?? "https://www.google.com/search?q=") +
          encodeURIComponent(query),
      })),
      searchedAt: new Date().toISOString(),
    };

    cache.set(key, { data: result, ts: Date.now() });
    return NextResponse.json(result);
  } catch (err) {
    console.error("Compare error:", err);
    return NextResponse.json(
      { error: "Failed to fetch prices. Check your GEMINI_API_KEY in Vercel settings." },
      { status: 500 }
    );
  }
}
