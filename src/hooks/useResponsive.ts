import { useThree } from "@react-three/fiber";

export function useResponsive() {
  const viewport = useThree((s) => s.viewport);
  const isMobile = viewport.width < 6; // ~640px in 3D units at default distance
  const isTablet = viewport.width < 9 && !isMobile;

  return {
    isMobile,
    isTablet,
    sceneScale: isMobile ? 0.65 : isTablet ? 0.8 : 1,
    fov: isMobile ? 55 : 45,
  };
}
