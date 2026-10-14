import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Percent,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Layers,
  Sparkles,
  Calculator,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import type { GeneratedNFTItem, ResellerCalculation } from '../types/nft';

interface ValuationAndResellerProps {
  selectedItem?: GeneratedNFTItem | null;
}

export const ValuationAndReseller: React.FC<ValuationAndResellerProps> = ({ selectedItem }) => {
  const [activeTab, setActiveTab] = useState<'valuation' | 'reseller'>('valuation');

  // Valuation state
  const [valuationData, setValuationData] = useState<any>(null);
  const [valLoading, setValLoading] = useState(false);

  // Reseller state
  const [purchasePriceEth, setPurchasePriceEth] = useState<number>(0.05);
  const [expectedResaleEth, setExpectedResaleEth] = useState<number>(0.12);
  const [resellerResult, setResellerResult] = useState<ResellerCalculation | null>(null);
  const [resellerLoading, setResellerLoading] = useState(false);

  // Fetch AI Valuation
  const fetchValuation = async () => {
    setValLoading(true);
    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: selectedItem,
          chain: selectedItem?.chain || 'ethereum',
        }),
      });
      const data = await res.json();
      setValuationData(data.valuation);
    } catch (err) {
      console.error('Failed to fetch valuation:', err);
    } finally {
      setValLoading(false);
    }
  };

  // Run Reseller Arbitrage Calculation
  const runResellerCalc = async () => {
    setResellerLoading(true);
    try {
      const res = await fetch('/api/reseller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchasePriceEth,
          estimatedResaleEth: expectedResaleEth,
          chain: 'ethereum',
        }),
      });
      const data = await res.json();
      setResellerResult(data.calculation);
    } catch (err) {
      console.error('Failed to calculate reseller margin:', err);
    } finally {
      setResellerLoading(false);
    }
  };

  useEffect(() => {
    fetchValuation();
    runResellerCalc();
  }, [selectedItem]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ESTIMATED MARKET INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400">Never Guaranteed / Statistical Models</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            AI Valuation & Reseller Arbitrage Engine
          </h2>
          <p className="text-xs text-slate-400">
            Real-time fee deduction modeling, break-even thresholds, comparable marketplace transactions, and scenario simulations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('valuation')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'valuation'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Valuation Engine
          </button>
          <button
            onClick={() => setActiveTab('reseller')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'reseller'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            «Can I Buy & Resell This?»
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer Callout */}
      <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3.5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <span className="font-bold text-amber-300 uppercase">Strict Regulatory & Pricing Disclaimer: </span>
          All projections, break-even points, and valuations are algorithmic estimates. Universal AI NFT Factory never guarantees profits, future liquidity, floor prices, or sales execution. Always perform independent due diligence.
        </div>
      </div>

      {/* TAB 1: VALUATION ENGINE */}
      {activeTab === 'valuation' && (
        <div className="space-y-6">
          {valLoading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin inline-block mb-2"></span>
              <p>Analyzing comparable sales, trait scarcity weights & liquidity...</p>
            </div>
          ) : valuationData ? (
            <div className="space-y-6">
              {/* Three-Tier Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Conservative */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Conservative (Liquidity Floor)
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      {valuationData.conservativeEth} ETH
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ≈ ${valuationData.conservativeUsd}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Recommended for instant sell-through under neutral market sentiment.
                  </p>
                </div>

                {/* Fair Target */}
                <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border border-indigo-500/40 rounded-2xl p-5 space-y-2 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-950/40">
                  <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Fair Market Estimate</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-[9px] font-bold">OPTIMAL</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-indigo-300 font-mono">
                      {valuationData.fairEth} ETH
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      ≈ ${valuationData.fairUsd}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Calculated from trait scarcity score & median category velocity.
                  </p>
                </div>

                {/* Optimistic */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                    Optimistic (Peak Demand)
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      {valuationData.optimisticEth} ETH
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ≈ ${valuationData.optimisticUsd}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Achievable during curated auction cycles or collector bidding runs.
                  </p>
                </div>
              </div>

              {/* Fee Deductions Breakdown & Break-Even */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Marketplace & Gas Fee Deductions
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">OpenSea / Blur Marketplace Fee (2.5%)</span>
                      <span className="font-mono text-slate-200">${valuationData.marketplaceFeeUsd}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Secondary Creator Royalty (5.0%)</span>
                      <span className="font-mono text-indigo-400">${valuationData.creatorRoyaltyUsd}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Estimated Network Gas Execution</span>
                      <span className="font-mono text-slate-200">${valuationData.estimatedGasUsd}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-white">Minimum Break-Even Sell Price</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        {valuationData.breakEvenSellPriceEth} ETH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Market Demand & Liquidity Indicators */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    Demand & Liquidity Indicators
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-1">7d Volume Trend</span>
                      <span className="font-mono font-bold text-emerald-400 text-base">
                        {valuationData.demandIndicators.volumeTrend7d}
                      </span>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-1">Unique Holders Ratio</span>
                      <span className="font-mono font-bold text-white text-base">
                        {valuationData.demandIndicators.uniqueHoldersRatio}
                      </span>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-1">Bid-to-Ask Ratio</span>
                      <span className="font-mono font-bold text-indigo-400 text-base">
                        {valuationData.demandIndicators.bidToAskRatio}
                      </span>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block mb-1">Market Sentiment</span>
                      <span className="font-mono font-bold text-purple-400 text-base">
                        {valuationData.demandIndicators.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparable Sales Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recent Comparable Verified Marketplace Sales
                </h4>
                <div className="space-y-2">
                  {valuationData.comparables.map((comp: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-800/40 border border-slate-800"
                    >
                      <div>
                        <span className="font-bold text-white">{comp.name}</span>
                        <span className="text-slate-400 text-[11px] block">{comp.date} via {comp.marketplace}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {comp.soldPriceEth} ETH
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* TAB 2: AI RESELLER ARBITRAGE CALCULATOR */}
      {activeTab === 'reseller' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">
              «Can I buy this and resell it?» Arbitrage Analyzer
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter target acquisition price and estimated resale exit to compute all statutory marketplace fees, maximum safe buying bid, and scenario margin profiles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Target Purchase / Acquisition Price (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.005"
                    min="0.001"
                    value={purchasePriceEth}
                    onChange={(e) => setPurchasePriceEth(parseFloat(e.target.value) || 0.01)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400">
                    ≈ ${(purchasePriceEth * 3450).toFixed(0)} USD
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Expected Resale Exit Target (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.005"
                    min="0.001"
                    value={expectedResaleEth}
                    onChange={(e) => setExpectedResaleEth(parseFloat(e.target.value) || 0.01)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400">
                    ≈ ${(expectedResaleEth * 3450).toFixed(0)} USD
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={runResellerCalc}
              disabled={resellerLoading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Arbitrage & Break-Even Margins</span>
            </button>
          </div>

          {resellerResult && (
            <div className="space-y-6">
              {/* Top Summary Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Max Safe Buying Price
                  </span>
                  <span className="text-xl font-bold font-mono text-indigo-400">
                    {resellerResult.maxBuyingPriceEth} ETH
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Ceiling to protect margin</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Break-Even Resale Target
                  </span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    {resellerResult.breakEvenPriceEth} ETH
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Includes gas & fees</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Projected Net Margin
                  </span>
                  <span className={`text-xl font-bold font-mono ${
                    resellerResult.projectedNetMarginPercent > 20
                      ? 'text-emerald-400'
                      : resellerResult.projectedNetMarginPercent > 0
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}>
                    {resellerResult.projectedNetMarginPercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Net of all deductions</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Arbitrage Risk Rating
                  </span>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded inline-block font-mono ${
                    resellerResult.riskRating === 'LOW'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : resellerResult.riskRating === 'MEDIUM'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {resellerResult.riskRating} RISK
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">{resellerResult.arbitrageRating}</span>
                </div>
              </div>

              {/* Scenario Analysis Grid */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Stress-Test Scenario Analysis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {resellerResult.scenarios.map((scen, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-1.5"
                    >
                      <span className="text-xs font-bold text-white block">{scen.condition}</span>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/50">
                        <span className="text-slate-400">Exit Price:</span>
                        <span className="font-mono text-slate-200">{scen.resaleEth} ETH</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Net Profit:</span>
                        <span className={`font-mono font-bold ${scen.netProfitUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ${scen.netProfitUsd} USD
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">ROI:</span>
                        <span className={`font-mono font-bold ${scen.roiPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {scen.roiPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
