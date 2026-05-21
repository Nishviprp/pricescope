import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white font-bold text-xs">P</div>
              <span className="text-white font-semibold">PriceScope</span>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/20">Free forever</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Compare prices across major US retailers instantly. Powered by Google Gemini AI.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>🤖 Gemini AI</span>
              <span>·</span>
              <span>▲ Vercel</span>
              <span>·</span>
              <span>⚡ Next.js</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 text-sm">
            <div>
              <div className="text-white font-medium mb-3">Retailers</div>
              {["Amazon", "Walmart", "eBay", "BestBuy", "Target"].map((r) => (
                <div key={r} className="mb-1.5 hover:text-orange-400 cursor-pointer transition-colors">{r}</div>
              ))}
            </div>
            <div>
              <div className="text-white font-medium mb-3">Links</div>
              <Link href="/setup" className="block mb-1.5 hover:text-orange-400 transition-colors">Setup guide</Link>
              <div className="mb-1.5 hover:text-orange-400 cursor-pointer transition-colors">Affiliate disclosure</div>
              <div className="mb-1.5 hover:text-orange-400 cursor-pointer transition-colors">Privacy policy</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© 2025 PriceScope. Built for free, runs for free.</p>
          <p>As an Amazon Associate we earn from qualifying purchases.</p>
        </div>
      </div>
    </footer>
  );
}
