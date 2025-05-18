// components/player/PlayerModel.tsx
'use client';

import { Billboard, Text, useGLTF } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useRef } from 'react';
import type { Group } from 'three';

/**
 * Simplified PlayerModel: applies static scale and position
 * Remove spring animations to verify correct glTF rendering
 */
export function PlayerModel({
  position: [x, z],
  name,
  isSub = false,
  onClick,
}: {
  position: [number, number];
  shirt_number: number;
  name: string;
  rating: number;
  isSub?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<Group>(null);
  const { theme } = useTheme();
  const gltf = useGLTF('/models/modelV1.1.glb');
  const gltfSub = useGLTF('/models/modelV1.1-sub.glb');

  // enable shadows on the model
  useLayoutEffect(() => {
    const scene = isSub ? gltfSub.scene : gltf.scene;
    scene?.traverse(child => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [gltf, gltfSub, isSub]);

  // apply a clear, static scale
  const targetScale: [number, number, number] = isSub
    ? [3, 4, 3]
    : [4, 5, 3.5];

  return (
    <group
      ref={ref}
      position={[x, 5, z]}
      scale={targetScale}
      onClick={e => { e.stopPropagation(); onClick?.(); }
    }>
     <Billboard>
     <primitive object={(isSub ? gltfSub.scene : gltf.scene).clone()}  />
     </Billboard>
      <Billboard>
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color={theme === 'dark' ? 'yellow' : 'white'}
          fontWeight={isSub ? 'thin' : 'bold'}
          anchorX="center"
          anchorY="bottom"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}
