import React, { useState } from 'react';
import {
  Megaphone,
  Twitter,
  MessageSquare,
  Instagram,
  FileText,
  Mail,
  Copy,
  CheckCircle2,
  Sparkles,
  Rocket,
} from 'lucide-react';
import type { NFTSpecification } from '../types/nft';

interface CreatorAgentViewProps {
  spec: NFTSpecification | null;
}

export const CreatorAgentView: React.FC<CreatorAgentViewProps> = ({ spec }) => {
  const [activePlatform, setActivePlatform] = useState<
    'twitter' | 'discord' | 'instagram' | 'press' | 'email'
  >('twitter');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const title = spec?.title || 'Cybernetic Lion Genesis Collection';
  const subject = spec?.subject || 'Cybernetic Lion Warrior';
  const theme = spec?.theme || 'Futuristic African Cyberpunk';

  const campaign = {
    twitter: [
      `1/ Introducing ${title} ✨\n\nA revolutionary digital collection exploring ${subject} through the lens of ${theme}.\n\nBuilt for collectors who value true cryptographic provenance and sovereign ownership. 🧵👇`,
      `2/ The Lore & Concept 🏛️\n\nEvery asset is generated with mathematically verified trait distributions. No duplicate combinations, full SHA-256 asset passports, and on-chain rarity indexing.`,
      `3/ Collector Perks & Utility 🗝️\n\n• Token-gated high-res lossless master download\n• Verified Asset Passport with cryptographic integrity\n• Creator ecosystem priority whitelist access\n• Full commercial merchandising rights`,
      `4/ Launch & Mint Details 🚀\n\nMint is going live now. Transparent royalty distribution and decentralized metadata storage. Secure yours before the drop concludes!`,
    ],
    discord: `@everyone 🚨 **OFFICIAL DROP ANNOUNCEMENT: ${title}** 🚨\n\nWe are thrilled to unveil our latest release! Combining ${theme} aesthetics with high-fidelity asset design.\n\n**Key Highlights:**\n✅ Verified Rarity Scoring (1/Frequency standard)\n✅ CC0 / Commercial Usage Rights\n✅ Permanent Asset Passport with SHA-256 cryptographic integrity\n\n👉 Join the whitelist or mint directly in the Studio!`,
    instagram: [
      `What happens when ${subject} meets cutting-edge generative AI? Introducing ${title}. Link in bio.`,
      `Stop buying ordinary JPEGs. Start owning cryptographic digital assets with verified provenance.`,
      `Inside the creation of ${title}: The future of Web3 digital ownership.`,
    ],
    press: `FOR IMMEDIATE RELEASE: Universal AI NFT Factory debuts "${title}", a digital collection that eliminates technical friction while delivering cryptographic provenance and enterprise-grade asset passports. Designed for global art connoisseurs and decentralized culture advocates.`,
    email: `Subject: Exclusive Access: ${title} is Now Minting\n\nDear Collector,\n\nWe are excited to share our latest project with you. ${title} brings together ${theme} visual mastery with verifiable scarcity on-chain.\n\nInspect the complete trait distribution and asset passport in our Studio today.`,
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              CREATOR BUSINESS MANAGER
            </span>
            <span className="text-xs text-slate-400">Marketing & Launch Campaigns</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            AI Creator Business Marketing Agent
          </h2>
          <p className="text-xs text-slate-400">
            Automatically generate viral Twitter/X threads, Discord community drops, press releases, and collector newsletters.
          </p>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        <button
          onClick={() => setActivePlatform('twitter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'twitter'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Twitter className="w-3.5 h-3.5" />
          <span>Twitter / X Thread</span>
        </button>

        <button
          onClick={() => setActivePlatform('discord')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'discord'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discord Announcement</span>
        </button>

        <button
          onClick={() => setActivePlatform('instagram')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'instagram'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>Instagram / TikTok Hooks</span>
        </button>

        <button
          onClick={() => setActivePlatform('press')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'press'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Press Release</span>
        </button>

        <button
          onClick={() => setActivePlatform('email')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'email'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Collector Newsletter</span>
        </button>
      </div>

      {/* Content Viewers */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
        {/* TWITTER */}
        {activePlatform === 'twitter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Full 4-Tweet Launch Sequence
              </h4>
              <button
                onClick={() => handleCopy(campaign.twitter.join('\n\n---\n\n'), 'all-twitter')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold cursor-pointer"
              >
                {copiedKey === 'all-twitter' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'all-twitter' ? 'Copied Entire Thread' : 'Copy Entire Thread'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {campaign.twitter.map((tweet, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">Tweet {idx + 1}/4</span>
                    <button
                      onClick={() => handleCopy(tweet, `tw-${idx}`)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      {copiedKey === `tw-${idx}` ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">{tweet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISCORD */}
        {activePlatform === 'discord' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Discord Server Announcement (Markdown Ready)
              </h4>
              <button
                onClick={() => handleCopy(campaign.discord, 'discord')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold cursor-pointer"
              >
                {copiedKey === 'discord' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'discord' ? 'Copied' : 'Copy Discord Post'}</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed">
              {campaign.discord}
            </div>
          </div>
        )}

        {/* INSTAGRAM */}
        {activePlatform === 'instagram' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-800">
              Instagram / Reels / TikTok High-Engagement Hooks
            </h4>
            <div className="space-y-3">
              {campaign.instagram.map((hook, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-200">“{hook}”</p>
                  <button
                    onClick={() => handleCopy(hook, `ig-${idx}`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold shrink-0 cursor-pointer"
                  >
                    {copiedKey === `ig-${idx}` ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRESS RELEASE */}
        {activePlatform === 'press' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Official Media Press Release Wire
              </h4>
              <button
                onClick={() => handleCopy(campaign.press, 'press')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold cursor-pointer"
              >
                {copiedKey === 'press' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'press' ? 'Copied' : 'Copy Press Release'}</span>
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
              {campaign.press}
            </div>
          </div>
        )}

        {/* EMAIL */}
        {activePlatform === 'email' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Direct Collector Newsletter Broadcast
              </h4>
              <button
                onClick={() => handleCopy(campaign.email, 'email')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold cursor-pointer"
              >
                {copiedKey === 'email' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'email' ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {campaign.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
