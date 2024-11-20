import { create } from "zustand";

export const useNavigationHistoryStore = create<{
  history: string[];
  addToHistory: (pathname: string) => void;
}>((set) => ({
  history: [],
  addToHistory: (pathname: string) =>
    set((state) => ({ history: [...state.history, pathname] })),
}));
