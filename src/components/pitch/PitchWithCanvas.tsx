"use client";

import { RootState } from "@/lib/store";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";

function PitchWithCanvas() {
	const teamName = useSelector(
		(state: RootState) => state.userConfig.team.name
	);

	return (
		<Canvas
			key={teamName}
			shadows
			dpr={[1, 1.5]}
			onCreated={({ gl }) => {
				gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
					e.preventDefault();
					console.warn("WebGL context lost. Try reloading the page.");
				});
			}}
			camera={{ position: [0, 55, 90], fov: 30 }}
			style={{ backgroundColor: "#3f3f3f3f" }}>
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

			<FootballPitch
				assets={
					<>
						<Team key={`${teamName}-view-players`} />
						<TeamZonesView key={`${teamName}-view-zones`} />
						
					</>
				}
			/>
		</Canvas>
	);
}

export default PitchWithCanvas;
