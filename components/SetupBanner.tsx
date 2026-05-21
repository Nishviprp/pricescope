"use client";
import { useState } from "react";

const STEPS = [
  {
    num: "1",
    emoji: "🔑",
    title: "Get your FREE Gemini API key",
    desc: "Go to aistudio.google.com/apikey — click Create API Key. No credit card. No cost. Takes 1 minute.",
    link: "https://aistudio.google.com/apikey",
    linkText: "Get free key →",
    badge: "Free forever · 1,500/day",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    num: "2",
    emoji: "💻",
    title: "Upload code to GitHub (free)",
    desc: "Create a free GitHub account, make a new repo, upload all project files.",
    link: "https://github.com/new",
    linkText: "Create repo →",
    badge: "Free forever",
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    num: "3",
    emoji: "🚀",
    title: "Deploy on Vercel (free hosting)",
    desc: 'Go to vercel.com → "New Project" → import GitHub repo → add GEMINI_API_KEY in environment variables → Deploy.',
    link: "https://vercel.com/new",
    linkText: "Deploy free →",
    badge: "Free hosting",
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    num: "4",
    emoji: "💰",
    title: "Apply for free affiliate programs",
    desc: "Earn 1–10% commission when users buy through your site. All free to join.",
    link: "https://affiliate-program.amazon.com",
    linkText: "Apply to Amazon →",
    badge: "Earn money",
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

export default function SetupBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <div className="font-semibold text-green-800 text-sm">This app is 100% free to run!</div>
              <div className="text-green-600 text-xs mt-0.5">Powered by Google Gemini free tier · Hosted on Vercel free tier</div>
            </div>
          </div>
          <button onClick={() => setOpen(!open)}
            className="text-xs bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors font-medium">
            {open ? "Hide guide" : "How to deploy →"}
          </button>
        </div>

        {open && (
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {STEPS.map((step) => (
              <div key={step.num} className={`${step.color} border rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{step.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-gray-800 text-sm">Step {step.num}: {step.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${step.badgeColor}`}>{step.badge}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{step.desc}</p>
                    <a href={step.link} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 hover:underline">{step.linkText}</a>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:col-span-2 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <div className="font-semibold text-amber-800 text-sm mb-1">Set your API key in Vercel</div>
                  <div className="text-xs text-amber-700 leading-relaxed">
                    In Vercel project settings → Environment Variables → add: <br />
                    <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs mt-1 inline-block">GEMINI_API_KEY = your_key_here</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
