import { create } from "zustand";
import { ChatMessage, Listing, NegotiationState } from "@/lib/types";

interface NegotiationStore {
  negotiations: Record<string, NegotiationState>;
  startNegotiation: (listing: Listing) => void;
  addMessage: (listingId: string, message: ChatMessage) => void;
  updateOffer: (listingId: string, offer: number) => void;
  updateStatus: (listingId: string, status: NegotiationState["status"]) => void;
}

export const useNegotiationStore = create<NegotiationStore>((set) => ({
  negotiations: {},
  startNegotiation: (listing) =>
    set((state) => ({
      negotiations: {
        ...state.negotiations,
        [listing.id]: {
          listingId: listing.id,
          listing,
          currentOffer: listing.price,
          status: "browsing",
          messages: [],
        },
      },
    })),
  addMessage: (listingId, message) =>
    set((state) => {
      const negotiation = state.negotiations[listingId];
      if (!negotiation) return state;
      return {
        negotiations: {
          ...state.negotiations,
          [listingId]: {
            ...negotiation,
            messages: [...negotiation.messages, message],
          },
        },
      };
    }),
  updateOffer: (listingId, offer) =>
    set((state) => {
      const negotiation = state.negotiations[listingId];
      if (!negotiation) return state;
      return {
        negotiations: {
          ...state.negotiations,
          [listingId]: {
            ...negotiation,
            currentOffer: offer,
          },
        },
      };
    }),
  updateStatus: (listingId, status) =>
    set((state) => {
      const negotiation = state.negotiations[listingId];
      if (!negotiation) return state;
      return {
        negotiations: {
          ...state.negotiations,
          [listingId]: {
            ...negotiation,
            status,
          },
        },
      };
    }),
}));
