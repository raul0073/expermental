import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { bestXI } from "../player/player.service";
import { Team } from "../player/playersRendering";
import { TeamZonesView } from "../zones/zonesRendering";
import FootballPitch from "./Pitch";
function PitchWithCanvas({ type }: { type: "players" | "team" }) {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 55, 90], fov: 30 }}
			style={{ backgroundColor: "#3f3f3f3f" }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[20, 30, 10]} intensity={1} castShadow />
			<OrbitControls
				enableRotate={true}
				enablePan={true}
				enableZoom={true}
				mouseButtons={{
					LEFT: 2, // Pan
					MIDDLE: 0, // Rotate with middle button (scroll press)
					RIGHT: 1, // Zoom
				}}
				panSpeed={1.5}
				zoomSpeed={0.5}
				rotateSpeed={0.6}
				enableDamping
				maxPolarAngle={Math.PI / 2.2} // Prevent camera from flipping under
				minPolarAngle={0.2}
			/>
			{type === "players" && (
				<FootballPitch assets={<Team players={bestXI} />} />
			)}
			{type === "team" && <FootballPitch assets={<TeamZonesView />} />}
		</Canvas>
	);
}

export default PitchWithCanvas;
