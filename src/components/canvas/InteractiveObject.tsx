import type { ReactNode } from "react";
import type { Vector3Tuple } from "three";
import { Float } from "@react-three/drei";
import { useInteraction } from "@/hooks/useInteraction";

interface Props {
  objectKey: string;
  position: Vector3Tuple;
  children: ReactNode;
}

export default function InteractiveObject({ objectKey, position, children }: Props) {
  const { groupRef, onClick, onPointerOver, onPointerOut } = useInteraction(objectKey);

  return (
    <Float floatIntensity={0.3} speed={1.5} rotationIntensity={0}>
      <group
        ref={groupRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {children}
      </group>
    </Float>
  );
}
