"use client";

import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { RootState } from "@/lib/store";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";
import { CameraZoom } from "./camera/CameraZoom";

export default function PitchWithCanvas({
	activeTeam,
}: {
	activeTeam: TeamTypeInit;
}) {
	const { theme } = useTheme();
	const controlsRef = useRef<OrbitControlsImpl>(null);
	const selectedPlayer = useSelector(
		(state: RootState) => state.selectedPlayer.selected
	);

	return (
		<Canvas
			key={activeTeam.name}
			shadows
			dpr={[1, 1.5]}
			camera={{ position: [30, 55, 130], fov: 30 }}
			onCreated={({ gl }) => {
				gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
					e.preventDefault();
					console.warn("WebGL context lost. Try reloading the page.");
				});
			}}>
			{/* Scene background */}
			<color
				attach="background"
				args={[theme === "dark" ? "#1c1917" : "lightgray"]}
			/>

			{/* Stadium lighting */}
			<directionalLight
				position={[100, 100, 100]}
				intensity={selectedPlayer ? 0.5 : 1.2}
			/>
			<directionalLight
				position={[-100, 30, 20]}
				intensity={selectedPlayer ? 0.1 : 0.5}
			/>
			<ambientLight intensity={selectedPlayer ? 0.05 : 0.4} />
			<ambientLight intensity={1} />

			{/* Orbit controls */}
			<OrbitControls
				ref={controlsRef}
				enableRotate
				enablePan
				enableZoom
				enableDamping
				panSpeed={1.5}
				zoomSpeed={0.5}
				rotateSpeed={0.6}
				mouseButtons={{ LEFT: 2, MIDDLE: 0, RIGHT: 1 }}
				maxPolarAngle={Math.PI / 2.2}
				minPolarAngle={0.2}
				minDistance={80}
				maxDistance={250}
			/>

			{/* Optional camera animation */}
			{controlsRef && <CameraZoom controlsRef={controlsRef} />}

			{/* Render pitch + players */}
			<FootballPitch>
				<Team key={`${activeTeam.name}-players`} teamName={activeTeam.name} />
				<TeamZonesView
					key={`${activeTeam.name}-zones`}
					teamName={activeTeam.name}
				/>
			</FootballPitch>
		</Canvas>
	);
}
