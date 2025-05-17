"use client";

import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { setSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { Billboard, Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { FullSelectableZone, FullZone } from "./zones.types";
import { useSidebar } from "../ui/sidebar";

export function ZoneModel({
	zone,
	maxRating,
}: {
	zone: FullZone;
	maxRating: number;
}) {
	const dispatch = useDispatch();
	const {toggleSidebar, open} = useSidebar()
	const {
		position: [x, z],
		width,
		length,
		rating,
	} = zone;

	const [hovered, setHovered] = useState(false);
	const {theme} = useTheme()
	const normalizedRating = useMemo(() => {
		if (!rating || !maxRating) return 0;
		return Math.min(rating / maxRating, 1);
	}, [rating, maxRating]);

	const fillColor = useMemo(() => {
		if (hovered) return "orange";
		// Hue: 0° = red, 120° = green
		// normalizedRating 0 → hue 120 (green)
		// normalizedRating 1 → hue 0   (red)
		const hue = (1 - normalizedRating) * 120;
		// 80% saturation, 50% lightness gives vivid colors
		return `hsl(${hue}, 80%, 40%)`;
	  }, [normalizedRating, hovered]);

	return (
		<group position={[x, 0.02, z]}>
			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				onPointerOver={(e) => {
					e.stopPropagation();
					document.body.style.cursor = "pointer";
					setHovered(true);
				}}
				onPointerOut={() => {
					document.body.style.cursor = "default";
					setHovered(false);
				}}
				onClick={() => {
					dispatch(clearSelectedPlayer());
					dispatch(setSelectedZone(zone as unknown as FullSelectableZone));
					if (!open) toggleSidebar();
				  }}
			>
				<planeGeometry args={[length, width]} />
				<meshStandardMaterial
					transparent
					opacity={0.4}
					color={fillColor}
				/>
				
			</mesh>

			<Billboard>
				<Text
					position={[0, 0.1, 0]}
					fontSize={0.9}
					color={`${theme === 'dark' ? 'lightGray' : 'lightGray'}`}
					anchorX="center"
					anchorY="bottom"
				>
					{rating.toFixed(2)}
				</Text>
			</Billboard>
		
		</group>
	);
}
