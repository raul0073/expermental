"use client";

import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";
import { useTheme } from "next-themes";

export default function PitchWithCanvas({
	activeTeam,
}: {
	activeTeam: TeamTypeInit;
}) {
	const {theme} = useTheme()
	return (
		<Canvas
			key={activeTeam.name}
			shadows
			dpr={[1, 1.5]}
			camera={{ position: [30, 75, 130], fov: 30 }}
			onCreated={({ gl }) => {
				gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
					e.preventDefault();
					console.warn("WebGL context lost. Try reloading the page.");
				});
			}}
			style={{ backgroundColor: `${theme === 'dark' ? '#1c1917' : '#f5f5f4'}` }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[20, 30, 10]} intensity={1} castShadow />

			<OrbitControls
				enableRotate
				enablePan
				enableZoom
				enableDamping
				mouseButtons={{ LEFT: 2, MIDDLE: 0, RIGHT: 1 }}
				panSpeed={1.5}
				zoomSpeed={0.5}
				rotateSpeed={0.6}
				maxPolarAngle={Math.PI / 2.2}
				minPolarAngle={0.2}
			/>

			<FootballPitch>
				{/* injected children */}
				<Team key={`${activeTeam}-players`} teamName={activeTeam.name} />
				<TeamZonesView key={`${activeTeam}-zones`} teamName={activeTeam.name}  />
			</FootballPitch>
		</Canvas>
	);
}
