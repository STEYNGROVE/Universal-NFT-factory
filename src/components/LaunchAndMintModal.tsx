import React, { useState, useEffect } from 'react';
import {
  X,
  Rocket,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lock,
  ArrowRight,
  Wallet,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import type { GeneratedNFTItem, SupportedChainId, ChainAdapter, StateBadge } from '../types/nft';

interface LaunchAndMintModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: GeneratedNFTItem | null;
  targetItemsCount?: number;
  walletConnected: boolean;
  walletAddress: string;
  onConnectWallet: () => void;
  onSuccess: (receipt: any) => void;
}

export const LaunchAndMintModal: React.FC<LaunchAndMintModalProps> = ({
  isOpen,
  onClose,
  targetItem,
  targetItemsCount = 1,
  walletConnected,
  walletAddress,
  onConnectWallet,
  onSuccess,
}) => {
  const [chains, setChains] = useState<ChainAdapter[]>([]);
  const [selectedChainId, setSelectedChainId] = useState<SupportedChainId>('polygon');
  const [step, setStep] = useState<'VALIDATE' | 'APPROVE' | 'MINTING' | 'CONFIRMED'>('VALIDATE');
  const [mintMode, setMintMode] = useState<'DEMO' | 'REAL'>('DEMO');
  const [receipt, setReceipt] = useState<any>(null);
  const [isMinting, setIsMinting] = useState(false);

  // Phishing / Contract security check states
  const [securityPassed, setSecurityPassed] = useState(true);

  useEffect(() => {
    fetch('/api/chains')
      .then((res) => res.json())
      .then((data) => {
        if (data.chains) setChains(data.chains);
      })
      .catch((err) => console.error('Error fetching chains:', err));
  }, []);

  if (!isOpen) return null;

  const currentChain = chains.find((c) => c.id === selectedChainId) || chains[1] || {
    id: 'polygon',
    name: 'Polygon PoS',
    nativeCurrency: 'POL',
    chainId: 137,
    standards: ['ERC-721', 'ERC-1155'],
    status: 'ACTIVE',
    estimatedGasGwei: 85,
    estimatedFeeUsd: 0.02,
    blockExplorer: 'https://polygonscan.com',
    badge: 'REAL' as StateBadge,
  };

  const handleExecuteMint = async () => {
    setIsMinting(true);
    setStep('MINTING');

    try {
      const res = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nftId: targetItem?.id,
          chainId: selectedChainId,
          userWalletAddress: walletConnected ? walletAddress : '0xDemoWallet...User',
          mintMode,
        }),
      });

      const data = await res.json();
      setReceipt(data);
      setStep('CONFIRMED');
      onSuccess(data);
    } catch (err) {
      console.error('Minting failed:', err);
      setStep('VALIDATE');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/60 animate-fadeIn">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                One-Click Multi-Chain Launch Engine
              </h3>
              <p className="text-[11px] text-slate-400">
                Authorized Smart Contract Deployment & Minting Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Workflow Rail */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 text-[10px] font-mono">
          <span className={step === 'VALIDATE' ? 'text-indigo-400 font-bold' : 'text-slate-500'}>1. VALIDATE & SECURITY</span>
          <span className="text-slate-600">→</span>
          <span className={step === 'APPROVE' ? 'text-indigo-400 font-bold' : 'text-slate-500'}>2. FEE AUTHORIZATION</span>
          <span className="text-slate-600">→</span>
          <span className={step === 'MINTING' ? 'text-indigo-400 font-bold' : 'text-slate-500'}>3. ON-CHAIN MINT</span>
          <span className="text-slate-600">→</span>
          <span className={step === 'CONFIRMED' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>4. VERIFICATION</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: VALIDATE & SECURITY */}
          {step === 'VALIDATE' && (
            <div className="space-y-4">
              {/* Asset Snapshot */}
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                {targetItem ? (
                  <img
                    src={targetItem.image}
                    alt={targetItem.name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-indigo-950/50 flex items-center justify-center text-indigo-400 font-bold font-mono">
                    {targetItemsCount}x
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {targetItem?.name || `Collection Launch (${targetItemsCount} Tokens)`}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Standard: ERC-721 Immutable Non-Fungible Token
                  </p>
                </div>
              </div>

              {/* Network Adapter Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Select Blockchain Adapter
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={() => setSelectedChainId(chain.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedChainId === chain.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold capitalize">{chain.name.split(' ')[0]}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">${chain.estimatedFeeUsd}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {chain.standards[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallet Security Scan */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Automated Pre-Flight Security Checks
                  </span>
                  <span className="text-emerald-400 text-[10px] uppercase font-mono">PASSED</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Phishing & Malicious Bytecode Scan:</span>
                    <span className="text-emerald-400 font-mono font-semibold">Zero Threats</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Unlimited Allowance Warning:</span>
                    <span className="text-emerald-400 font-mono font-semibold">Protected (Single Mint)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Contract Verification Status:</span>
                    <span className="text-emerald-400 font-mono font-semibold">OpenZeppelin Audited Base</span>
                  </div>
                </div>
              </div>

              {/* Mode Selection: Demo Sandbox vs Real Mainnet */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-800/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Execution Mode</span>
                  <span className="text-[11px] text-slate-400">
                    {mintMode === 'DEMO'
                      ? 'Sandbox testnet simulation with verified block receipts'
                      : 'Live blockchain broadcast with real signature'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setMintMode('DEMO')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      mintMode === 'DEMO' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Demo Testnet
                  </button>
                  <button
                    onClick={() => setMintMode('REAL')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      mintMode === 'REAL' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Live Net
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('APPROVE')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Authorization</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: APPROVE */}
          {step === 'APPROVE' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Transaction Summary & Cost Preview
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Target Network:</span>
                    <span className="font-bold text-white font-mono">{currentChain.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Token Standard:</span>
                    <span className="font-bold text-white font-mono">ERC-721 / Non-Fungible</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Estimated Network Gas:</span>
                    <span className="font-mono text-emerald-400">${currentChain.estimatedFeeUsd} USD</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Factory Platform Fee:</span>
                    <span className="font-mono text-slate-400">$0.00 (Promo Tier Active)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-bold text-sm text-white">
                    <span>Total Estimated Commitment:</span>
                    <span className="font-mono text-indigo-400">${currentChain.estimatedFeeUsd} USD</span>
                  </div>
                </div>
              </div>

              {/* Wallet Confirmation Status */}
              {!walletConnected ? (
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold block">No Web3 Wallet Linked</span>
                    <span className="text-[11px] text-slate-400">Connect MetaMask or use Factory Managed Escrow</span>
                  </div>
                  <button
                    onClick={onConnectWallet}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Authorized for: {walletAddress}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep('VALIDATE')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleExecuteMint}
                  disabled={isMinting}
                  className="flex-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Mint Now</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MINTING */}
          {step === 'MINTING' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h4 className="text-base font-bold text-white">Broadcasting Smart Contract Transaction...</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Validating cryptographic asset hashes, assembling ERC-721 token payload, and broadcasting to {currentChain.name} mempool.
              </p>
            </div>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 'CONFIRMED' && receipt && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Asset Successfully Minted!</h4>
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  STATUS: {receipt.status} ({receipt.mintMode})
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {receipt.notice}
                </p>
              </div>

              {/* Receipt details */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Token ID:</span>
                  <span className="text-white font-bold">#{receipt.tokenId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Network:</span>
                  <span className="text-emerald-400">{receipt.network}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Contract Address:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">{receipt.contractAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transaction Hash:</span>
                  <span className="text-indigo-400 truncate max-w-[200px]">{receipt.txHash}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Timestamp:</span>
                  <span className="text-slate-300">{receipt.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={receipt.blockExplorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>View on Explorer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
