import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function useModelPreloader() {
  useEffect(() => {
    // Since we're using procedural geometry (no GLTF models yet),
    // mark as loaded after a short delay for the initial reveal effect
    const timeout = setTimeout(() => {
      useAppStore.getState().setLoaded(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);
}
