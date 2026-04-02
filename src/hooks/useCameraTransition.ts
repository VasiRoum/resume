import { useEffect, useRef } from "react";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";
import { sceneObjects, overviewCamera } from "@/data/scene-config";

export function useCameraTransition() {
  const controlsRef = useRef<CameraControlsType>(null);
  const activeObject = useAppStore((s) => s.activeObject);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (activeObject && sceneObjects[activeObject]) {
      const config = sceneObjects[activeObject];
      const [px, py, pz] = config.cameraPosition;
      const [tx, ty, tz] = config.cameraTarget;
      controls.setLookAt(px, py, pz, tx, ty, tz, true);

      // Disable manual rotation in focus mode
      controls.minAzimuthAngle = 0;
      controls.maxAzimuthAngle = 0;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
    } else {
      const [px, py, pz] = overviewCamera.position;
      const [tx, ty, tz] = overviewCamera.target;
      controls.setLookAt(px, py, pz, tx, ty, tz, true);

      // Allow slight drag rotation in overview
      const azimuthRange = (15 * Math.PI) / 180;
      const polarCenter = Math.PI / 4;
      const polarRange = (10 * Math.PI) / 180;
      controls.minAzimuthAngle = -azimuthRange;
      controls.maxAzimuthAngle = azimuthRange;
      controls.minPolarAngle = polarCenter - polarRange;
      controls.maxPolarAngle = polarCenter + polarRange;
    }

    // Mark transition complete after animation
    const timeout = setTimeout(() => {
      useAppStore.getState().setTransitioning(false);
    }, activeObject ? 600 : 200);

    return () => clearTimeout(timeout);
  }, [activeObject]);

  return controlsRef;
}
