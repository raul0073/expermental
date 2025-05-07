"use client";

import { useDispatch } from "react-redux";
import { setSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { Billboard, Text } from "@react-three/drei";
import { useState } from "react";
import { ChannelZone } from "./zones.types";
import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";

export function ZoneModel({ zone }: { zone: ChannelZone }) {
  const dispatch = useDispatch();
  const { id, label, position: [x, z], width, length } = zone;

  const [hovered, setHovered] = useState(false);

  return (
    <group position={[x, 0.02, z]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie on the XZ-plane
        onPointerOver={(e) => { 
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => { 
          document.body.style.cursor = "default"; 
          setHovered(false);
        }}
        onClick={() => [dispatch(clearSelectedPlayer()),dispatch(setSelectedZone({ id, label }))]}
      >
        {/* Apply color to the whole plane (not just the text) */}
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial 
          transparent
          opacity={hovered ? 0.3 : 0.1} // Transparency for the zone color
          color={hovered ? "rgba(255,255,0,1)" : "rgba(0,0,255,0.1)"} // Hover colors
        />
      </mesh>

      {/* The Billboard ensures that text remains facing the camera */}
      <Billboard>
      <Text
          position={[0, 0.01, 0]}
          fontSize={0.8}
          color="yellow"
          fontWeight={'bold'}
          anchorX="center"
          anchorY="bottom"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
