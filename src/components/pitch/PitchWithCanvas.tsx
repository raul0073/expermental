"use client";

import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { RootState } from "@/lib/store";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { RefObject, useRef } from "react";
import { useSelector } from "react-redux";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";
import * as THREE from 'three'
function CanvasContent({
	activeTeam,
	controlsRef,
  }: {
	activeTeam: TeamTypeInit;
	controlsRef: RefObject<OrbitControlsImpl | null>;
  }) {
	const { camera } = useThree();
	const perspectiveCamera = camera as THREE.PerspectiveCamera;
	const selectedPlayer = useSelector((state: RootState) => state.selectedPlayer.selected);
	const { theme } = useTheme();
  
	return (
	  <>
		{/* Scene background */}
		<color attach="background" args={[theme === 'dark' ? '#1c1917' : 'lightgray']} />
  
		{/* Lights */}
		<directionalLight position={[100, 100, 100]} intensity={selectedPlayer ? 0.0 : 1.2} />
		<directionalLight position={[-100, 30, 20]} intensity={0.5} />
		<ambientLight intensity={1} />
  
		{/* OrbitControls */}
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
		  minDistance={5}
		  maxDistance={250}
		/>
  
		{/* Pitch + Players */}
		<FootballPitch>
		 {controlsRef && (
			 <Team
			 key={`${activeTeam.name}-players`}
			 teamName={activeTeam.name}
			 controlsRef={controlsRef}
			 camera={perspectiveCamera}
		   />
		 )}
		  <TeamZonesView
			key={`${activeTeam.name}-zones`}
			teamName={activeTeam.name}
		  />
		</FootballPitch>
	  </>
	);
  }
  
  export default function PitchWithCanvas({
	activeTeam,
  }: {
	activeTeam: TeamTypeInit;
  }) {
	const controlsRef = useRef<OrbitControlsImpl | null>(null);
  
	return (
	  <Canvas
		key={activeTeam.name}
		shadows
		dpr={[1, 1.5]}
		camera={{ position: [0, 55, 100], fov: 35 }}
		onCreated={({ gl }) => {
		  gl.getContext().canvas.addEventListener("webglcontextlost", (e) => {
			e.preventDefault();
			console.warn("WebGL context lost. Try reloading the page.");
		  });
		}}
	  >
		<CanvasContent activeTeam={activeTeam} controlsRef={controlsRef} />
	  </Canvas>
	);
  }