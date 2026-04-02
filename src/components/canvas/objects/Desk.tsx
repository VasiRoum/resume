import { RoundedBox } from "@react-three/drei";

export default function Desk() {
  return (
    <group>
      {/* Desktop surface */}
      <RoundedBox
        args={[8, 0.12, 5]}
        radius={0.03}
        position={[0, 0.6, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="#3d2b1f" roughness={0.6} />
      </RoundedBox>

      {/* Legs */}
      {[
        [-3.5, 0, -2],
        [3.5, 0, -2],
        [-3.5, 0, 2],
        [3.5, 0, 2],
      ].map(([x, _y, z], i) => (
        <mesh key={i} position={[x, 0.3, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <meshStandardMaterial color="#2a1f14" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
