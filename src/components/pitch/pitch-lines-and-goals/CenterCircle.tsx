"use client";
import * as THREE from 'three'
import { useMemo } from "react";
import {
	BufferGeometry,
	Float32BufferAttribute,
	LineBasicMaterial,
} from "three";
import { FIELD, GEOMETRY } from "../config/pitchConfig";
// ⚪ Center circle
export function CenterCircle({
	useLineMaterial,
}: {
	useLineMaterial: () => LineBasicMaterial;
}) {
	const material = useLineMaterial();

	const points = useMemo(() => {
		const radius = GEOMETRY.CENTER_CIRCLE_RADIUS;
		const segments = GEOMETRY.SEGMENTS;
		const angleStep = (Math.PI * 2) / segments;
		const p = [];

		for (let i = 0; i <= segments; i++) {
			const angle = i * angleStep;
			const x = Math.cos(angle) * radius;
			const z = Math.sin(angle) * radius;
			p.push(x, FIELD.LINE_Y, z);
		}
		return p;
	}, []);

	const geometry = useMemo(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new Float32BufferAttribute(points, 3));
		return g;
	}, [points]);
	return <primitive object={new THREE.Line(geometry, material)} />
}
