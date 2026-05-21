"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";

const SUGGESTIONS = [
  "iPhone 16 Pro", "Sony WH-1000XM5", "Samsung 65\" 4K TV",
  "Nike Air Max 270", "iPad Air M2", "AirPods Pro 2",
  "PS5 Controller", "Instant Pot Duo",
];

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function HeroSection({ onSearch, loading }: Props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="bg-slate-900 px-4 py-12 text-center">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm">P</div>
        <span className="text-white text-xl font-semibold tracking-tight">PriceScope</span>
        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30">100% Free</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3 leading-tight">
        Find the best price,<br />
        <span className="text-orange-400">without the tab switching</span>
      </h1>
      <p className="text-slate-400 text-base mb-8 max-w-md mx-auto">
        Compare prices from Amazon, Walmart, eBay, BestBuy & Target — all in one search
      </p>

      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSearch={onSearch}
        loading={loading}
      />

      <div className="flex flex-wrap gap-2 justify-center mt-5 max-w-lg mx-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setInputValue(s); onSearch(s); }}
            className="text-slate-400 text-xs px-3 py-1.5 rounded-full border border-slate-700 hover:border-orange-500 hover:text-orange-400 transition-all duration-150 cursor-pointer bg-slate-800/50"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Free stack badges */}
      <div className="flex justify-center gap-3 mt-8 flex-wrap">
        {[
          { icon: "🤖", label: "Gemini AI", sub: "Free" },
          { icon: "▲", label: "Vercel", sub: "Free hosting" },
          { icon: "🔗", label: "Affiliates", sub: "Earn commissions" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-base">{icon}</span>
            <div className="text-left">
              <div className="text-white text-xs font-medium">{label}</div>
              <div className="text-green-400 text-xs">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
