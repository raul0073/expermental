"use client";

import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { setSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { Billboard, Edges, Text } from "@react-three/drei";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FullZone } from "./zones.types";
import { useTheme } from "next-themes";

export function ZoneModel({
	zone,
	maxRating,
}: {
	zone: FullZone;
	maxRating: number;
}) {
	const dispatch = useDispatch();
	const {
		label,
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
		if (normalizedRating >= 0.75) return "#28a745";
		if (normalizedRating >= 0.5) return "#ffc107";
		if (normalizedRating > 0) return "gray";
		return "#999999";
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
					dispatch(setSelectedZone(zone));
				}}
			>
				<planeGeometry args={[length, width]} />
				<meshStandardMaterial
					transparent
					opacity={0.2}
					color={fillColor}
				/>
				<Edges color="gray" />
			</mesh>

			<Billboard>
				<Text
					position={[0, 0.1, 0]}
					fontSize={0.6}
					color={`${theme === 'dark' ? 'lightGray' : 'lightGray'}`}
					anchorX="center"
					anchorY="bottom"
				>
					{label} ({rating.toFixed(2)})
				</Text>
			</Billboard>
		
		</group>
	);
}
