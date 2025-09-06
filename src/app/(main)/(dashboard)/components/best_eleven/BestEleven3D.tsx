"use client";

import { Canvas } from "@react-three/fiber";
import { Billboard, OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Player } from "../../utils/types/player";

type Props = {
  eleven: Player[];
};

export default function BestEleven3D({ eleven }: Props) {
  // Group players by role
  const playersByRole: Record<string, Player[]> = {};
  eleven.forEach((p) => {
    if (!playersByRole[p.role]) playersByRole[p.role] = [];
    playersByRole[p.role].push(p);
  });

  return (
    <div className="w-full h-[700px] border">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 120, 180]} fov={35} />
        
        {/* OrbitControls */}
        <OrbitControls 
          maxPolarAngle={Math.PI / 2}  // prevent looking beneath pitch
          enablePan={true}
        />

        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[60, 80, 60]} intensity={1} castShadow />
        <directionalLight position={[-60, 80, -60]} intensity={0.8} />
        <pointLight position={[0, 60, 0]} intensity={0.6} />

        {/* Pitch */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 60]}>
          <planeGeometry args={[120, 120]} />
          <meshStandardMaterial color="green" />
        </mesh>

        {/* Players */}
        {Object.entries(playersByRole).map(([role, players]) =>
          players.map((player, i) => {
            const pos = get3DPosition(role, i);
            return (
              <group key={player.name} position={[pos.x, 1.5, pos.z]}>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[2, 32, 32]} />
                  <meshStandardMaterial color="blue" />
                </mesh>
                <Billboard>
                  <Text
                    position={[0, 3, 0]} // above player mesh
                    fontSize={1.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                  >
                    {player.name} ({player.role})
                  </Text>
                </Billboard>
              </group>
            );
          })
        )}
      </Canvas>
    </div>
  );
}

// Map roles to 3D coordinates (x = width, z = depth 0 → 120)
function get3DPosition(role: string, idx: number) {
  const MAP: Record<string, { x: number; z: number }[]> = {
    GK: [{ x: 0, z: 10 }],
    CB: [{ x: -20, z: 30 }, { x: 20, z: 30 }],
    FB: [{ x: -35, z: 40 }, { x: 35, z: 40 }],
    DM: [{ x: 0, z: 50 }],
    CM: [{ x: -15, z: 65 }, { x: 15, z: 65 }],
    AM: [{ x: 0, z: 80 }],
    W: [{ x: -25, z: 90 }, { x: 25, z: 90 }],
    CF: [{ x: 0, z: 105 }],
  };
  return MAP[role] ? MAP[role][idx % MAP[role].length] : { x: 0, z: 60 };
}
