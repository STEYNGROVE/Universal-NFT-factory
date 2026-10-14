import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Scale,
  Shield,
  Layers,
  Edit3,
  ArrowRight,
  TrendingUp,
  Percent,
  Cpu,
  Info,
} from 'lucide-react';
import type { NFTSpecification, TraitCategory, RarityTier, SupportedChainId } from '../types/nft';

interface SpecViewProps {
  spec: NFTSpecification;
  onUpdateSpec: (updated: NFTSpecification) => void;
  onProceedToGeneration: (count: number) => void;
  isLoading: boolean;
}

export const SpecView: React.FC<SpecViewProps> = ({
  spec,
  onUpdateSpec,
  onProceedToGeneration,
  isLoading,
}) => {
  const [editableSpec, setEditableSpec] = useState<NFTSpecification>(spec);
  const [generationCount, setGenerationCount] = useState<number>(
    spec.nftType === '1_OF_1' ? 1 : Math.min(spec.supply, 10)
  );
  const [activeTab, setActiveTab] = useState<'spec' | 'utility' | 'traits'>('spec');
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof NFTSpecification, value: any) => {
    const updated = { ...editableSpec, [field]: value };
    setEditableSpec(updated);
    onUpdateSpec(updated);
  };

  const getFitBadge = (rec: string) => {
    switch (rec) {
      case 'STRONG_FIT':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          label: 'Strong Web3 Token Fit',
        };
      case 'MODERATE_FIT':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          label: 'Moderate Utility Fit',
        };
      default:
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          label: 'Consider Web2 / Traditional Legal Escrow',
        };
    }
  };

  const fit = getFitBadge(editableSpec.shouldBeNftScore.recommendation);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              STEP 2 OF 5: REVIEW SPECIFICATION
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {editableSpec.id}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {editableSpec.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Original prompt: “{editableSpec.prompt}”
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isEditing ? 'Save Specification' : 'Edit Specification'}</span>
          </button>

          <button
            type="button"
            onClick={() => onProceedToGeneration(generationCount)}
            disabled={isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Generating Collection...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Generate {generationCount} Unique {editableSpec.nftType === '1_OF_1' ? 'NFT' : 'NFTs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Created Visual Asset Showcase */}
      {editableSpec.previewImage && (
        <div className="mt-6 mb-8 p-5 bg-gradient-to-r from-slate-900/90 via-indigo-950/30 to-slate-900/90 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Main Visual Image Display */}
            <div className="w-full sm:w-80 lg:w-96 aspect-square rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/50 shadow-2xl relative group shrink-0">
              <img
                src={editableSpec.previewImage}
                alt={editableSpec.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/african_lion_warrior.jpg';
                }}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AI CREATED MASTER ARTWORK</span>
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-950/80 text-white border border-slate-700 backdrop-blur-md">
                2048 x 2048
              </div>
            </div>

            {/* Asset Details & Companion Gallery */}
            <div className="flex-1 space-y-4 text-left">
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  Verified Visual Synthesis Output
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {editableSpec.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Synthesized in <span className="font-bold text-white">{editableSpec.visualStyle}</span> aesthetic based on your prompt. Lossless master layers generated and ready for tokenization.
                </p>
              </div>

              {/* Companion Renders Switcher */}
              {editableSpec.artworkGallery && editableSpec.artworkGallery.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
                    Alternative Aesthetic Variations (Click to select master)
                  </label>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {editableSpec.artworkGallery.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleFieldChange('previewImage', imgUrl)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          editableSpec.previewImage === imgUrl
                            ? 'border-indigo-400 ring-2 ring-indigo-500/50 scale-105'
                            : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                        }`}
                      >
                        <img src={imgUrl} alt={`Variation ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800/80 text-slate-200 border border-slate-700">
                  Style: {editableSpec.visualStyle}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800/80 text-slate-200 border border-slate-700">
                  Target: {editableSpec.tokenStandard}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Supply: {editableSpec.supply.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation sub-tabs */}
      <div className="flex items-center gap-2 mt-6 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('spec')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'spec'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Structured Specification
        </button>

        <button
          onClick={() => setActiveTab('utility')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'utility'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          «Should This Be An NFT?» Analyzer
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
            {editableSpec.shouldBeNftScore.score}/100
          </span>
        </button>

        <button
          onClick={() => setActiveTab('traits')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'traits'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Trait Layers & Matrix ({editableSpec.categories.length})
        </button>
      </div>

      {/* Tab 1: Structured Specification */}
      {activeTab === 'spec' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Core Blueprint Card */}
            <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Asset Blueprint & Creative Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Subject</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableSpec.subject}
                      onChange={(e) => handleFieldChange('subject', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                      {editableSpec.subject}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Theme</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableSpec.theme}
                      onChange={(e) => handleFieldChange('theme', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                      {editableSpec.theme}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Visual Art Style</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableSpec.visualStyle}
                      onChange={(e) => handleFieldChange('visualStyle', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                      {editableSpec.visualStyle}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Materials / Textures</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableSpec.materials}
                      onChange={(e) => handleFieldChange('materials', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                      {editableSpec.materials}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 block mb-1">Environment / Setting</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableSpec.environment}
                      onChange={(e) => handleFieldChange('environment', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                      {editableSpec.environment}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 block mb-1">Story & Lore</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editableSpec.lore}
                      onChange={(e) => handleFieldChange('lore', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  ) : (
                    <p className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800 leading-relaxed">
                      {editableSpec.lore}
                    </p>
                  )}
                </div>
              </div>

              {/* Utility Perks list */}
              <div className="pt-2">
                <label className="text-xs text-slate-400 block mb-2 font-semibold">
                  Programmed Token Utility & Collector Perks
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {editableSpec.utilityPerks.map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blockchain & Economics Card */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  On-Chain Architecture
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Token Standard</span>
                    <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                      {editableSpec.tokenStandard}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Recommended Chain</span>
                    <span className="font-bold text-emerald-400 capitalize flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {editableSpec.recommendedChain}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Total Supply</span>
                    <span className="font-mono font-bold text-white">
                      {editableSpec.supply.toLocaleString()} Items
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Secondary Creator Royalty</span>
                    <span className="font-mono font-bold text-indigo-400">
                      {(editableSpec.royaltyFeeBasisPoints / 100).toFixed(1)}% (EIP-2981)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Metadata Storage Target</span>
                    <span className="font-mono text-slate-300">IPFS / Arweave Immutable</span>
                  </div>
                </div>
              </div>

              {/* Fast Generation Count Selector */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Generation Batch Size
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">
                  Select how many unique combinations to generate with verified rarity distribution.
                </p>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[1, 5, 10, 25].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setGenerationCount(cnt)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        generationCount === cnt
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cnt} {cnt === 1 ? 'NFT' : 'NFTs'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Custom generation limit:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={generationCount}
                    onChange={(e) => setGenerationCount(parseInt(e.target.value, 10) || 1)}
                    className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: «Should This Actually Be An NFT?» */}
      {activeTab === 'utility' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${fit.bg}`}>
                  {fit.label}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Utility Evaluation Score: {editableSpec.shouldBeNftScore.score}/100
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Objective Web3 Utility & Feasibility Assessment
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                The AI analyzes whether tokenization provides genuine technical utility vs unnecessary speculative friction.
              </p>
            </div>

            {/* Score Radial indicator */}
            <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-400 font-mono">
                  {editableSpec.shouldBeNftScore.score}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Fit Score</div>
              </div>
              <div className="w-12 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                  style={{ width: `${editableSpec.shouldBeNftScore.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Reasoning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technological Rationale
            </h4>
            <p className="text-sm text-slate-200 bg-slate-800/40 p-4 rounded-xl border border-slate-800 leading-relaxed">
              {editableSpec.shouldBeNftScore.reasoning}
            </p>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/15 border border-emerald-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Genuine Value-Add of Tokenization
              </h4>
              <ul className="space-y-2">
                {editableSpec.shouldBeNftScore.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-950/15 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Friction & Trade-Off Considerations
              </h4>
              <ul className="space-y-2">
                {editableSpec.shouldBeNftScore.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal / Physical Asset Distinction Notice */}
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white mb-1">
                Legal Ownership vs Digital Record Clarification
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                {editableSpec.shouldBeNftScore.legalNotice}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Trait Layers & Matrix */}
      {activeTab === 'traits' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Combinatorial Trait Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Trait categories, options, and probability weights used to guarantee unique mints.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              {editableSpec.categories.reduce((acc, cat) => acc * cat.options.length, 1).toLocaleString()} Total Combinations Possible
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editableSpec.categories.map((cat, idx) => (
              <div key={cat.id || idx} className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50">
                  <span className="text-xs font-bold text-white">{cat.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {cat.options.length} options
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {cat.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="flex items-center justify-between text-xs p-1.5 rounded bg-slate-900/60 border border-slate-800/60"
                    >
                      <span className="text-slate-300 font-medium truncate max-w-[200px]">
                        {opt.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            opt.rarity === 'MYTHIC'
                              ? 'bg-pink-500/20 text-pink-300'
                              : opt.rarity === 'LEGENDARY'
                              ? 'bg-amber-500/20 text-amber-300'
                              : opt.rarity === 'EPIC'
                              ? 'bg-purple-500/20 text-purple-300'
                              : opt.rarity === 'RARE'
                              ? 'bg-blue-500/20 text-blue-300'
                              : opt.rarity === 'UNCOMMON'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {opt.rarity}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {opt.weight}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
