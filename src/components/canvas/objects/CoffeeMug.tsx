import { Sparkles } from "@react-three/drei";
import type { Vector3Tuple } from "three";

interface Props {
  position: Vector3Tuple;
}

export default function CoffeeMug({ position }: Props) {
  return (
    <group position={position}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.12, 16]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.035, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.6} />
      </mesh>

      {/* Coffee inside */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.01, 16]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>

      {/* Steam particles */}
      <Sparkles
        count={8}
        scale={[0.06, 0.15, 0.06]}
        size={0.8}
        speed={0.4}
        opacity={0.12}
        color="#ffffff"
        position={[0, 0.12, 0]}
      />
    </group>
  );
}
