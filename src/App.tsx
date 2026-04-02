import { Canvas } from "@react-three/fiber";
import Scene from "@/components/canvas/Scene";
import ContentPanel from "@/components/overlay/ContentPanel";
import Navigation from "@/components/overlay/Navigation";
import LoadingScreen from "@/components/overlay/LoadingScreen";
import { useModelPreloader } from "@/hooks/useModelPreloader";
import { useAppStore } from "@/store/useAppStore";

export default function App() {
  const reset = useAppStore((s) => s.reset);
  useModelPreloader();

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [5, 4, 5], fov: 45 }}
        gl={{ antialias: true }}
        onPointerMissed={() => reset()}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <Scene />
      </Canvas>
      <Navigation />
      <ContentPanel />
      <LoadingScreen />
    </div>
  );
}
