import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { GOAL } from "./config/pitchConfig";

type GoalProps = {
	side: "left" | "right";
};

export function Goal({ side }: GoalProps) {
	const isLeft = side === "left";
	const postRadius = GOAL.POST_RADIUS
	const crossbarLength = GOAL.WIDTH
	const x = isLeft ? -52.5 - postRadius : 52.5 + postRadius;
	const goalPostMaterial = useMemo(
		() => new MeshStandardMaterial({ color: "#ffffff" }),
		[]
	);

	return (
		<group>
			{/* Vertical posts */}
			<mesh position={[x, 1.22, -crossbarLength / 2]}>
				<cylinderGeometry args={[postRadius, postRadius, 2.44, 16]} />
				<primitive object={goalPostMaterial} attach="material" />
			</mesh>
			<mesh position={[x, 1.22, crossbarLength / 2]}>
				<cylinderGeometry args={[postRadius, postRadius, 2.44, 16]} />
				<primitive object={goalPostMaterial} attach="material" />
			</mesh>

			{/* Crossbar */}
			<mesh rotation={[Math.PI / 2, 0, 0]} position={[x, 2.44, 0]}>
				<cylinderGeometry args={[postRadius, postRadius, 7.32, 16]} />
				<primitive object={goalPostMaterial} attach="material" />
			</mesh>

			{/* Net */}
		</group>
	);
}
