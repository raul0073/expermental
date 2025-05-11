import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial } from "three";
import { FIELD, GEOMETRY } from "../config/pitchConfig";
import * as THREE from 'three'




export function PenaltyArc({
  side,
  useLineMaterial,
}: {
  side: "left" | "right";
  useLineMaterial: () => LineBasicMaterial;
}) {
  const isLeft = side === "left";

  const centerX = (isLeft ? -1 : 1) * (FIELD.HALF_LENGTH - GEOMETRY.PENALTY_SPOT_OFFSET);
  const centerZ = 0;

  const startAngle = isLeft ? -0.3 * Math.PI : 1.3 * Math.PI;
  const endAngle = isLeft ? 0.3 * Math.PI : 0.7 * Math.PI;

  const positions = useMemo(() => {
    const pts: number[] = [];

    for (let i = 0; i <= GEOMETRY.SEGMENTS; i++) {
      const t = i / GEOMETRY.SEGMENTS;
      const theta = startAngle + t * (endAngle - startAngle);

      const x = centerX + Math.cos(theta) * GEOMETRY.ARC_RADIUS;
      const z = centerZ + Math.sin(theta) * GEOMETRY.ARC_RADIUS;

      pts.push(x, FIELD.LINE_Y, z);
    }

    return new Float32Array(pts);
  }, [centerX, centerZ, startAngle, endAngle]);

  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return <primitive object={new THREE.Line(geometry, useLineMaterial())} />
}
