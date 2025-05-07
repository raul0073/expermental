'use client'
import { Billboard, Text, useCursor } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";

export function PlayerModel({
  position,
  number,
  name,
  avRating,
  onClick,
}: {
  position: [number, number];
  number: number;
  name: string;
  avRating: number;
  onClick?: () => void;
}) {

  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); // enables CSS pointer cursor when hovered
  return (
    <group position={[position[0], 0.5, position[1]]} onClick={onClick}    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)} >
       <mesh ref={meshRef}>
        <sphereGeometry args={[0.6, 32, 32]}  />
        <meshStandardMaterial color="red" />
      </mesh>

      <Billboard>
        <Text position={[0, 0, 0.65]} fontSize={0.3} color="white" anchorX="center">
          {number}
        </Text>
      </Billboard>

      <Billboard>
        <Text
          position={[0, 1.1, 0]}
          fontSize={0.8}
          color="yellow"
          
          fontWeight={'bold'}
          anchorX="center"
          anchorY="bottom"
        >
          {name} ({avRating.toFixed(1)})
        </Text>
      </Billboard>
    </group>
  );
}
