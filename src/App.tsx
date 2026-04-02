import { Canvas } from "@react-three/fiber";
import Scene from "@/components/canvas/Scene";
import Navigation from "@/components/overlay/Navigation";
import ScrollStory from "@/components/overlay/ScrollStory";
import LoadingScreen from "@/components/overlay/LoadingScreen";
import { useModelPreloader } from "@/hooks/useModelPreloader";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

export default function App() {
  const reset = useAppStore((s) => s.reset);
  const hoveredObject = useAppStore((s) => s.hoveredObject);
  useModelPreloader();

  useEffect(() => {
    document.body.style.cursor = hoveredObject ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredObject]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [5, 4, 5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onPointerMissed={() => reset()}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <Scene />
      </Canvas>
      <Navigation />
      <ScrollStory />
      <LoadingScreen />
    </div>
  );
}
