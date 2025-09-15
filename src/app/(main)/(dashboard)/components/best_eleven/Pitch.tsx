"use client";

import pitchBG from "@/../public/images/pitch.png";
import { StaticImageData } from "next/image";
import React, { useEffect, useRef } from "react";
import { FormationType } from "../../utils/types";
import { FORMATION_POSITIONS } from "./utils";

export interface FormationPlayer {
  name: string;
  number: number;
  role: string;
  profile_img: string | StaticImageData;
}




interface PitchProps {
  formation: FormationType;
  players: FormationPlayer[];
}


export const Pitch: React.FC<PitchProps> = ({ formation, players }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pitchImg = document.createElement("img")
    pitchImg.src = pitchBG.src;

    // Preload all player images
    const playerImages: HTMLImageElement[] = players.map((p) => {
      const playerImg = document.createElement("img")
      playerImg.src = p.profile_img as string;
      return playerImg;
    });

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      draw();
    };

    const draw = () => {
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      // Draw pitch background
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(pitchImg, 0, 0, width, height);

      const positions = FORMATION_POSITIONS[formation] || [];

      // Draw players
      players.forEach((player, idx) => {
        const pos = positions[idx] || { x: 50, y: 50 };
        const x = (pos.x / 100) * canvas.width;
        const y = (pos.y / 100) * canvas.height;
        const radius = 20;

        const img = playerImages[idx];

        // Draw shadow first (outside clipped circle)
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,0,0,0.65)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "white"; // fill is needed to actually render the shadow
        ctx.fill();
        ctx.restore();

        // Draw avatar clipped inside circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        if (img.complete) {
          ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
        } else {
          img.onload = () => ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
        }
        ctx.restore();

        // Draw name below
        const parts = String(player.name || "").trim().split(/\s+/).filter(Boolean);
        const firstName = parts[0] || "";
        const rest = parts.length > 1 ? parts.slice(1).join(" ") : "";
        const displayName = parts.length > 1 ? `${firstName[0]}. ${rest}` : firstName;

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(displayName, x, y + radius + 4);
      });
    };

    pitchImg.onload = () => resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [formation, players]);

  return (
    <div ref={containerRef} className="relative w-full h-[670px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Pitch;
