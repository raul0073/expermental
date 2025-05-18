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

export function Team({ teamName }: { teamName: string }) {
  const dispatch = useDispatch();
  const {toggleSidebar, open} = useSidebar()
  const team = useSelector((state: RootState) => state.team[teamName]);
  const tracker = team?.best_11.map(p => p.name).join('-');
  const [renderKey, setRenderKey] = useState(0);
  useEffect(() => {
    setRenderKey(k => k + 1);
  }, [teamName, tracker]);
  if (!team) {
    return (
      <Billboard>
        <Text
          position={[0, 1.1, 0]}
          fontSize={4}
          color="white"
          fontWeight="bold"
          anchorX="center"
          anchorY="bottom"
        >
          loading team stats
        </Text>
      </Billboard>
    );
  }

  const best11 = team.best_11;
  const roles = FORMATION_MAP[team.formation] || [];
  if (best11.length !== roles.length) return null;
  const subs = team.players.filter(
    p => !best11.some(b => b.name === p.name)
  );

  // allocate unique slots
  const used = new Set<string>();
  const slotMap = best11.map(player => {
    // candidates: primary, fallbacks, then any remaining formation slot
    const candidates = [
      player.role,
      ...(POSITION_FALLBACK[player.role] || []),
      ...roles
    ];

    const pick = candidates.find(r => roles.includes(r) && !used.has(r));
    if (pick) used.add(pick);
    return pick ?? roles.find(r => !used.has(r))!;
  });
    
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
              if(open){
          
              }else {
        
                toggleSidebar();
              } 
            }
          }
          />
        );
      })}

      {subs.map((sub, i) => {
        const x = -5 + i * 6;
        const z = -40;
        return (
          <PlayerModel
          key={`${renderKey}-sub-${sub.name}-${i}-${sub.nationality}`}
            name={sub.name}
            isSub
            rating={sub.rating}
            shirt_number={sub.shirt_number}
            position={[x, z]}
            onClick={() => {
              dispatch(clearSelectedZone());
              dispatch(setSelectedPlayer(sub));
              if(open){
          
              }else {
        
                toggleSidebar();
              } 
            }
            }
          />
        );
      })}
    </group>
  );
}
