import { Text } from "@react-three/drei";

export default function MacBook() {
  return (
    <group>
      {/* Base / keyboard */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.04, 0.9]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen lid */}
      <group position={[0, 0.42, -0.44]} rotation={[-0.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.88, 0.03]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Screen display */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.2, 0.75]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Name on screen */}
        <Text
          position={[0, 0.1, 0.025]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Vasilis Roumeliotis
        </Text>
        <Text
          position={[0, -0.05, 0.025]}
          fontSize={0.045}
          color="#dbeafe"
          anchorX="center"
          anchorY="middle"
        >
          AI Software Engineer
        </Text>
      </group>
    </group>
  );
}
