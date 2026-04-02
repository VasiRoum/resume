import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh } from "three";
import { useAppStore } from "@/store/useAppStore";
import { Sparkles } from "@react-three/drei";

export default function Globe() {
  const globe = useRef<Mesh>(null);
  const rotSpeed = useRef(0.2);
  const [showSparkles, setShowSparkles] = useState(false);

  useFrame((_state, delta) => {
    const active = useAppStore.getState().activeObject === "globe";
    const targetSpeed = active ? 2 : 0.2;
    easing.damp(rotSpeed, "current", targetSpeed, 0.5, delta);

    if (globe.current) {
      globe.current.rotation.y += delta * rotSpeed.current;
    }

    if (active !== showSparkles) setShowSparkles(active);
  });

  return (
    <group>
      {/* Stand */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 12]} />
        <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Axis rod */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.22, 6]} />
        <meshStandardMaterial color="#b8860b" metalness={0.6} />
      </mesh>

      {/* Globe sphere */}
      <mesh ref={globe} position={[0, 0.06, 0]} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Orbit particles when active */}
      {showSparkles && (
        <Sparkles
          count={20}
          scale={0.4}
          size={1}
          speed={1}
          opacity={0.6}
          color="#06b6d4"
          position={[0, 0.06, 0]}
        />
      )}
    </group>
  );
}
