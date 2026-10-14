import React, { useState } from 'react';
import {
  Gamepad2,
  Ticket,
  Watch,
  BookOpen,
  QrCode,
  ShieldAlert,
  Download,
  Copy,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const SpecializedStudios: React.FC = () => {
  const [activeStudio, setActiveStudio] = useState<
    'digital_products' | 'physical_assets' | 'ticketing' | 'game_assets'
  >('game_assets');

  // Game Asset State
  const [gameRole, setGameRole] = useState('Cybernetic Berserker');
  const [gameStats, setGameStats] = useState({
    attack: 88,
    defense: 65,
    speed: 74,
    criticalRate: '24%',
    element: 'Plasma Surge',
    rarityTier: 'LEGENDARY',
  });

  // Ticket State
  const [ticketEvent, setTicketEvent] = useState('Web3 Creator Summit 2026');
  const [ticketTier, setTicketTier] = useState('VIP All-Access Pass');
  const [ticketSeat, setTicketSeat] = useState('Zone A - Row 04 - Seat 12');
  const [ticketHash] = useState('0x9a8f7c6e5d4b3a210987654321fedcba');

  const downloadUnityJson = () => {
    const unitySchema = {
      asset_type: 'GameCharacterPrefab',
      engine_target: 'Unity / Unreal Engine 5',
      name: gameRole,
      stats: gameStats,
      mesh_lod: 'LOD0_HighFidelity',
      shader_profile: 'PBR_Metalic_Roughness',
      socket_attachments: ['Hand_R_Weapon', 'Hand_L_Shield', 'Head_Helmet', 'Back_EmissiveWings'],
      license: 'Web3 Gaming Interoperable Asset License (CC-BY-NC)',
    };

    const blob = new Blob([JSON.stringify(unitySchema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${gameRole.replace(/\s+/g, '_')}_unity_schema.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              SPECIALIZED ASSET STUDIOS
            </span>
            <span className="text-xs text-slate-400">Beyond Speculative JPEGs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Specialized Digital & Physical Studios
          </h2>
          <p className="text-xs text-slate-400">
            Dedicated generators for Game RPG Assets, Event Ticketing with anti-counterfeit QR, Luxury Physical Provenance, and Digital Products.
          </p>
        </div>
      </div>

      {/* Studio Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'game_assets', label: 'Game Assets Engine', icon: Gamepad2, desc: 'RPG stats & 3D metadata' },
          { id: 'ticketing', label: 'Ticketing & Passes', icon: Ticket, desc: 'Anti-counterfeit QR' },
          { id: 'physical_assets', label: 'Physical Provenance', icon: Watch, desc: 'Watches, cars & art' },
          { id: 'digital_products', label: 'Digital Products', icon: BookOpen, desc: 'Courses & licenses' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveStudio(item.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeStudio === item.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-5 h-5 mb-2 text-indigo-400" />
              <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
              <div className="text-[10px] text-slate-400">{item.desc}</div>
            </button>
          );
        })}
      </div>

      {/* STUDIO 1: GAME ASSETS */}
      {activeStudio === 'game_assets' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                Game Asset & RPG Character Engine
              </h3>
              <p className="text-xs text-slate-400">
                Exports standardized attribute payloads directly compatible with Unreal Engine 5, Unity, and Godot game inventories.
              </p>
            </div>
            <button
              onClick={downloadUnityJson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Unity / Unreal JSON</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">
                  TIER: {gameStats.rarityTier}
                </span>
                <span className="text-xs font-mono text-slate-400">Element: {gameStats.element}</span>
              </div>

              <div className="aspect-video bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-6 text-center">
                <div>
                  <Gamepad2 className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                  <h4 className="text-base font-black text-white">{gameRole}</h4>
                  <span className="text-xs font-mono text-slate-400">Prefab Rig v2.4 Attached</span>
                </div>
              </div>

              {/* Stat Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">ATTACK POWER</span>
                    <span className="text-rose-400 font-bold">{gameStats.attack}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${gameStats.attack}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">DEFENSIVE ARMOR</span>
                    <span className="text-blue-400 font-bold">{gameStats.defense}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${gameStats.defense}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">AGILITY & SPEED</span>
                    <span className="text-emerald-400 font-bold">{gameStats.speed}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${gameStats.speed}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customizer */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Character Archetype</label>
                <input
                  type="text"
                  value={gameRole}
                  onChange={(e) => setGameRole(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Attack (0-100)</label>
                  <input
                    type="number"
                    value={gameStats.attack}
                    onChange={(e) => setGameStats({ ...gameStats, attack: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Defense (0-100)</label>
                  <input
                    type="number"
                    value={gameStats.defense}
                    onChange={(e) => setGameStats({ ...gameStats, defense: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Elemental Affinity</label>
                <input
                  type="text"
                  value={gameStats.element}
                  onChange={(e) => setGameStats({ ...gameStats, element: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDIO 2: TICKETING */}
      {activeStudio === 'ticketing' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">
              Anti-Counterfeit Event Pass & Membership Card Studio
            </h3>
            <p className="text-xs text-slate-400">
              Generates cryptographic QR admission tokens with dynamic rolling validation to eradicate scalper counterfeiting.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              SECURE DYNAMIC PASS
            </div>

            <h4 className="text-xl font-black text-white">{ticketEvent}</h4>
            <span className="text-xs text-indigo-400 font-bold block">{ticketTier}</span>

            <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-2xl flex items-center justify-center shadow-lg my-2">
              <QrCode className="w-full h-full text-slate-900" />
            </div>

            <div className="text-xs text-slate-300 font-mono space-y-1">
              <div>Seat Allocation: <span className="font-bold text-white">{ticketSeat}</span></div>
              <div className="text-[10px] text-slate-500 truncate max-w-xs mx-auto">
                Hash: {ticketHash}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cryptographically Sealed by Factory Gatekeeper</span>
            </div>
          </div>
        </div>
      )}

      {/* STUDIO 3: PHYSICAL ASSETS */}
      {activeStudio === 'physical_assets' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">
              Physical-Asset Tokenization & Dual-Ownership Registry
            </h3>
            <p className="text-xs text-slate-400">
              Create immutable cryptographic passports for watches, classic vehicles, fine art, and rare equipment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-1">
                Mandatory Dual-Structure Legal Disclaimer:
              </span>
              Tokenizing a physical object creates a cryptographic digital record of custody and condition. It does not automatically transfer legal statutory physical property title unless coupled with an authenticated escrow deposit agreement recognized in the relevant jurisdiction.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Supported Category</span>
              <span className="font-bold text-white block">Luxury Horology & Jewelry</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Serial syntax validation & service history</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Supported Category</span>
              <span className="font-bold text-white block">Classic Cars & Machinery</span>
              <span className="text-[11px] text-slate-400 mt-1 block">VIN verification & odometer provenance</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Supported Category</span>
              <span className="font-bold text-white block">Fine Art & Historical Relics</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Museum registrar format & gallery records</span>
            </div>
          </div>
        </div>
      )}

      {/* STUDIO 4: DIGITAL PRODUCTS */}
      {activeStudio === 'digital_products' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">
              Digital Product Factory & Token-Gated Licensing
            </h3>
            <p className="text-xs text-slate-400">
              E-books, developer templates, video masterclasses, and software licenses. Token gating is one optional ownership mechanism rather than the only product format.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white">Software License Key NFT</h4>
              <p className="text-slate-400 text-[11px]">
                Validates developer seat activation via signature check without requiring credit card recurring auth.
              </p>
              <div className="p-2 rounded bg-slate-950 font-mono text-indigo-400 text-[11px]">
                LICENSE_KEY: UNV-NFT-2026-X89F-ACTIVE
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white">Token-Gated Course Masterclass</h4>
              <p className="text-slate-400 text-[11px]">
                Decrypts streaming video modules and lossless code downloads upon verified wallet token holding.
              </p>
              <div className="p-2 rounded bg-slate-950 font-mono text-emerald-400 text-[11px]">
                ENCRYPTION_CIPHER: AES-GCM-256 (Gated)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
