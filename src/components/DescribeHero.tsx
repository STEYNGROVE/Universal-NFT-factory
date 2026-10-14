import React, { useState } from 'react';
import { Sparkles, ArrowRight, Sliders, CheckCircle2, Zap, Layers, ShieldCheck, HelpCircle } from 'lucide-react';
import type { NFTType, VisualStyle, SupportedChainId } from '../types/nft';

interface DescribeHeroProps {
  onGenerate: (prompt: string, options?: {
    nftType?: NFTType;
    visualStyle?: VisualStyle;
    supply?: number;
    chain?: SupportedChainId;
  }) => void;
  isLoading: boolean;
}

const EXAMPLE_PROMPTS = [
  'Create a futuristic African lion warrior with cybernetic gold armor.',
  'Create a 10,000-piece cyberpunk animal collection with neon visors.',
  'Create a luxury digital membership NFT for an elite private club.',
  'Create a collectible trading-card collection of ancient elemental titans.',
  'Create a 1-of-1 surreal artwork depicting a clockwork galaxy in a bottle.',
  'Create 500 fantasy dragons with different elemental powers and glowing runes.',
  'Create a digital certificate for a limited-edition physical vintage watch.',
];

const NFT_TYPES: { id: NFTType; label: string; desc: string }[] = [
  { id: '1_OF_1', label: '1-of-1 Single Art', desc: 'Unique master artwork' },
  { id: 'GENERATIVE_COLLECTION', label: 'Generative Collection', desc: '10 to 10,000 algorithmic combinations' },
  { id: 'MEMBERSHIP_NFT', label: 'Membership Pass', desc: 'Utility & community access' },
  { id: 'TICKET_NFT', label: 'Event Ticket', desc: 'Anti-counterfeit admission pass' },
  { id: 'DIGITAL_CERTIFICATE', label: 'Digital Certificate', desc: 'Authenticity & ownership records' },
  { id: 'GAME_ASSET', label: 'Game Asset', desc: 'Characters, weapons & skins' },
  { id: 'DYNAMIC_NFT', label: 'Dynamic NFT', desc: 'Evolving on-chain metadata' },
  { id: 'PHYSICAL_ASSET_LINKED', label: 'Physical-Asset Linked', desc: 'Dual digital twin record' },
];

const VISUAL_STYLES: VisualStyle[] = [
  'Cinematic',
  '3D',
  'Photorealistic',
  'Anime',
  'Pixel Art',
  'Comic',
  'Luxury',
  'Fantasy',
  'Sci-Fi',
  'Surreal',
  'Abstract',
  'Minimalist',
  'Product Render',
];

