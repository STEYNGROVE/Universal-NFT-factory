import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Download,
  ExternalLink,
  Filter,
  CheckCircle,
  Copy,
  Hash,
  Eye,
  Rocket,
  Info,
} from 'lucide-react';
import type { GeneratedNFTItem, RarityTier, NFTSpecification } from '../types/nft';

interface CollectionViewerProps {
  items: GeneratedNFTItem[];
  spec: NFTSpecification | null;
  onMintSingle: (item: GeneratedNFTItem) => void;
  onMintBatch: () => void;
  onOpenValuation: (item: GeneratedNFTItem) => void;
  onOpenPassport: (item: GeneratedNFTItem) => void;
}

export const CollectionViewer: React.FC<CollectionViewerProps> = ({
  items,
  spec,
  onMintSingle,
  onMintBatch,
  onOpenValuation,
  onOpenPassport,
}) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [inspectedItem, setInspectedItem] = useState<GeneratedNFTItem | null>(items[0] || null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const filteredItems = selectedRarity === 'ALL'
    ? items
    : items.filter((item) => item.rarityTier === selectedRarity);

  const rarityCounts = items.reduce((acc, it) => {
    acc[it.rarityTier] = (acc[it.rarityTier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const downloadJsonMetadata = (item: GeneratedNFTItem) => {
    const metadata = {
      name: item.name,
      description: item.description,
      image: item.image,
      external_url: `https://universal-nft-factory.app/asset/${item.sha256Hash}`,
      attributes: item.attributes.map((a) => ({
        trait_type: a.trait_type,
        value: a.value,
        rarity_tier: a.rarity,
        rarity_score: a.rarityScoreContribution,
      })),
      properties: {
        edition: item.edition,
        rarity_rank: item.rarityRank,
        rarity_score: item.rarityScore,
        sha256_fingerprint: item.sha256Hash,
        creator: 'Universal AI NFT Factory',
        seller_fee_basis_points: spec?.royaltyFeeBasisPoints || 500,
      },
    };

    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.name.replace(/\s+/g, '_')}_metadata.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSvgImage = (item: GeneratedNFTItem) => {
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.name.replace(/\s+/g, '_')}.svg`;
    link.click();
  };

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Generated Items Yet</h3>
        <p className="text-sm text-slate-400">
          Enter a prompt in the Studio tab and proceed to generate your first collection.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Collection Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              100% DUPLICATE-FREE VERIFIED
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {items.length} Unique Assets Generated
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {spec?.title || 'Generated AI Collection'}
          </h2>
          <p className="text-xs text-slate-400">
            Statistical Rarity scoring calculated using standard 1/frequency algorithm across all trait layers.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onMintBatch}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-300" />
            <span>Launch Entire Collection ({items.length} NFTs)</span>
          </button>
        </div>
      </div>

      {/* Rarity Distribution Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 pl-1">
          <Filter className="w-3 h-3 text-indigo-400" /> Filter:
        </span>
        <button
          onClick={() => setSelectedRarity('ALL')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            selectedRarity === 'ALL'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
          }`}
        >
          All ({items.length})
        </button>
        {(['MYTHIC', 'LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'] as RarityTier[]).map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedRarity(tier)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedRarity === tier
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tier} ({rarityCounts[tier] || 0})
          </button>
        ))}
      </div>

      {/* Main Layout: Grid of NFTs + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: NFT Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setInspectedItem(item)}
              className={`group bg-slate-900/60 border rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                inspectedItem?.id === item.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-950/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Media Preview */}
              <div className="aspect-square bg-slate-950 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/african_lion_warrior.jpg';
                  }}
                />
                {/* Rarity Rank Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-sm">
                  #{item.rarityRank}
                </div>
                {/* Tier Badge */}
                <div
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold backdrop-blur-sm ${
                    item.rarityTier === 'MYTHIC'
                      ? 'bg-pink-500/30 text-pink-300 border border-pink-500/40'
                      : item.rarityTier === 'LEGENDARY'
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                      : item.rarityTier === 'EPIC'
                      ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                      : item.rarityTier === 'RARE'
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-500/40'
                      : item.rarityTier === 'UNCOMMON'
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/80 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item.rarityTier}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white truncate">{item.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Score: {item.rarityScore}</span>
                  <span className="text-indigo-400">{item.edition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 1 Col: Inspected Item Inspector */}
        {inspectedItem && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-24 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Selected Asset</span>
                <h3 className="text-lg font-black text-white">{inspectedItem.name}</h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 block">Rarity Rank</span>
                <span className="text-sm font-bold text-amber-400">Rank #{inspectedItem.rarityRank}</span>
              </div>
            </div>

            {/* High-res vector render preview */}
            <div
              onClick={() => setShowMetadataModal(true)}
              className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner relative group cursor-zoom-in"
            >
              <img
                src={inspectedItem.image}
                alt={inspectedItem.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Click to Expand Master Image</span>
                </span>
              </div>
            </div>

            {/* SHA-256 Fingerprint */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <Hash className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="font-mono text-slate-400 truncate text-[11px]">
                  {inspectedItem.sha256Hash}
                </span>
              </div>
              <button
                onClick={() => handleCopyHash(inspectedItem.sha256Hash)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold shrink-0 pl-2 cursor-pointer"
              >
                {copiedHash ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Trait breakdown table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Attributes & Rarity Contribution</span>
                <span className="text-indigo-400 font-mono text-[11px]">
                  Total: {inspectedItem.rarityScore} pts
                </span>
              </h4>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {inspectedItem.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/40 border border-slate-800"
                  >
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">
                        {attr.trait_type}
                      </span>
                      <span className="text-white font-medium">{attr.value}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold text-amber-400 block">
                        +{attr.rarityScoreContribution} pts
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">{attr.rarity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Mint, Download, Valuation, Passport */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => onMintSingle(inspectedItem)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Mint This Asset on {inspectedItem.chain.toUpperCase()}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenValuation(inspectedItem)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  <span>AI Valuation</span>
                </button>

                <button
                  onClick={() => onOpenPassport(inspectedItem)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  <span>Asset Passport</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => downloadSvgImage(inspectedItem)}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Download SVG</span>
                </button>

                <button
                  onClick={() => downloadJsonMetadata(inspectedItem)}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Master Artwork Lightbox Modal */}
      {showMetadataModal && inspectedItem && (
        <div
          onClick={() => setShowMetadataModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h3 className="text-base font-bold text-white">
                  {inspectedItem.name} — Full Master Resolution
                </h3>
              </div>
              <button
                onClick={() => setShowMetadataModal(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close (ESC)
              </button>
            </div>

            <div className="max-h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950">
              <img
                src={inspectedItem.image}
                alt={inspectedItem.name}
                className="max-h-[62vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-amber-400 font-bold">{inspectedItem.rarityTier}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Score: {inspectedItem.rarityScore}</span>
                <span className="text-slate-500">•</span>
                <span className="text-indigo-400">{inspectedItem.edition}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={inspectedItem.image}
                  download={`${inspectedItem.name.replace(/\s+/g, '_')}_master.jpg`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Lossless Master Image</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
