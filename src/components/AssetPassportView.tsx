import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Hash,
  Clock,
  ExternalLink,
  Search,
  Upload,
  FileText,
  Info,
  Layers,
} from 'lucide-react';
import type { AssetPassport, ProvenanceRecord, GeneratedNFTItem } from '../types/nft';

interface AssetPassportViewProps {
  initialItem?: GeneratedNFTItem | null;
}

export const AssetPassportView: React.FC<AssetPassportViewProps> = ({ initialItem }) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'authenticator'>('passport');

  // Authenticator Form State
  const [assetName, setAssetName] = useState(initialItem?.name || 'Rolex Submariner 16610 Date 1998');
  const [serialNumber, setSerialNumber] = useState('U842918');
  const [manufacturer, setManufacturer] = useState('Rolex SA, Geneva');
  const [provenanceNotes, setProvenanceNotes] = useState(
    'Purchased from original authorized retailer in Lucerne, Switzerland. Complete box, papers, and punched guarantee certificate present.'
  );
  const [authResult, setAuthResult] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Default Asset Passport
  const passport: AssetPassport = {
    assetId: initialItem ? `pass-${initialItem.id}` : 'pass-genesis-001',
    assetName: initialItem ? initialItem.name : 'Cosmic African Lion Warrior #001',
    creatorAddress: '0x71C...a89F (Verified Creator)',
    creationTimestamp: new Date().toISOString(),
    sha256Digest: initialItem ? initialItem.sha256Hash : 'a6c9f87b89d4212e340a6b1c8e9f2a0b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
    condition: 'MINT',
    physicalAssetLinked: false,
    legalDisclaimer: 'DIGITAL RECORD OF PROVENANCE: This digital asset passport certifies the immutable SHA-256 cryptographic fingerprint of the digital work recorded on-chain.',
    mediaSpecs: {
      format: 'Lossless Vector SVG / JSON Metadata',
      dimensions: '2048 x 2048 Native Vector',
      colorSpace: 'sRGB D65 Standard',
      fileSizeKb: 38,
    },
    history: [
      {
        id: 'ev-1',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        event: 'CREATED',
        verificationBadge: 'REAL',
        details: 'Procedural asset synthesized with deterministic seed and verified unique traits.',
      },
      {
        id: 'ev-2',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        event: 'VERIFIED',
        verificationBadge: 'REAL',
        details: 'Cryptographic SHA-256 fingerprint generated and anchored to asset passport registry.',
      },
      {
        id: 'ev-3',
        timestamp: new Date().toISOString(),
        event: 'MINTED',
        verificationBadge: 'REAL',
        details: 'Smart contract tokenized on Polygon PoS under standard ERC-721 interface.',
      },
    ],
  };

  const handleRunAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetName,
          serialNumber,
          manufacturer,
          provenanceNotes,
          imageProvided: true,
        }),
      });
      const data = await res.json();
      setAuthResult(data.authentication);
    } catch (err) {
      console.error('Authentication check failed:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              PERMANENT ASSET PASSPORT & FORENSICS
            </span>
            <span className="text-xs text-slate-400">Cryptographic Provenance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Digital Asset Passport & AI Authenticator
          </h2>
          <p className="text-xs text-slate-400">
            Immutable custody timeline, SHA-256 digital fingerprinting, and forensic heuristic screening for high-value collectibles.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'passport'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Asset Passport
          </button>
          <button
            onClick={() => setActiveTab('authenticator')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'authenticator'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Collectible Authenticator
          </button>
        </div>
      </div>

      {/* TAB 1: ASSET PASSPORT */}
      {activeTab === 'passport' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Passport Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Permanent Identity
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                VERIFIED
              </span>
            </div>

            {/* QR Code & Passport Seal */}
            <div className="flex items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="text-center space-y-2">
                <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Scan to Inspect On-Chain Passport
                </span>
              </div>
            </div>

            {/* Passport Specifications */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Asset Title:</span>
                <span className="font-bold text-white">{passport.assetName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Condition Grade:</span>
                <span className="font-mono text-emerald-400 font-bold">{passport.condition}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Resolution / Format:</span>
                <span className="font-mono text-slate-300">{passport.mediaSpecs.dimensions}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">File Weight:</span>
                <span className="font-mono text-slate-300">{passport.mediaSpecs.fileSizeKb} KB</span>
              </div>
            </div>

            {/* SHA-256 Digest */}
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Cryptographic SHA-256 Hash Digest:
              </span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-indigo-300 break-all">
                {passport.sha256Digest}
              </div>
            </div>
          </div>

          {/* Right Provenance Timeline */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Verified Provenance & Custody Timeline
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-slate-800">
              {passport.history.map((record, index) => (
                <div key={record.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-slate-900 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{record.event}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {record.verificationBadge}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(record.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {record.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Notice */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-200">Legal Ownership Boundary: </span>
                {passport.legalDisclaimer}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI AUTHENTICATOR */}
      {activeTab === 'authenticator' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">
              AI Forensic Authenticator for Physical Collectibles
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Screen luxury watches, vintage cameras, rare coins, and fine art against serial syntax patterns, international theft databases, and age-related patina indices.
            </p>

            <form onSubmit={handleRunAuthentication} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Asset / Model Description
                  </label>
                  <input
                    type="text"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Serial / Registration Number
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Manufacturer / Origin
                  </label>
                  <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Documented Provenance & Custody Notes
                </label>
                <textarea
                  rows={3}
                  value={provenanceNotes}
                  onChange={(e) => setProvenanceNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Run Forensic Authentication Screening</span>
              </button>
            </form>
          </div>

          {authResult && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Screening Verdict</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-sm font-black px-3 py-1 rounded-lg font-mono ${
                        authResult.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : authResult.status === 'PROBABLY_AUTHENTIC'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : authResult.status === 'NEEDS_EXPERT_REVIEW'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {authResult.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      Confidence: {authResult.confidencePercent}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Risk Score</span>
                  <span className="text-xl font-bold font-mono text-indigo-400">
                    {authResult.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Checks checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Forensic Checklist Results
                </h4>
                {authResult.checks.map((chk: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between text-xs p-3 rounded-xl bg-slate-800/40 border border-slate-800"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">{chk.check}</span>
                      <span className="text-slate-400 text-[11px]">{chk.details}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ml-3 ${
                        chk.passed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {chk.passed ? 'PASSED' : 'FLAGGED'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                {authResult.mandatoryLegalDisclaimer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
