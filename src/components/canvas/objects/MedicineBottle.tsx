import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh } from "three";
import { useAppStore } from "@/store/useAppStore";

export default function MedicineBottle() {
  const bottle = useRef<Mesh>(null);
  const capsuleRefs = useRef<Mesh[]>([]);

  useFrame((_state, delta) => {
    const active = useAppStore.getState().activeObject === "medicine";

    if (bottle.current) {
      const targetRotY = active ? bottle.current.rotation.y + delta * 2 : 0;
      easing.damp(bottle.current.rotation, "y", targetRotY, 0.3, delta);
    }

    capsuleRefs.current.forEach((cap, i) => {
      if (!cap) return;
      const targetY = active ? 0.15 + Math.sin(Date.now() * 0.002 + i * 1.5) * 0.08 : 0.02;
      easing.damp(cap.position, "y", targetY, 0.4, delta);
    });
  });

  return (
    <group>
      {/* Bottle body */}
      <mesh ref={bottle} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} transparent opacity={0.85} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.04, 16]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.02, 0.081]}>
        <planeGeometry args={[0.1, 0.12]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      {/* Capsules */}
      {[
        [0.15, 0.02, 0.05],
        [-0.12, 0.02, 0.08],
        [0.08, 0.02, -0.12],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) capsuleRefs.current[i] = el;
          }}
          position={[x, y, z]}
          rotation={[0, 0, Math.PI / 4 + i * 0.5]}
          castShadow
        >
          <capsuleGeometry args={[0.015, 0.04, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#22c55e" : "#ffffff"} />
        </mesh>
      ))}
    </group>
  );
}
