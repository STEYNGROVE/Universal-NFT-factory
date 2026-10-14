/**
 * Universal AI NFT Factory - Core Type Definitions
 */

export type NFTType =
  | '1_OF_1'
  | 'LIMITED_EDITION'
  | 'GENERATIVE_COLLECTION'
  | 'MEMBERSHIP_NFT'
  | 'TICKET_NFT'
  | 'DIGITAL_CERTIFICATE'
  | 'GAME_ASSET'
  | 'DYNAMIC_NFT'
  | 'PHYSICAL_ASSET_LINKED';

export type VisualStyle =
  | 'Photorealistic'
  | '3D'
  | 'Anime'
  | 'Comic'
  | 'Pixel Art'
  | 'Luxury'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Historical'
  | 'Abstract'
  | 'Surreal'
  | 'Minimalist'
  | 'Cartoon'
  | 'Cinematic'
  | 'Product Render';

export type RarityTier =
  | 'COMMON'
  | 'UNCOMMON'
  | 'RARE'
  | 'EPIC'
  | 'LEGENDARY'
  | 'MYTHIC';

export type SupportedChainId =
  | 'ethereum'
  | 'polygon'
  | 'arbitrum'
  | 'base'
  | 'solana'
  | 'optimism'
  | 'avalanche';

export type StateBadge = 'REAL' | 'SIMULATED' | 'DEMO' | 'ESTIMATED' | 'UNAVAILABLE';

export interface Trait {
  category: string;
  name: string;
  rarity: RarityTier;
  frequencyPercent: number;
  value: string;
  displayType?: string;
}

export interface TraitCategory {
  id: string;
  name: string;
  options: {
    name: string;
    rarity: RarityTier;
    weight: number;
    visualLayerUrl?: string;
  }[];
}

export interface NFTSpecification {
  id: string;
  prompt: string;
  title: string;
  nftType: NFTType;
  subject: string;
  theme: string;
  visualStyle: VisualStyle;
  materials: string;
  environment: string;
  supply: number;
  editionSize: number;
  royaltyFeeBasisPoints: number; // e.g. 500 = 5%
  recommendedChain: SupportedChainId;
  tokenStandard: 'ERC-721' | 'ERC-1155' | 'SPL-Token' | 'Metaplex';
  targetAudience: string;
  lore: string;
  utilityPerks: string[];
  rarityTiers: {
    tier: RarityTier;
    percentage: number;
  }[];
  categories: TraitCategory[];
  pricingEstimate: {
    conservativeEth: number;
    fairEth: number;
    optimisticEth: number;
    estimatedGasUsd: number;
    marketplaceFeePercent: number;
  };
  shouldBeNftScore: {
    score: number; // 1-100
    recommendation: 'STRONG_FIT' | 'MODERATE_FIT' | 'BETTER_AS_WEB2_OR_PHYSICAL';
    reasoning: string;
    pros: string[];
    cons: string[];
    legalNotice: string;
  };
  previewImage?: string;
  artworkGallery?: string[];
}

export interface GeneratedNFTItem {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string; // Data URL or SVG string or decentralized URI
  sha256Hash: string;
  edition: string;
  rarityTier: RarityTier;
  rarityScore: number;
  rarityRank: number;
  attributes: {
    trait_type: string;
    value: string;
    rarity: RarityTier;
    rarityScoreContribution: number;
  }[];
  status: 'DRAFT' | 'READY_TO_MINT' | 'MINTED' | 'LISTED' | 'SOLD';
  chain: SupportedChainId;
  contractAddress?: string;
  txHash?: string;
  mintedTimestamp?: string;
  mintMode: StateBadge;
  priceEth?: number;
  ownerAddress?: string;
  provenance: ProvenanceRecord[];
}

export interface ProvenanceRecord {
  id: string;
  timestamp: string;
  event: 'CREATED' | 'VERIFIED' | 'MINTED' | 'TRANSFERRED' | 'LISTED' | 'SOLD';
  from?: string;
  to?: string;
  priceEth?: number;
  txHash?: string;
  verificationBadge: StateBadge;
  details: string;
}

export interface AssetPassport {
  assetId: string;
  assetName: string;
  creatorAddress: string;
  creationTimestamp: string;
  sha256Digest: string;
  condition: 'MINT' | 'NEAR_MINT' | 'EXCELLENT' | 'VERY_GOOD' | 'PHYSICAL_ARCHIVAL';
  physicalAssetLinked: boolean;
  legalDisclaimer: string;
  history: ProvenanceRecord[];
  mediaSpecs: {
    format: string;
    dimensions: string;
    colorSpace: string;
    fileSizeKb: number;
  };
  authenticationStatus?: 'VERIFIED' | 'PROBABLY_AUTHENTIC' | 'NEEDS_EXPERT_REVIEW' | 'INSUFFICIENT_EVIDENCE' | 'POTENTIAL_RISK';
  authenticationNotes?: string;
}

export interface ChainAdapter {
  id: SupportedChainId;
  name: string;
  nativeCurrency: string;
  chainId: number;
  standards: string[];
  status: 'ACTIVE' | 'TESTNET_ONLY' | 'MAINTENANCE';
  estimatedGasGwei: number;
  estimatedFeeUsd: number;
  blockExplorer: string;
  badge: StateBadge;
}

export interface ResellerCalculation {
  purchasePriceEth: number;
  purchasePriceUsd: number;
  maxBuyingPriceEth: number;
  expectedResaleLowEth: number;
  expectedResaleMidEth: number;
  expectedResaleHighEth: number;
  marketplaceFeeUsd: number;
  creatorRoyaltyUsd: number;
  gasCostUsd: number;
  shippingOrRefurbishmentUsd: number;
  breakEvenPriceEth: number;
  projectedNetMarginPercent: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  arbitrageRating: string;
  scenarios: {
    condition: string;
    resaleEth: number;
    netProfitUsd: number;
    roiPercent: number;
  }[];
}

export interface BuyRequest {
  id: string;
  itemQuery: string;
  category: string;
  targetMaxPriceUsd: number;
  buyerAddress: string;
  datePosted: string;
  status: 'OPEN' | 'MATCHED' | 'FULFILLED';
  matchedItemsCount: number;
}
