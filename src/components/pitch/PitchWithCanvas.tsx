"use client";

import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";
import { CameraZoom } from "./camera/CameraZoom";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function PitchWithCanvas({
	activeTeam,
}: {
	activeTeam: TeamTypeInit;
}) {
	const { theme } = useTheme();
	const controlsRef = useRef<OrbitControlsImpl>(null);
	const selectedPlayer = useSelector((state: RootState) => state.selectedPlayer.selected);

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
			}}>
			<color
				attach="background"
				args={[theme === "dark" ? "#1c1917" : "#6d8c76"]}
			/>
			{/* player lights */}
			<directionalLight
	position={[100, 100, 100]}
	intensity={selectedPlayer ? 0.1 : 1.2}
/>
<	ambientLight intensity={selectedPlayer ? 0.05 : 0.4} />
			{/* STADIUM FLOODLIGHT SETUP */}
			<ambientLight intensity={selectedPlayer ? 0.6 : 1} />

			{/* Four corner lights simulating floodlights */}
	


			<OrbitControls
				ref={controlsRef}
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
			{controlsRef && <CameraZoom controlsRef={controlsRef} />}
			<FootballPitch>
				{/* injected children */}
				{/* <TeamLogo url={activeTeam.logo}	/> */}
				<Team key={`${activeTeam.name}-players`} teamName={activeTeam.name} />
				<TeamZonesView
					key={`${activeTeam.name}-zones`}
					teamName={activeTeam.name}
				/>
			</FootballPitch>
		</Canvas>
	);
}


