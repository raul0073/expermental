// components/player/PlayerModel.tsx
'use client';

import { RootState } from '@/lib/store';
import { Billboard, Text, useGLTF } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { Group } from 'three';

/**
 * Simplified PlayerModel: applies static scale and position
 * Remove spring animations to verify correct glTF rendering
 */
export function PlayerModel({
  position: [x, z],
  shirt_number,
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
  const selected = useSelector((state: RootState) => state.selectedPlayer.selected);

  const isSelected = selected?.name === name;
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
    : [3, 4, 3];

  return (
    <group
  ref={ref}
  position={[x, 5, z]}
  rotation={[0, -Math.PI / -2, 0]}
  scale={targetScale}
  onClick={e => { e.stopPropagation(); onClick?.(); }}
>
  {isSelected && (
    <directionalLight
      position={[x + 100, 100, z + 100]}
      intensity={2}
      target-position={[x, 5, z]}
      castShadow
    />
  )}
  
  <primitive object={(isSub ? gltfSub.scene : gltf.scene).clone()} />

  {!isSelected && (
    <Text
      position={[0, 0.2, -0.2]}
      fontSize={0.3}
      color={theme === 'dark' ? 'black' : 'black'}
      fontWeight={isSub ? 'thin' : 'bold'}
      anchorX="center"
      anchorY="bottom"
    >
      {shirt_number}
    </Text>
  )}

 
{(!selected || isSelected) && (
  <Billboard>
    <Text
      position={[0, 1, 0]}
      fontSize={0.2}
      color={theme === 'dark' ? 'yellow' : 'black'}
      fontWeight={isSub ? 'thin' : 'bold'}
      anchorX="center"
      anchorY="bottom"
    >
      {name}
    </Text>
  </Billboard>
)}

</group>

  );
}
