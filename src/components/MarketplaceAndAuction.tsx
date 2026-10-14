import React, { useState, useEffect } from 'react';
import {
  Gavel,
  Tag,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  ExternalLink,
  Flame,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { BuyRequest, GeneratedNFTItem } from '../types/nft';

interface MarketplaceAndAuctionProps {
  items: GeneratedNFTItem[];
}

export const MarketplaceAndAuction: React.FC<MarketplaceAndAuctionProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'auction' | 'buy_requests'>('listings');

  // Auction Room State
  const [currentBidEth, setCurrentBidEth] = useState(0.25);
  const [bidIncrementEth] = useState(0.025);
  const [bids, setBids] = useState<{ bidder: string; amountEth: number; timestamp: string }[]>([
    { bidder: '0x32A...c44B', amountEth: 0.25, timestamp: '12 mins ago' },
    { bidder: '0x91F...890D', amountEth: 0.225, timestamp: '24 mins ago' },
    { bidder: '0x14C...012E', amountEth: 0.20, timestamp: '48 mins ago' },
  ]);

  // Buy Requests State
  const [buyRequests, setBuyRequests] = useState<BuyRequest[]>([]);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [queryInput, setQueryInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  const fetchBuyRequests = () => {
    fetch('/api/buy-requests')
      .then((res) => res.json())
      .then((data) => {
        if (data.requests) setBuyRequests(data.requests);
      })
      .catch((err) => console.error('Failed to load buy requests:', err));
  };

  useEffect(() => {
    fetchBuyRequests();
  }, []);

  const handlePlaceBid = () => {
    const nextBid = Math.round((currentBidEth + bidIncrementEth) * 1000) / 1000;
    setCurrentBidEth(nextBid);
    setBids([
      {
        bidder: '0xYou...Connected',
        amountEth: nextBid,
        timestamp: 'Just now',
      },
      ...bids,
    ]);
  };

  const handleCreateBuyRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput || !maxPriceInput) return;

    try {
      const res = await fetch('/api/buy-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemQuery: queryInput,
          category: 'Digital Collectible',
          targetMaxPriceUsd: parseFloat(maxPriceInput),
          buyerAddress: '0xCurrent...User',
        }),
      });
      const data = await res.json();
      if (data.request) {
        setBuyRequests([data.request, ...buyRequests]);
        setQueryInput('');
        setMaxPriceInput('');
        setShowNewRequestForm(false);
      }
    } catch (err) {
      console.error('Failed to submit buy request:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              MARKETPLACE & LIQUIDITY PIPELINE
            </span>
            <span className="text-xs text-slate-400">Fixed Price, English Auctions & WTB Bounties</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Marketplace Engine & Buy Requests
          </h2>
          <p className="text-xs text-slate-400">
            Publish listings across OpenSea / Blur, conduct live English auctions with anti-sniping protection, and fulfill verified buyer requests.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'listings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Direct Listings
          </button>
          <button
            onClick={() => setActiveTab('auction')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'auction' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            English Auction
          </button>
          <button
            onClick={() => setActiveTab('buy_requests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'buy_requests' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Buy Requests (WTB)
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECT LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col"
              >
                <div className="aspect-square bg-slate-950 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/90 text-white border border-slate-700">
                    {item.edition}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block mb-1">
                      {item.rarityTier} • Rank #{item.rarityRank}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">List Price</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {item.priceEth || 0.08} ETH
                      </span>
                    </div>

                    <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No items generated yet. Return to Studio to create assets.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE AUCTION ROOM */}
      {activeTab === 'auction' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Auction Display */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                  LIVE ENGLISH AUCTION
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ends in: 04h 28m 14s</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                <img
                  src={items[0]?.image || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%230f172a"/></svg>'}
                  alt="Auction Lot"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block mb-1">
                    Lot #001 • Reserve Met
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {items[0]?.name || 'Chronos Singularity #001'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {items[0]?.description || 'Surreal clockwork galaxy encapsulated within a celestial prism. Guaranteed 100% trait uniqueness.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Current Top Bid:</span>
                    <span className="font-mono font-bold text-emerald-400 text-lg">
                      {currentBidEth} ETH
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Minimum Increment:</span>
                    <span>+{bidIncrementEth} ETH</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Reserve Price:</span>
                    <span className="text-slate-200">0.20 ETH (Met)</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceBid}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Gavel className="w-4 h-4" />
                  <span>Place Bid of {(currentBidEth + bidIncrementEth).toFixed(3)} ETH</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Bid History */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Gavel className="w-3.5 h-3.5 text-indigo-400" />
              Verified Bid History
            </h4>

            <div className="space-y-2">
              {bids.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-white block">{b.bidder}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.timestamp}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">
                    {b.amountEth} ETH
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BUY REQUEST MARKETPLACE */}
      {activeTab === 'buy_requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Buyer Intent Marketplace («Want to Buy» Bounties)
              </h3>
              <p className="text-xs text-slate-400">
                Post purchase requests for specific NFTs, collectibles, or trait combinations. The AI scans minted inventory and notifies sellers.
              </p>
            </div>

            <button
              onClick={() => setShowNewRequestForm(!showNewRequestForm)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Buy Request</span>
            </button>
          </div>

          {showNewRequestForm && (
            <form onSubmit={handleCreateBuyRequest} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn">
              <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                Create Verified Buyer Request
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Item Description / Query</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Looking for a Leica M6 Classic under $2,800 or Cyberpunk Lion with Mythic Armor"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Max Budget Price (USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="2800"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs cursor-pointer"
              >
                Publish Request & Match Sellers
              </button>
            </form>
          )}

          <div className="space-y-3">
            {buyRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {req.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Buyer: {req.buyerAddress}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">“{req.itemQuery}”</h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Posted: {new Date(req.datePosted).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Max Offer</span>
                    <span className="text-base font-bold font-mono text-emerald-400">
                      ${req.targetMaxPriceUsd.toLocaleString()} USD
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                      {req.matchedItemsCount} Inventory Matches
                    </span>
                    <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer">
                      View Matches
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
