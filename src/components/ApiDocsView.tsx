import React, { useState } from 'react';
import {
  Terminal,
  Code,
  Copy,
  CheckCircle2,
  Play,
  Key,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ApiEndpoint {
  method: 'GET' | 'POST';
  path: string;
  title: string;
  description: string;
  sampleRequest?: any;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/describe',
    title: 'Natural Language to NFT Spec',
    description: 'Converts plain-language intent into a fully structured, multi-chain NFT specification with rarity distribution.',
    sampleRequest: {
      prompt: 'Create a 1,000-piece cyberpunk animal warrior collection with neon armor.',
    },
  },
  {
    method: 'POST',
    path: '/api/generate-collection',
    title: 'Combinatorial Rarity Engine',
    description: 'Generates deterministic combinations, verifies 100% trait uniqueness, and computes statistical rarity scores.',
    sampleRequest: {
      count: 10,
      spec: {
        title: 'Cyberpunk Warriors',
        subject: 'Lion Warrior',
        theme: 'Neo-Futuristic',
        categories: [
          {
            name: 'Armor',
            options: [
              { name: 'Carbon Fiber', rarity: 'COMMON', weight: 60 },
              { name: 'Sunfire Gold', rarity: 'LEGENDARY', weight: 4 },
            ],
          },
        ],
      },
    },
  },
  {
    method: 'POST',
    path: '/api/valuation',
    title: 'AI Valuation Intelligence',
    description: 'Calculates conservative, fair, and optimistic pricing along with gas deductions and break-even thresholds.',
    sampleRequest: {
      prompt: 'Cyberpunk African Warrior #001',
      chain: 'polygon',
    },
  },
  {
    method: 'POST',
    path: '/api/reseller',
    title: 'Reseller Arbitrage Calculator',
    description: 'Computes maximum safe acquisition ceiling, fee deductions, and bear/base/bull margin profiles.',
    sampleRequest: {
      purchasePriceEth: 0.05,
      estimatedResaleEth: 0.12,
      chain: 'ethereum',
    },
  },
  {
    method: 'POST',
    path: '/api/authenticate',
    title: 'Forensic Authenticator',
    description: 'Screens physical collectible serial numbers and provenance notes against forensic syntax indices.',
    sampleRequest: {
      assetName: 'Vintage Leica M6 Camera',
      serialNumber: '1984201',
      manufacturer: 'Leica Camera AG',
      provenanceNotes: 'Purchased from original estate sale with papers.',
    },
  },
  {
    method: 'POST',
    path: '/api/passport',
    title: 'Asset Passport Issuer',
    description: 'Issues permanent cryptographic provenance passport with SHA-256 asset hash checksum.',
    sampleRequest: {
      assetName: 'Cosmic Lion #001',
      creatorAddress: '0x71C...a89F',
      physicalAssetLinked: false,
    },
  },
  {
    method: 'POST',
    path: '/api/mint',
    title: 'Multi-Chain Mint Broadcaster',
    description: 'Deploys or mints token to specified blockchain adapter (Polygon, Arbitrum, Base, Ethereum, Solana).',
    sampleRequest: {
      chainId: 'polygon',
      mintMode: 'DEMO',
      userWalletAddress: '0x71C...a89F',
    },
  },
];

export const ApiDocsView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[0]);
  const [activeCodeLang, setActiveCodeLang] = useState<'curl' | 'js' | 'python'>('curl');
  const [apiKey] = useState('unv_live_9a8f7c6e5d4b3a210987654321');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTestCall = async () => {
    setTestLoading(true);
    setTestResponse(null);

    try {
      const res = await fetch(selectedEndpoint.path, {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: selectedEndpoint.method === 'POST' ? JSON.stringify(selectedEndpoint.sampleRequest) : undefined,
      });

      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setTestLoading(false);
    }
  };

  const getCurlCode = () => {
    if (selectedEndpoint.method === 'GET') {
      return `curl -X GET "https://universal-nft-factory.app${selectedEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKey}"`;
    }
    return `curl -X POST "https://universal-nft-factory.app${selectedEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(selectedEndpoint.sampleRequest, null, 2)}'`;
  };

  const getJsCode = () => {
    return `const response = await fetch('https://universal-nft-factory.app${selectedEndpoint.path}', {
  method: '${selectedEndpoint.method}',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  ${selectedEndpoint.method === 'POST' ? `body: JSON.stringify(${JSON.stringify(selectedEndpoint.sampleRequest, null, 2)})` : ''}
});
const data = await response.json();
console.log(data);`;
  };

  const getPythonCode = () => {
    return `import requests

url = "https://universal-nft-factory.app${selectedEndpoint.path}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
${selectedEndpoint.method === 'POST' ? `payload = ${JSON.stringify(selectedEndpoint.sampleRequest, null, 4)}
response = requests.post(url, json=payload, headers=headers)` : `response = requests.get(url, headers=headers)`}

print(response.json())`;
  };

  const codeSnippet = activeCodeLang === 'curl' ? getCurlCode() : activeCodeLang === 'js' ? getJsCode() : getPythonCode();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              DEVELOPER PLATFORM & SDK
            </span>
            <span className="text-xs text-slate-400">Enterprise Headless Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Modular REST API & SDK Playground
          </h2>
          <p className="text-xs text-slate-400">
            Integrate the AI NFT Factory into your marketplace, game engine, or e-commerce storefront with our low-latency JSON endpoints.
          </p>
        </div>

        {/* API Key Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <Key className="w-3.5 h-3.5 text-indigo-400" />
          <span>API Key: {apiKey.substring(0, 12)}...</span>
        </div>
      </div>

      {/* Main Layout: Endpoint List + Detail Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Endpoints Menu */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Available Endpoints
          </h3>
          {ENDPOINTS.map((ep) => (
            <button
              key={ep.path}
              onClick={() => {
                setSelectedEndpoint(ep);
                setTestResponse(null);
              }}
              className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                selectedEndpoint.path === ep.path
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                    ep.method === 'POST' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-xs font-bold text-white">{ep.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block truncate">{ep.path}</span>
            </button>
          ))}
        </div>

        {/* Right 2 Columns: Tester & Code Snippets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{selectedEndpoint.path}</span>
                </div>
                <p className="text-xs text-slate-400">{selectedEndpoint.description}</p>
              </div>

              <button
                onClick={handleTestCall}
                disabled={testLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                {testLoading ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>Test Live Request</span>
              </button>
            </div>

            {/* Language Switcher & Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {(['curl', 'js', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeLang(lang)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all ${
                        activeCodeLang === lang
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre">
                {codeSnippet}
              </div>
            </div>

            {/* Test Response Viewer */}
            {testResponse && (
              <div className="space-y-2 pt-2 border-t border-slate-800 animate-fadeIn">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  Live Response (200 OK)
                </span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 max-h-64 overflow-y-auto whitespace-pre">
                  {testResponse}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
