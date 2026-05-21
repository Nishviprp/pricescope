import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Get your free Gemini API key",
    time: "2 min",
    cost: "FREE",
    color: "blue",
    instructions: [
      { text: "Go to", link: { url: "https://aistudio.google.com/apikey", label: "aistudio.google.com/apikey" } },
      { text: "Sign in with any Google account" },
      { text: 'Click "Create API Key"' },
      { text: "Copy the key — it looks like: AIzaSy..." },
    ],
    note: "1,500 free searches per day. No credit card. Ever.",
  },
  {
    number: "02",
    title: "Upload code to GitHub",
    time: "3 min",
    cost: "FREE",
    color: "gray",
    instructions: [
      { text: "Unzip the pricescope.zip file you downloaded" },
      { text: "Go to", link: { url: "https://github.com/new", label: "github.com/new" } },
      { text: 'Create a new repo named "pricescope"' },
      { text: "Upload all the unzipped files to that repo" },
    ],
    note: "GitHub is free. Your code stays private if you want.",
  },
  {
    number: "03",
    title: "Deploy on Vercel",
    time: "3 min",
    cost: "FREE",
    color: "orange",
    instructions: [
      { text: "Go to", link: { url: "https://vercel.com", label: "vercel.com" } },
      { text: "Sign up with your GitHub account" },
      { text: 'Click "New Project" → Import your pricescope repo' },
      { text: 'Add environment variable: GEMINI_API_KEY = (paste your key)' },
      { text: 'Click "Deploy" — your site goes live in ~60 seconds!' },
    ],
    note: "Your site will be live at yourname.vercel.app for free.",
  },
  {
    number: "04",
    title: "Apply for affiliate programs (earn money)",
    time: "10 min",
    cost: "FREE",
    color: "green",
    instructions: [
      { text: "Amazon Associates:", link: { url: "https://affiliate-program.amazon.com", label: "affiliate-program.amazon.com" }, extra: "Earn 1–10%" },
      { text: "Walmart Affiliates:", link: { url: "https://affiliates.walmart.com", label: "affiliates.walmart.com" }, extra: "Earn 1–4%" },
      { text: "eBay Partner Network:", link: { url: "https://partnernetwork.ebay.com", label: "partnernetwork.ebay.com" }, extra: "Earn 1–4%" },
      { text: "After approval, update affiliate tags in app/api/compare/route.ts" },
    ],
    note: "When users click 'Buy' and purchase anything within 24hrs, you earn a commission.",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  gray: "bg-gray-50 border-gray-200 text-gray-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  green: "bg-green-50 border-green-200 text-green-700",
};

const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
};

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 px-4 py-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-slate-400 hover:text-white transition-colors text-sm">
          ← Back to PriceScope
        </Link>
        <h1 className="text-2xl font-semibold text-white mb-2">
          🚀 Launch Your Site in 10 Minutes
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Everything is free. No credit card needed at any step.
        </p>
      </div>

      {/* Cost summary */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
          <span className="text-2xl">💰</span>
          <div>
            <div className="font-semibold text-green-800 text-sm">Total cost to launch: $0.00</div>
            <div className="text-green-700 text-sm mt-1">
              Gemini API (free) + GitHub (free) + Vercel (free) + Affiliate programs (free to join)
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`rounded-2xl border p-5 ${colorMap[step.color]}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center font-bold text-lg border border-current/20">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="font-semibold text-base">{step.title}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColorMap[step.color]} bg-white/70`}>
                        ⏱ {step.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                        ✓ {step.cost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ol className="space-y-2 ml-2">
                {step.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="font-medium opacity-60 mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                    <span>
                      {inst.text}{" "}
                      {inst.link && (
                        <a
                          href={inst.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-medium hover:opacity-80"
                        >
                          {inst.link.label}
                        </a>
                      )}
                      {(inst as { extra?: string }).extra && (
                        <span className="ml-1 font-medium text-green-700">
                          ({(inst as { extra?: string }).extra})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-3 text-xs opacity-70 bg-white/40 rounded-lg px-3 py-2">
                💡 {step.note}
              </div>
            </div>
          ))}
        </div>

        {/* Done! */}
        <div className="bg-slate-900 rounded-2xl p-6 mt-6 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h2 className="text-white font-semibold text-lg mb-2">You&apos;re live!</h2>
          <p className="text-slate-400 text-sm mb-4">
            Your price comparison site is up and running at zero cost.
            Every time someone clicks &ldquo;Buy&rdquo; and purchases something,
            you earn an affiliate commission.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Go to your site →
          </Link>
        </div>
      </div>
    </main>
  );
}
