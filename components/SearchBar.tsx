"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch: (q: string) => void;
  loading: boolean;
}

export default function SearchBar({ value, onChange, onSearch, loading }: Props) {
  return (
    <div className="flex max-w-xl mx-auto rounded-xl overflow-hidden border-2 border-orange-500 bg-white shadow-lg shadow-orange-500/10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
        placeholder="Search any product… e.g. iPhone 16, Sony TV, Nike shoes"
        className="flex-1 px-4 py-3.5 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
        disabled={loading}
      />
      <button
        onClick={() => onSearch(value)}
        disabled={loading || !value.trim()}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-6 py-3.5 text-sm font-medium transition-colors duration-150 flex items-center gap-2 whitespace-nowrap"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Searching...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Compare
          </>
        )}
      </button>
    </div>
  );
}
