"use client";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GOAL } from "../config/pitchConfig";

type GoalProps = {
	side: "left" | "right";
};

export function Goal({ side }: GoalProps) {
	const isLeft = side === "left";
	const x = isLeft ? -55 - GOAL.POST_RADIUS : 55 + GOAL.POST_RADIUS;

	const { scene } = useGLTF("/models/goal_post.glb");

	const goalModel = useMemo(() => {
		const clone = scene.clone();
		clone.scale.set(3, 3, 3); 
		clone.position.set(x, 0, 0);
		clone.rotation.y =  Math.PI / 2
		if (!isLeft) clone.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
		return clone;
	}, [scene, x, isLeft]);

	return <primitive object={goalModel} />;
}