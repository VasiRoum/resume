import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { useAppStore } from "@/store/useAppStore";
import { sceneObjects } from "@/data/scene-config";
import { useMemo } from "react";

export default function PostProcessing() {
  const activeObject = useAppStore((s) => s.activeObject);
  const performanceTier = useAppStore((s) => s.performanceTier);

  const focusDistance = useMemo(() => {
    if (!activeObject) return 0.02;
    const obj = sceneObjects[activeObject];
    if (!obj) return 0.02;
    const [cx, cy, cz] = obj.cameraPosition;
    const [tx, ty, tz] = obj.cameraTarget;
    return Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2 + (cz - tz) ** 2) * 0.01;
  }, [activeObject]);

  // Low tier: no post-processing
  if (performanceTier === "low") return null;

  // Medium tier: vignette only
  if (performanceTier !== "high") {
    return (
      <EffectComposer>
        <Vignette offset={0.3} darkness={0.9} />
      </EffectComposer>
    );
  }

  // High tier: full effects
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        intensity={0.8}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.9} />
      <DepthOfField
        focusDistance={focusDistance}
        focalLength={0.05}
        bokehScale={activeObject ? 3 : 1}
      />
    </EffectComposer>
  );
}
