'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlayer } from '@/lib/features/SelectedPlayerSlice';
import { clearSelectedZone } from '@/lib/features/SelectedZoneSlice';
import { RootState } from '@/lib/store';
import { FORMATION_MAP, POSITION_FALLBACK, ROLE_POSITIONS } from '@/lib/Types/Formation.Type';
import { PlayerModel } from './playerModel';
import { Billboard, Text } from '@react-three/drei';
import { useSidebar } from '../ui/sidebar';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export function Team({ teamName, controlsRef, camera }: {
  teamName: string;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  camera: THREE.PerspectiveCamera;
}) {
  const dispatch = useDispatch();
  const { toggleSidebar, open } = useSidebar();
  const team = useSelector((state: RootState) => state.team[teamName]);
  const tracker = team?.best_11.map(p => p.name).join('-');
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(k => k + 1);
  }, [teamName, tracker]);

  if (!team) {
    return (
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 3, 0]}
          fontSize={5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="black"
        >
          Loading Team Stats & Models...
        </Text>
      </Billboard>
    );
  }

  const best11 = team.best_11;
  const roles = FORMATION_MAP[team.formation] || [];
  if (best11.length !== roles.length) return null;

  const subs = team.players.filter(p => !best11.some(b => b.name === p.name));

  const used = new Set<string>();
  const slotMap = best11.map(player => {
    const candidates = [
      player.role,
      ...(POSITION_FALLBACK[player.role] || []),
      ...roles
    ];
    const pick = candidates.find(r => roles.includes(r) && !used.has(r));
    if (pick) used.add(pick);
    return pick ?? roles.find(r => !used.has(r))!;
  });

  const focusCamera = (position: [number, number]) => {
    const playerPos = new THREE.Vector3(position[0], 5, position[1]);

    // Rotate slightly right and pull back to frame full player front
    const offsetDirection = new THREE.Vector3(-1, 0, -0.5).normalize();
    const cameraOffset = offsetDirection.multiplyScalar(10).add(new THREE.Vector3(30, 7.5, 0));
    const newCameraPos = playerPos.clone().add(cameraOffset);

    if (controlsRef.current && camera) {
      camera.position.copy(newCameraPos);
      controlsRef.current.target.copy(playerPos.clone().add(new THREE.Vector3(0, 2, 0)));
      controlsRef.current.update();
    }
  };

  return (
    <group key={teamName}>
      {best11.map((player, i) => {
        const slot = slotMap[i];
        const position =
          ROLE_POSITIONS[slot as keyof typeof ROLE_POSITIONS] ?? [0, 0];
        return (
          <PlayerModel
            key={`${renderKey}-starter-${player.name}-${i}-${player.nationality}`}
            name={player.name}
            isSub={false}
            rating={player.rating}
            shirt_number={player.shirt_number}
            position={position}
            onClick={() => {
              dispatch(clearSelectedZone());
              dispatch(setSelectedPlayer(player));
              focusCamera(position);
              if (!open) toggleSidebar();
            }}
          />
        );
      })}

      {subs.map((sub, i) => {
        const x = -5 + i * 6;
        const z = -40;
        const position: [number, number] = [x, z];
        return (
          <PlayerModel
            key={`${renderKey}-sub-${sub.name}-${i}-${sub.nationality}`}
            name={sub.name}
            isSub
            rating={sub.rating}
            shirt_number={sub.shirt_number}
            position={position}
            onClick={() => {
              dispatch(clearSelectedZone());
              dispatch(setSelectedPlayer(sub));
              focusCamera(position);
              if (!open) toggleSidebar();
            }}
          />
        );
      })}
    </group>
  );
}
