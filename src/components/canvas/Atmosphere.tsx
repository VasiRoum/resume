import { Sparkles } from "@react-three/drei";

export default function Atmosphere() {
  return (
    <>
      {/* Floating dust particles */}
      <Sparkles
        count={40}
        scale={8}
        size={1.5}
        speed={0.3}
        opacity={0.15}
        color="#ffd6a5"
      />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#0a0a0a", 8, 25]} />
    </>
  );
}
