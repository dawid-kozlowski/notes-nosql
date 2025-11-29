import { create } from "zustand";

interface CardType {
  editingCard: string | null;
  setEditingCard: (cardKey: string | null) => void;
}

export const useCardStore = create<CardType>((set) => ({
  editingCard: null,
  setEditingCard: (cardKey) => set({ editingCard: cardKey }),
}));
