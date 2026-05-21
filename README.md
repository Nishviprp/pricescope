# 🔍 PriceScope — 100% Free Price Comparison Website

Compare prices across Amazon, Walmart, eBay, BestBuy & Target.
Built with Next.js + Google Gemini AI. Costs $0 to run.

---

## 💰 Total Cost: $0.00

| Service        | Cost   | What it does              |
|----------------|--------|---------------------------|
| Gemini API     | FREE   | AI price intelligence (1,000 req/day) |
| Vercel Hosting | FREE   | Live website              |
| GitHub         | FREE   | Store your code           |
| Domain (.com)  | ~$12/yr| Optional (yoursite.com)   |

---

## 🚀 Launch in 15 Minutes

### Step 1 — Get your FREE Gemini API key (3 min)
1. Go to **https://aistudio.google.com/apikey**
2. Sign in with Google (free)
3. Click **"Create API Key"**
4. Copy the key — looks like `AIzaSy...`
   > ✅ No credit card. No billing. 1,000 free searches/day.

### Step 2 — Put code on GitHub (5 min)
1. Go to **https://github.com/new**
2. Create a new repo called `pricescope` (set to Public)
3. Upload all files from this zip (drag & drop the unzipped folder)
4. Click **"Commit changes"**

### Step 3 — Deploy on Vercel (5 min)
1. Go to **https://vercel.com** → Sign up with GitHub (free)
2. Click **"Add New Project"** → select your `pricescope` repo
3. Click **"Environment Variables"** → add:
   - Name: `GEMINI_API_KEY`
   - Value: your key from Step 1
4. Click **"Deploy"** ✅
5. Your site is live at `pricescope-xyz.vercel.app`

### Step 4 — Start earning (free affiliate signups)
Apply to these programs — they're all free, and you earn when users click through and buy:

| Program | Where to Apply | Approval Time | Commission |
|---|---|---|---|
| Amazon Associates | affiliate-program.amazon.com | Instant–2 days | 1–10% |
| Walmart Affiliates | affiliates.walmart.com | 1–3 days | 1–4% |
| eBay Partner Network | partnernetwork.ebay.com | Instant | 1–4% |

Once approved, update your affiliate tags in `app/api/compare/route.ts`.

---

## 💻 Run Locally (on your computer)

```bash
# 1. Install Node.js from nodejs.org (free)

# 2. Open terminal in the project folder
npm install

# 3. Create your env file
cp .env.example .env.local
# Open .env.local and paste your Gemini API key

# 4. Start the app
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Project Structure

```
pricescope/
├── app/
│   ├── page.tsx              ← Main homepage
│   ├── layout.tsx            ← HTML wrapper + SEO
│   ├── globals.css           ← Global styles
│   └── api/compare/
│       └── route.ts          ← Gemini AI price engine ⭐
├── components/
│   ├── HeroSection.tsx       ← Search bar + hero
│   ├── SearchBar.tsx         ← Search input
│   ├── ResultsGrid.tsx       ← Results + sorting
│   ├── RetailerCard.tsx      ← Price card per store
│   └── Footer.tsx            ← Footer + affiliate disclosure
├── types/index.ts            ← TypeScript types
├── .env.example              ← Template for your API keys
├── vercel.json               ← Vercel deployment config
└── README.md                 ← This file
```

---

## 📈 How to Grow the Business (all free)

**Phase 1 — Launch (Week 1)**
- Deploy site ✅
- Pick one niche (e.g. only electronics or only shoes)
- Share in Reddit communities (r/frugal, r/deals, r/buildapc)

**Phase 2 — Traffic (Month 1–3)**
- Write blog posts: "Best price for iPhone 16 right now"
- These rank on Google and bring free traffic
- Share deals on Twitter/X, TikTok

**Phase 3 — Revenue (Month 3+)**
- Affiliate commissions from clicks start adding up
- 1,000 visitors/month × 5% click rate × $50 avg order × 3% commission = ~$75/month
- Scale up content and traffic

---

## ⚡ Free Tier Limits (Gemini)

- 1,000 searches/day
- 15 searches/minute
- Resets at midnight Pacific time
- Built-in 30-min cache saves quota (same product searched again = instant, free)

If you outgrow 1,000/day, that means ~1,000 users/day are using your site — at that point affiliate revenue covers the tiny upgrade cost (~$1-2/month).

---

## 📄 Legal (important!)
Include affiliate disclosure on your site — required by FTC.
The footer already says: *"As an Amazon Associate we earn from qualifying purchases."*
This is legally required and already included ✅
