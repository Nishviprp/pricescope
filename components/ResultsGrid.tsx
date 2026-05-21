"use client";

import { useState } from "react";
import { CompareResult, Retailer } from "@/types";
import RetailerCard from "./RetailerCard";

interface Props {
  results: CompareResult;
  query: string;
}

type SortKey = "low" | "high" | "rating";

export default function ResultsGrid({ results, query }: Props) {
  const [sort, setSort] = useState<SortKey>("low");

  const sorted = [...results.retailers].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return b.rating - a.rating;
  });

  const inStock = sorted.filter((r) => r.inStock);
  const bestPrice = inStock.length ? Math.min(...inStock.map((r) => r.price)) : null;
  const maxPrice = inStock.length ? Math.max(...inStock.map((r) => r.price)) : null;
  const maxSavings = bestPrice && maxPrice ? maxPrice - bestPrice : 0;

  return (
    <div>
      {/* Product banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-3xl flex-shrink-0">
          {results.product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 text-base leading-tight">{results.product.name}</h2>
          <p className="text-gray-500 text-sm mt-0.5">{results.product.description}</p>
          {results.product.specs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {results.product.specs.map((spec) => (
                <span key={spec} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
        {bestPrice && (
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Best price</div>
            <div className="text-2xl font-semibold text-green-600">${bestPrice.toFixed(2)}</div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Stores found", value: results.retailers.length.toString(), color: "text-slate-800" },
          {
            label: "Price range",
            value: bestPrice && maxPrice ? `$${bestPrice.toFixed(0)}–$${maxPrice.toFixed(0)}` : "—",
            color: "text-slate-800",
          },
          {
            label: "Max savings",
            value: maxSavings > 0 ? `$${maxSavings.toFixed(2)}` : "$0",
            color: "text-green-600",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
            <div className={`text-xl font-semibold ${color}`}>{value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Sort & count header */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-800">{sorted.length} stores</span> for &ldquo;{query}&rdquo;
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400">Sort:</span>
          {(["low", "high", "rating"] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                sort === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {s === "low" ? "Lowest" : s === "high" ? "Highest" : "Top rated"}
            </button>
          ))}
        </div>
      </div>

      {/* Retailer cards */}
      <div className="flex flex-col gap-3">
        {sorted.map((retailer, idx) => (
          <RetailerCard
            key={retailer.name}
            retailer={retailer}
            isBestDeal={retailer.inStock && retailer.price === bestPrice}
            rank={idx + 1}
          />
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Prices updated in real time · Last checked {new Date(results.searchedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
