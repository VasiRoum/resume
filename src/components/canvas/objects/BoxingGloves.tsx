import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh } from "three";
import { useAppStore } from "@/store/useAppStore";

export default function BoxingGloves() {
  const leftGlove = useRef<Mesh>(null);
  const rightGlove = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    const active = useAppStore.getState().activeObject === "boxing";

    if (leftGlove.current && rightGlove.current) {
      if (active) {
        const t = Date.now() * 0.003;
        easing.damp(leftGlove.current.position, "y", 0.06 + Math.sin(t) * 0.08, 0.2, delta);
        easing.damp(
          rightGlove.current.position,
          "y",
          0.06 + Math.sin(t + Math.PI) * 0.08,
          0.2,
          delta,
        );
      } else {
        easing.damp(leftGlove.current.position, "y", 0.06, 0.3, delta);
        easing.damp(rightGlove.current.position, "y", 0.06, 0.3, delta);
      }
    }
  });

  return (
    <group>
      {/* Left glove */}
      <mesh ref={leftGlove} position={[-0.08, 0.06, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.5} />
      </mesh>
      <mesh position={[-0.08, -0.04, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.06, 12]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Right glove */}
      <mesh ref={rightGlove} position={[0.08, 0.06, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.5} />
      </mesh>
      <mesh position={[0.08, -0.04, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.06, 12]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Laces */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 6]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
    </group>
  );
}
