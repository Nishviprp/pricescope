"use client";

import { Retailer } from "@/types";

interface Props {
  retailer: Retailer;
  isBestDeal: boolean;
  rank: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${
            star <= Math.floor(rating)
              ? "text-amber-400"
              : star - 0.5 <= rating
              ? "text-amber-300"
              : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function RetailerCard({ retailer, isBestDeal }: Props) {
  const savings =
    retailer.originalPrice !== null
      ? retailer.originalPrice - retailer.price
      : 0;
  const savePct =
    retailer.originalPrice !== null
      ? Math.round((savings / retailer.originalPrice) * 100)
      : 0;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-150 hover:shadow-md ${
        isBestDeal
          ? "border-green-400 shadow-sm shadow-green-100"
          : "border-gray-100 shadow-sm"
      }`}
    >
      <div className="p-4 flex items-center gap-3">
        {/* Logo pill */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: retailer.color + "18", color: retailer.color }}
        >
          {retailer.logo}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {isBestDeal && (
            <div className="text-xs text-green-600 font-medium mb-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Best deal
            </div>
          )}
          <div className="font-semibold text-base" style={{ color: retailer.color }}>
            {retailer.name}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-1">
              <StarRating rating={retailer.rating} />
              <span className="text-xs text-gray-500">
                {retailer.rating} ({retailer.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {retailer.badge && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                {retailer.badge}
              </span>
            )}
            <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              {retailer.shipping}
            </span>
            {retailer.inStock ? (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                📦 {retailer.delivery}
              </span>
            ) : (
              <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                Out of stock
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0 mr-2">
          <div className={`text-xl font-bold ${!retailer.inStock ? "text-gray-400" : "text-gray-900"}`}>
            ${retailer.price.toFixed(2)}
          </div>
          {retailer.originalPrice !== null && (
            <div className="text-xs text-gray-400 line-through">${retailer.originalPrice.toFixed(2)}</div>
          )}
          {savePct > 0 && (
            <div className="text-xs text-green-600 font-medium">Save {savePct}%</div>
          )}
        </div>

        {/* CTA */}
        {retailer.inStock ? (
          <a
            href={retailer.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150 flex-shrink-0 flex items-center gap-1"
          >
            Buy
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <div className="w-16 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}
