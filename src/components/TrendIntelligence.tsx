import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  BarChart2,
  Cpu,
  Layers,
  Info,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const TrendIntelligence: React.FC = () => {
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/trends')
      .then((res) => res.json())
      .then((data) => setTrends(data))
      .catch((err) => console.error('Failed to load trends:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            MARKET DATA ARCHITECTURE
          </span>
          <span className="text-xs text-slate-400">Strict Data Boundary Separation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          AI Trend Intelligence & Market Signals
        </h2>
        <p className="text-xs text-slate-400">
          This system strictly isolates actual on-chain transaction data from algorithmic interpretations and speculative forecasts.
        </p>
      </div>

      {loading || !trends ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          Loading market indices and categorized volume streams...
        </div>
      ) : (
        <div className="space-y-6">
          {/* SECTION 1: OBSERVED DATA */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  1. Observed Historical Data (Authoritative Records)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                VERIFIED MARKET TRANSACTIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trends.observedData.map((cat: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2"
                >
                  <span className="text-xs font-bold text-white block truncate">{cat.category}</span>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[10px] text-slate-400">7d Volume</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {cat.volume7dEth} ETH
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs font-mono">
                    <span className="text-slate-400">Avg Price</span>
                    <span className="text-slate-200">{cat.avgPriceEth} ETH</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs font-mono">
                    <span className="text-slate-400">7d Velocity</span>
                    <span className="text-indigo-400 font-bold">{cat.change7d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: AI INTERPRETATION */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
                  2. AI Algorithmic Interpretation (Synthesis & Pattern Analysis)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
                HEURISTIC SYNTHESIS
              </span>
            </div>

            <p className="text-sm text-slate-200 bg-slate-800/40 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans">
              {trends.aiInterpretation}
            </p>
          </div>

          {/* SECTION 3: FORECAST & ESTIMATES */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  3. Forecast & Forward Projections (Clearly Labeled Estimates)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                NOT GUARANTEED / ESTIMATED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trends.forecastEstimates.map((f: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-950/15 border border-amber-800/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{f.metric}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/30 text-amber-200">
                      {f.confidenceBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{f.projection}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
