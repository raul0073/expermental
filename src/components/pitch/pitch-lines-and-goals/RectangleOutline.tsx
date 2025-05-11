
import { useMemo } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial
} from "three";
import { FIELD } from "../config/pitchConfig";
export function RectangleOutline({
	width,
	height,
	center,
  useLineMaterial
}: {
	width: number;
	height: number;
	center: [number, number];
  useLineMaterial: ()=> LineBasicMaterial
}) {
	const material = useLineMaterial();
	const points = useMemo(() => {
		const [cx, cz] = center;
		const hw = width / 2;
		const hh = height / 2;
		return [
			[cx - hw, cz - hh],
			[cx + hw, cz - hh],
			[cx + hw, cz + hh],
			[cx - hw, cz + hh],
			[cx - hw, cz - hh],
		].flatMap(([x, z]) => [x, FIELD.LINE_Y, z]);
	}, [width, height, center]);

	const geometry = useMemo(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new Float32BufferAttribute(points, 3));
		return g;
	}, [points]);

	return <lineLoop geometry={geometry} material={material} />;
}