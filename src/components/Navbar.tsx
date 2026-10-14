import React from 'react';
import { Sparkles, Shield, Cpu, Layers, DollarSign, Megaphone, Terminal, BarChart3, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import type { SupportedChainId } from '../types/nft';

export type ActiveTab =
  | 'studio'
  | 'collection'
  | 'anything_nft'
  | 'passport_auth'
  | 'valuation_reseller'
  | 'creator_agent'
  | 'marketplace_auction'
  | 'specialized_studios'
  | 'trends'
  | 'api_docs'
  | 'dashboard';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  walletConnected: boolean;
  walletAddress: string;
  walletBalanceEth: number;
  selectedChain: SupportedChainId;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  walletConnected,
  walletAddress,
  walletBalanceEth,
  selectedChain,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070b13]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  UNIVERSAL AI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 tracking-wider">
                  NFT FACTORY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Plain-Language to Blockchain-Ready Digital Assets</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Studio
            </button>

            <button
              onClick={() => setActiveTab('collection')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'collection'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Collections & Rarity
            </button>

            <button
              onClick={() => setActiveTab('anything_nft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'anything_nft'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Anything → NFT
            </button>

            <button
              onClick={() => setActiveTab('passport_auth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'passport_auth'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Passport & Auth
            </button>

            <button
              onClick={() => setActiveTab('valuation_reseller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'valuation_reseller'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Valuation & Resell
            </button>

            <button
              onClick={() => setActiveTab('creator_agent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'creator_agent'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              Marketing Agent
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('api_docs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'api_docs'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              API
            </button>
          </nav>

          {/* Right Controls: Wallet & Chain Badge */}
          <div className="flex items-center gap-3">
            {/* Active Network Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-slate-300 uppercase text-[11px] font-semibold">{selectedChain}</span>
            </div>

            {/* Wallet Connect */}
            {walletConnected ? (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-slate-400">Balance</span>
                  <span className="text-xs font-mono font-bold text-white">{walletBalanceEth.toFixed(3)} ETH</span>
                </div>
                <div className="h-6 w-px bg-slate-700"></div>
                <button
                  onClick={onDisconnectWallet}
                  title="Click to disconnect"
                  className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/50">
          {[
            { id: 'studio', label: 'Studio', icon: Sparkles },
            { id: 'collection', label: 'Collection', icon: Layers },
            { id: 'anything_nft', label: 'Anything→NFT', icon: Cpu },
            { id: 'passport_auth', label: 'Passport', icon: Shield },
            { id: 'valuation_reseller', label: 'Valuation', icon: DollarSign },
            { id: 'creator_agent', label: 'Marketing', icon: Megaphone },
            { id: 'marketplace_auction', label: 'Market', icon: Layers },
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'api_docs', label: 'API', icon: Terminal },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