export const DescribeHero: React.FC<DescribeHeroProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedType, setSelectedType] = useState<NFTType>('GENERATIVE_COLLECTION');
  const [selectedStyle, setSelectedStyle] = useState<VisualStyle>('Cinematic');
  const [supply, setSupply] = useState(100);
  const [selectedChain, setSelectedChain] = useState<SupportedChainId>('polygon');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    onGenerate(prompt.trim(), {
      nftType: selectedType,
      visualStyle: selectedStyle,
      supply: selectedType === '1_OF_1' ? 1 : supply,
      chain: selectedChain,
    });
  };

  const selectExample = (ex: string) => {
    setPrompt(ex);
    // Auto-detect 1-of-1 if in text
    if (ex.toLowerCase().includes('1-of-1') || ex.toLowerCase().includes('1 of 1')) {
      setSelectedType('1_OF_1');
      setSupply(1);
    } else if (ex.toLowerCase().includes('membership')) {
      setSelectedType('MEMBERSHIP_NFT');
    } else if (ex.toLowerCase().includes('certificate')) {
      setSelectedType('DIGITAL_CERTIFICATE');
    } else if (ex.toLowerCase().includes('dragon') || ex.toLowerCase().includes('cyberpunk animal')) {
      setSelectedType('GENERATIVE_COLLECTION');
    }
  };

  return (
    <div className="relative py-10 sm:py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/20 to-pink-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Core Vision Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>DESCRIBE → GENERATE → REVIEW → MINT → LIST → SELL → ANALYZE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
          “What NFT do you want to create?”
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Enter any plain-language idea. The AI engine designs traits, generates mathematical rarity distributions, verifies uniqueness, writes metadata, and prepares multi-chain deployment.
        </p>

        {/* Central Description Box */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl shadow-indigo-950/40 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Create a 10,000-piece cyberpunk African lion warrior collection with holographic gold armor, cyber katanas, and neon savannah backgrounds..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base p-3 resize-none focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 mt-1 px-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 py-1.5 px-3 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>{showAdvanced ? 'Hide Advanced Controls' : 'Advanced Controls (Optional)'}</span>
              </button>

              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Analyzing & Designing NFT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>✨ GENERATE NFT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Optional Advanced Settings Tray */}
        {showAdvanced && (
          <div className="mb-8 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl text-left transition-all animate-fadeIn">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Advanced Architecture Overrides
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* NFT Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset Structure</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as NFTType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {NFT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  {NFT_TYPES.find((t) => t.id === selectedType)?.desc}
                </p>
              </div>

              {/* Visual Style */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Visual Art Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value as VisualStyle)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {VISUAL_STYLES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">Procedural rendering & aesthetic direction</p>
              </div>

              {/* Collection Supply */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Collection Supply</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  disabled={selectedType === '1_OF_1'}
                  value={selectedType === '1_OF_1' ? 1 : supply}
                  onChange={(e) => setSupply(parseInt(e.target.value, 10) || 10)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  {selectedType === '1_OF_1' ? 'Fixed 1/1 Masterpiece' : 'Total unique token count (1-10,000)'}
                </p>
              </div>

              {/* Recommended Chain */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Deployment Chain</label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value as SupportedChainId)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 capitalize"
                >
                  <option value="polygon">Polygon PoS (Low Fee)</option>
                  <option value="arbitrum">Arbitrum L2 (High Security)</option>
                  <option value="base">Base L2 (Coinbase)</option>
                  <option value="ethereum">Ethereum L1 (High Value Art)</option>
                  <option value="solana">Solana (High Speed)</option>
                  <option value="optimism">Optimism L2</option>
                  <option value="avalanche">Avalanche C-Chain</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">Modular network adapter target</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Example Pills */}
        <div className="text-left">
          <p className="text-xs font-medium text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Try one of these creative prompts:</span>
          </p>

          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((ex, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectExample(ex)}
                className="text-left text-xs bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/60 hover:border-indigo-500/50 transition-all cursor-pointer"
              >
                “{ex}”
              </button>
            ))}
          </div>
        </div>

        {/* Featured Master Images Created By AI Showcase */}
        <div className="mt-10 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                VISUAL ENGINE SHOWCASE
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Featured AI-Generated Master Assets
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Click any artwork to load prompt & blueprint
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                title: 'Lion Cyber Warrior',
                style: 'Cinematic 3D',
                img: '/assets/images/african_lion_warrior.jpg',
                promptText: 'Create a futuristic African lion warrior with cybernetic gold armor, plasma blades, and neon savannah backgrounds.',
              },
              {
                title: 'Cyberpunk Tiger',
                style: 'Cyber Neon',
                img: '/assets/images/cyberpunk_tiger_visor.jpg',
                promptText: 'Create a 10,000-piece cyberpunk tiger warrior collection with neon visors and holographic katanas.',
              },
              {
                title: 'Magma Fire Dragon',
                style: 'Fantasy 3D',
                img: '/assets/images/fantasy_fire_dragon.jpg',
                promptText: 'Create 500 fantasy dragons with glowing magma runes and elemental powers.',
              },
              {
                title: 'Clockwork Galaxy',
                style: 'Surreal Masterpiece',
                img: '/assets/images/surreal_cosmic_bottle.jpg',
                promptText: 'Create a 1-of-1 surreal artwork depicting a clockwork galaxy in an ornate glass bottle.',
              },
              {
                title: 'Swiss Chronograph',
                style: 'Physical Luxury',
                img: '/assets/images/luxury_vintage_watch.jpg',
                promptText: 'Create a digital certificate and provenance record for a limited-edition physical vintage Swiss watch.',
              },
              {
                title: 'Anime Cyber Hacker',
                style: 'Anime Masterpiece',
                img: '/assets/images/cyberpunk_anime_avatar.jpg',
                promptText: 'Create a cyberpunk anime female hacker character with glowing magenta hair and tech jacket.',
              },
            ].map((art, idx) => (
              <div
                key={idx}
                onClick={() => selectExample(art.promptText)}
                className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-lg"
              >
                <div className="aspect-square bg-slate-950 overflow-hidden relative">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 text-left">
                    <span className="text-[9px] font-mono font-bold text-amber-300 block truncate">
                      {art.style}
                    </span>
                    <span className="text-[11px] font-bold text-white block truncate leading-tight">
                      {art.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zero Prior Knowledge Value Props */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/60 text-left">
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-indigo-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> No Coding
            </div>
            <p className="text-[11px] text-slate-400">Contracts, metadata, and token standards generated automatically.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-purple-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> No Design Skills
            </div>
            <p className="text-[11px] text-slate-400">Procedural trait rendering and multi-layer asset synthesis.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-emerald-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> True Uniqueness
            </div>
            <p className="text-[11px] text-slate-400">Deterministic duplicate detection ensures 100% mathematical scarcity.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="text-amber-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Asset Passports
            </div>
            <p className="text-[11px] text-slate-400">SHA-256 cryptographic provenance anchored to every single asset.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
