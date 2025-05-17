"use client";

import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";

export default function PitchWithCanvas({
	activeTeam,
}: {
	activeTeam: TeamTypeInit;
}) {
	const { theme } = useTheme();
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
			style={{
				backgroundColor: `${theme === "dark" ? "#1c1917" : "#f5f5f4"}`,
			}}>
			<color
				attach="background"
				args={[theme === "dark" ? "#1c1917" : "#e8f1ee"]}
			/>

			{/* soft skylight that shifts with the theme */}
			<hemisphereLight
				groundColor={theme === "dark" ? "#111" : "#ebeae8"}
				intensity={0.5}
			/>

			{/* key sun light with soft shadows */}
			<directionalLight
				position={[75, 120, 50]}
				intensity={theme === "dark" ? 1.1 : 0.9}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={1}
				shadow-camera-far={300}
				shadow-camera-left={-120}
				shadow-camera-right={120}
				shadow-camera-top={120}
				shadow-camera-bottom={-120}
			/>

			{/* rim light to pop silhouettes */}
			<directionalLight
				position={[-60, 50, -80]}
				intensity={0.4}
				color={theme === "dark" ? "#145" : "#88bbff"}
			/>

			{/* low, warm fill to soften faces / kits */}
			<directionalLight
				position={[0, 20, 100]}
				intensity={0.3}
				color={theme === "dark" ? "#443322" : "#ffe8cc"}
			/>

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
