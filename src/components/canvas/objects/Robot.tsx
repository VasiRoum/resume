import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { useAppStore } from "@/store/useAppStore";

export default function Robot() {
  const head = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const eyeGlowTarget = useRef(0);

  useFrame((_state, delta) => {
    const active = useAppStore.getState().activeObject === "robot";
    eyeGlowTarget.current = active ? 3 : 0.2;

    if (head.current) {
      const targetRotY = active ? Math.sin(Date.now() * 0.001) * 0.4 : 0;
      easing.damp(head.current.rotation, "y", targetRotY, 0.3, delta);
    }

    [leftEye.current, rightEye.current].forEach((eye) => {
      if (!eye) return;
      const mat = eye.material as MeshStandardMaterial;
      easing.damp(mat, "emissiveIntensity", eyeGlowTarget.current, 0.4, delta);
    });
  });

  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.18, 0.22, 0.14]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.14, 0.13]} />
          <meshStandardMaterial color="#c4b5fd" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEye} position={[-0.04, 0.02, 0.07]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={0.2}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.04, 0.02, 0.07]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={0.2}
            toneMapped={false}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.06, 6]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Arms */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.16, 0.04]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}

      {/* Legs */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.05, -0.16, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
          <meshStandardMaterial color="#7c3aed" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
