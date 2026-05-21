# 🔍 PriceScope
Compare prices across Amazon, Walmart, eBay, BestBuy & Target.
Built with Next.js + Google Gemini AI.
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
\
