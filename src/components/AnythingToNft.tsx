import React, { useState } from 'react';
import {
  Cpu,
  Upload,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Box,
  Watch,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Shield,
  HelpCircle,
} from 'lucide-react';
import type { NFTSpecification } from '../types/nft';

interface AnythingToNftProps {
  onPipelineComplete: (spec: NFTSpecification) => void;
}

type InputMediaType = 'IMAGE' | 'AUDIO' | 'VIDEO' | '3D_FILE' | 'DOCUMENT' | 'PHYSICAL_ASSET';

export const AnythingToNft: React.FC<AnythingToNftProps> = ({ onPipelineComplete }) => {
  const [selectedMediaType, setSelectedMediaType] = useState<InputMediaType>('IMAGE');
  const [assetTitle, setAssetTitle] = useState('Antique 1954 Leica M3 Rangefinder');
  const [assetDescription, setAssetDescription] = useState(
    'Original double-stroke mechanical camera with matching 50mm f/2 Summicron lens. Full provenance documentation, original owner purchase receipt, and CLA service certificate.'
  );
  const [pipelineStage, setPipelineStage] = useState<number>(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [utilityEvaluation, setUtilityEvaluation] = useState<any>(null);

  const STAGES = [
    'IDENTIFY & PARSE',
    'STRUCTURE SPEC',
    'VALUE & ANALYZE',
    'VERIFY INTEGRITY',
    'METADATA SYNTHESIS',
    'TOKENIZE PREPARATION',
  ];

  const handleRunPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setPipelineStage(0);

    for (let s = 1; s <= 5; s++) {
      await new Promise((r) => setTimeout(r, 450));
      setPipelineStage(s);
    }

    try {
      const res = await fetch('/api/describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Tokenize this ${selectedMediaType}: ${assetTitle}. Description: ${assetDescription}`,
        }),
      });
      const data = await res.json();
      setUtilityEvaluation(data.spec.shouldBeNftScore);
      onPipelineComplete(data.spec);
    } catch (err) {
      console.error('Pipeline failed:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            UNIVERSAL INPUT PIPELINE
          </span>
          <span className="text-xs text-slate-400">Media Ingestion Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          “Anything → NFT” Universal Asset Pipeline
        </h2>
        <p className="text-xs text-slate-400">
          Transform any physical item, photo, audio track, 3D model, or document into a blockchain-standardized asset with automated utility vetting.
        </p>
      </div>

      {/* Media Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { id: 'IMAGE', label: 'Photo / Image', icon: ImageIcon },
          { id: 'AUDIO', label: 'Audio / Music', icon: Music },
          { id: 'VIDEO', label: 'Video / Cinema', icon: Video },
          { id: '3D_FILE', label: '3D Model / Mesh', icon: Box },
          { id: 'DOCUMENT', label: 'Document / Deed', icon: FileText },
          { id: 'PHYSICAL_ASSET', label: 'Physical Asset', icon: Watch },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedMediaType(item.id as InputMediaType)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedMediaType === item.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-1.5 text-indigo-400" />
              <span className="text-xs font-bold block">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Pipeline Input & Execution Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleRunPipeline} className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Ingest Source Asset Details
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Asset Name / Title</label>
            <input
              type="text"
              required
              value={assetTitle}
              onChange={(e) => setAssetTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Provenance, Specifications & Description
            </label>
            <textarea
              rows={4}
              required
              value={assetDescription}
              onChange={(e) => setAssetDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
          </div>

          {/* Upload Dropzone Preview */}
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-6 text-center bg-slate-950/40 transition-colors">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-white block">
              Drag & Drop file or click to browse
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Supports PNG, JPG, GLTF, OBJ, MP3, WAV, MP4, PDF up to 100MB
            </span>
          </div>

          <button
            type="submit"
            disabled={analyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Executing Pipeline: {STAGES[pipelineStage]}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Execute Universal Ingestion Pipeline</span>
              </>
            )}
          </button>
        </form>

        {/* Pipeline Rail Progression */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pipeline Architecture
          </h4>

          <div className="space-y-3">
            {STAGES.map((stg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  pipelineStage >= idx && analyzing
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : pipelineStage > idx
                    ? 'bg-slate-800/40 border-slate-800 text-slate-300'
                    : 'bg-slate-900/40 border-slate-900 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] opacity-60">0{idx + 1}.</span>
                  <span className="font-semibold">{stg}</span>
                </div>
                {pipelineStage > idx && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
            ))}
          </div>

          {utilityEvaluation && (
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/30 space-y-2 mt-4 text-xs animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Utility Fit Score:</span>
                <span className="font-mono font-bold text-indigo-400">{utilityEvaluation.score}/100</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {utilityEvaluation.reasoning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
