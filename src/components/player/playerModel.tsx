"use client";

import { Billboard, Text, useGLTF } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef } from "react";
import { Group } from "three";

export function PlayerModel({
	position,
	name,
	isSub = false,
	onClick,
}: {
	position: [number, number];
	shirt_number: number;
	name: string;
	rating: number;
	isSub?: boolean;
	onClick?: () => void;
}) {
	const ref = useRef<Group>(null);
	const gltf = useGLTF("/models/modelV1.glb");
	const {theme} = useTheme()
	useLayoutEffect(() => {
		if (gltf.scene) {
			gltf.scene.traverse((child) => {
				child.castShadow = true;
				child.receiveShadow = true;
			});
		}
	}, [gltf.scene]);

	const scale: [number, number, number] = isSub ? [1.8, 3.2, 1.2] : [2, 5, 3];
	const Y_OFFSET = 4.5;

	return (
		<group
			ref={ref}
			position={[position[0], Y_OFFSET, position[1]]}
			scale={scale}
			onClick={(e) => {
				e.stopPropagation();
				onClick?.();
			}}>
			<Billboard>
				<primitive object={gltf.scene.clone()} />
			</Billboard>

			<Billboard>
				<Text
					position={[0, 1.1, 0]}
					fontSize={0.2}
					color={`${theme === 'dark' ? 'yellow' : 'black'}`}
					fontWeight={`${isSub ? 'thin' : "bold"}`}
					anchorX="center"
					anchorY="bottom">
					{name}
				</Text>
			</Billboard>
		</group>
	);
}
