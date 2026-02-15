export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: "new" | "like-new" | "good" | "fair" | "poor";
  images: string[];
  seller: Seller;
  location: string;
  distance?: string;
  createdAt: string;
  tags: string[];
  aiGenerated?: boolean;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  responseTime: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  agentType?: "buyer" | "seller" | "mediator";
}

export interface NegotiationState {
  listingId: string;
  listing: Listing;
  currentOffer: number;
  counterOffer?: number;
  status: "browsing" | "negotiating" | "agreed" | "declined";
  messages: ChatMessage[];
  buyerMax?: number;
  sellerMin?: number;
}

export type SearchFilters = {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  sortBy?: "relevance" | "price-low" | "price-high" | "newest";
};
