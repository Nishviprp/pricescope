"use client";

import { useState } from "react";
import ResultsGrid from "@/components/ResultsGrid";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { CompareResult } from "@/types";

export default function Home() {
  const [results, setResults] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  async function handleSearch(searchQuery: string) {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <HeroSection onSearch={handleSearch} loading={loading} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}
        {loading && (
          <div className="text-center py-20">
            <div className="spinner mx-auto mb-4" />
            <p className="text-gray-500">Comparing prices across retailers...</p>
            <p className="text-gray-400 text-sm mt-1">Amazon · Walmart · eBay · BestBuy · Target</p>
          </div>
        )}
        {!loading && !results && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-lg text-gray-500">Search any product to compare prices</p>
            <p className="text-sm text-gray-400 mt-2">Powered by Google Gemini AI — 1,000 free searches per day</p>
          </div>
        )}
        {results && !loading && <ResultsGrid results={results} query={query} />}
      </div>
      <Footer />
    </main>
  );
}
