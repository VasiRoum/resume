import { CameraControls, PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import Lighting from "./Lighting";
import Atmosphere from "./Atmosphere";
import PostProcessing from "./PostProcessing";
import DeskScene from "./DeskScene";
import { useCameraTransition } from "@/hooks/useCameraTransition";
import { useResponsive } from "@/hooks/useResponsive";
import { useAppStore } from "@/store/useAppStore";

function AdaptiveCamera() {
  const { fov } = useResponsive();
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    if ("fov" in camera) {
      (camera as { fov: number; updateProjectionMatrix: () => void }).fov = fov;
      (camera as { updateProjectionMatrix: () => void }).updateProjectionMatrix();
    }
  }, [fov, camera]);

  return null;
}

export default function Scene() {
  const controlsRef = useCameraTransition();
  const { sceneScale } = useResponsive();

  return (
    <>
      <PerformanceMonitor
        onDecline={() => useAppStore.getState().setPerformanceTier("low")}
        onIncline={() => useAppStore.getState().setPerformanceTier("high")}
      />
      <AdaptiveCamera />
      <CameraControls
        ref={controlsRef}
        smoothTime={0.5}
        draggingSmoothTime={0.2}
        makeDefault
      />
      <Lighting />
      <Atmosphere />
      <group scale={sceneScale}>
        <DeskScene />
      </group>
      <PostProcessing />
    </>
  );
}
