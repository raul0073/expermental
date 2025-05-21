"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";
import { useMemo } from "react";

export default function GrassSurface() {
  const [colorMap, normalMap, roughnessMap, displacementMap] = useLoader(TextureLoader, [
    "/textures/grass/Color.jpg",
    "/textures/grass/NormalGL.jpg",
    "/textures/grass/Roughness.jpg",
    "/textures/grass/Displacement.jpg",
  ]);

  const material = useMemo(() => {
    [colorMap, normalMap, roughnessMap, displacementMap].forEach((map) => {
      map.wrapS = map.wrapT = RepeatWrapping;
      map.repeat.set(50, 50); 
    });

    return new MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      displacementMap,
      displacementScale: 0.0,
    });
  }, [colorMap, normalMap, roughnessMap, displacementMap]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[125, 68, 512, 512]} />
      <primitive attach="material" object={material} />
    </mesh>
  );
}
