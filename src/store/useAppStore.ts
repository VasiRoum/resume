import { create } from "zustand";

type PerformanceTier = "high" | "medium" | "low";

interface AppState {
  activeObject: string | null;
  isTransitioning: boolean;
  isLoaded: boolean;
  performanceTier: PerformanceTier;
  setActiveObject: (key: string | null) => void;
  setTransitioning: (v: boolean) => void;
  setLoaded: (v: boolean) => void;
  setPerformanceTier: (tier: PerformanceTier) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeObject: null,
  isTransitioning: false,
  isLoaded: false,
  performanceTier: "high",
  setActiveObject: (key) => set({ activeObject: key, isTransitioning: true }),
  setTransitioning: (v) => set({ isTransitioning: v }),
  setLoaded: (v) => set({ isLoaded: v }),
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  reset: () => set({ activeObject: null, isTransitioning: true }),
}));
