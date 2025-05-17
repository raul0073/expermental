"use client";
import { ReactNode, useMemo } from "react";
import { LineBasicMaterial } from "three";
import { FIELD } from "./config/pitchConfig";
import GrassSurface from "./materials/Grass";
import { CenterCircle } from "./pitch-lines-and-goals/CenterCircle";
import { PenaltyArc } from "./pitch-lines-and-goals/PKD";
import { RectangleOutline } from "./pitch-lines-and-goals/RectangleOutline";
import { Goal } from "./pitch-lines-and-goals/Goals";

// Shared white line material
const useLineMaterial = () =>
	useMemo(
		() =>
			new LineBasicMaterial({
				color: "white",
				transparent: false,
				depthWrite: false,
			}),
		[]
	);

export default function FootballPitch({ children }: { children: ReactNode }) {
	return (
		<group>
			<mesh position={[0, -0.2, 0]}>
				<boxGeometry args={[120, 0.2, 68]} />
				<meshStandardMaterial color="darkGreen" />
			</mesh>
			{/* Grass base */}
			<GrassSurface />

			{/* Midline */}
			<RectangleOutline
				width={0.01}
				height={FIELD.WIDTH}
				center={[0, 0]}
				useLineMaterial={useLineMaterial}
			/>

			{/* Center circle */}
			<CenterCircle useLineMaterial={useLineMaterial} />

			{/* Penalty Areas */}
			<RectangleOutline
				width={16.5}
				height={40.3}
				center={[-52.5 + 16.5 / 2, 0]}
				useLineMaterial={useLineMaterial}
			/>
			<RectangleOutline
				width={16.5}
				height={40.3}
				center={[52.5 - 16.5 / 2, 0]}
				useLineMaterial={useLineMaterial}
			/>

			{/* Goal Areas */}
			<RectangleOutline
				width={5.5}
				height={18.32}
				center={[-52.5 + 5.5 / 2, 0]}
				useLineMaterial={useLineMaterial}
			/>
			<RectangleOutline
				width={5.5}
				height={18.32}
				center={[52.5 - 5.5 / 2, 0]}
				useLineMaterial={useLineMaterial}
			/>

			{/* Penalty spots */}
			<mesh position={[-52.5 + 11, FIELD.LINE_Y, 0]}>
				<cylinderGeometry args={[0.2, 0.2, 0.01, 24]} />
				<meshStandardMaterial color="#fff" />
			</mesh>
			<mesh position={[52.5 - 11, FIELD.LINE_Y, 0]}>
				<cylinderGeometry args={[0.2, 0.2, 0.01, 24]} />
				<meshStandardMaterial color="#fff" />
			</mesh>
			{/* Penalty "D"  */}
			<PenaltyArc side="left" useLineMaterial={useLineMaterial} />
			<PenaltyArc side="right" useLineMaterial={useLineMaterial} />
			{/* Goals */}
			<Goal side="right" />
			<Goal side="left" />
			{children}
		</group>
	);
}
