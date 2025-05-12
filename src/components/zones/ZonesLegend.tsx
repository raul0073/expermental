"use client";

import { Billboard, Text } from "@react-three/drei";
import { useTheme } from "next-themes";

export function ZoneRatingLegend3D({ maxRating }: { maxRating: number }) {
  const barWidth = 20;
  const barHeight = 0.8;
  const segments = 20;

  const colors = [...Array(segments)].map((_, i) => {
    const t = i / (segments - 1);
    const r = t < 0.5 ? t * 2 : 1;
    const g = t < 0.5 ? 1 : 1 - (t - 0.5) * 2;
    return `rgb(${Math.floor(r * 255)},${Math.floor(g * 255)},0)`;
  });
  const {theme} = useTheme()
  return (
    <group position={[-40, 15, -40]}>
        <Billboard>

      {/* Rating Bar Segments */}
      {colors.map((color, i) => (
        <mesh key={i} position={[-barWidth / 2 + i * (barWidth / segments) + 0.25, 0, 0]}>
          <boxGeometry args={[barWidth / segments, barHeight, 0.09]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
     

      {/* Label */}
      <Billboard position={[0, 0.8, 0]}>
        <Text fontSize={0.9} color={`${theme === 'dark' ? 'orange' : 'black'}`} anchorX="center" anchorY="bottom">
          Zone Rating
        </Text>
      </Billboard>

      {/* Min and Max Labels */}
      <Billboard position={[-barWidth / 2, -0.8, 0]}>
        <Text fontSize={0.7} color={`${theme === 'dark' ? 'yellow' : 'black'}`} anchorX="center" anchorY="top">
        0.00 
        </Text>
      </Billboard>
      <Billboard position={[barWidth / 2, -0.8, 0]}>
        <Text fontSize={0.7} color={`${theme === 'dark' ? 'white' : 'black'}`} anchorX="center" anchorY="top">
        {maxRating.toFixed(2)}
        </Text>
      </Billboard>
      </Billboard>
    </group>
  );
}
