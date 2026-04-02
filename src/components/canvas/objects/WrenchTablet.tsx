import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh, MeshStandardMaterial } from "three";
import { useAppStore } from "@/store/useAppStore";

export default function WrenchTablet() {
  const wrench = useRef<Mesh>(null);
  const tabletScreen = useRef<Mesh>(null);
  const screenGlowTarget = useRef(0.3);

  useFrame((_state, delta) => {
    const active = useAppStore.getState().activeObject === "wrench";

    if (wrench.current) {
      const targetRotZ = active ? wrench.current.rotation.z + delta * 3 : 0;
      easing.damp(wrench.current.rotation, "z", targetRotZ, 0.3, delta);
    }

    screenGlowTarget.current = active ? 2 : 0.3;
    if (tabletScreen.current) {
      const mat = tabletScreen.current.material as MeshStandardMaterial;
      easing.damp(mat, "emissiveIntensity", screenGlowTarget.current, 0.4, delta);
    }
  });

  return (
    <group>
      {/* Tablet */}
      <mesh castShadow position={[0.1, 0.02, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.35]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh ref={tabletScreen} position={[0.1, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.22, 0.3]} />
        <meshStandardMaterial
          color="#facc15"
          emissive="#facc15"
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Wrench */}
      <group position={[-0.12, 0.04, 0]}>
        <mesh ref={wrench} castShadow>
          <boxGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.17]}>
          <boxGeometry args={[0.08, 0.025, 0.05]} />
          <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
