import { Environment, ContactShadows, BakeShadows } from "@react-three/drei";

export default function Lighting() {
  return (
    <>
      {/* Dim cool ambient */}
      <ambientLight intensity={0.15} color="#b0c4de" />

      {/* Warm desk lamp — main light */}
      <spotLight
        position={[-2, 5, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#ffd6a5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cool accent from MacBook screen */}
      <pointLight position={[0, 1.5, 1]} intensity={0.6} color="#60a5fa" distance={5} />

      {/* Side accent */}
      <pointLight position={[3, 2, -1]} intensity={0.3} color="#c084fc" distance={6} />

      {/* Reflections */}
      <Environment preset="night" environmentIntensity={0.1} />

      {/* Ground shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.6}
        scale={12}
        blur={2}
        far={4}
        frames={1}
      />

      <BakeShadows />
    </>
  );
}
