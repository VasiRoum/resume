import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Group } from "three";
import { useAppStore } from "@/store/useAppStore";

export default function Train() {
  const trainBody = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!trainBody.current) return;
    const active = useAppStore.getState().activeObject === "train";

    if (active) {
      // Direct oscillation — no damping on a moving target
      trainBody.current.position.x = Math.sin(Date.now() * 0.001) * 0.3;
    } else {
      // Damp back to rest
      easing.damp(trainBody.current.position, "x", 0, 0.3, delta);
    }
  });

  return (
    <group>
      {/* Track */}
      <mesh>
        <boxGeometry args={[1.2, 0.02, 0.15]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Rails */}
      {[-0.05, 0.05].map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]}>
          <boxGeometry args={[1.2, 0.01, 0.015]} />
          <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
      ))}

      {/* Train body */}
      <group ref={trainBody} position={[0, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.15, 0.12]} />
          <meshStandardMaterial color="#e74c3c" />
        </mesh>
        <mesh position={[-0.1, 0.1, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.1]} />
          <meshStandardMaterial color="#c0392b" />
        </mesh>
        <mesh position={[0.12, 0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.08, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {[-0.12, 0, 0.12].map((x, i) => (
          <mesh key={i} position={[x, -0.07, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
