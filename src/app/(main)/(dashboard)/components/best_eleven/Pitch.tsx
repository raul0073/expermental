"use client";

import pitchBG from "@/../public/images/pitch.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { FormationType } from "../../utils/types";

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

interface PlayerPosition {
  x: number;
  y: number;
}

const FORMATION_POSITIONS: Record<FormationType, PlayerPosition[]> = {
  "433": [
    { x: 50, y: 95 }, // GK
    { x: 65, y: 75 }, // RCB
    { x: 35, y: 75 }, // LCB
    { x: 15, y: 70 }, // LB
    { x: 85, y: 70 }, // RB
    { x: 30, y: 45 }, // CM
    { x: 70, y: 45 }, // CM
    { x: 50, y: 60 }, // CM
    { x: 20, y: 25 }, // LW
    { x: 80, y: 25 }, // RW
    { x: 50, y: 15 }, // ST
  ],
  "4231": [
    { x: 50, y: 95 }, // GK
    { x: 65, y: 80 }, // RCB
    { x: 35, y: 80 }, // LCB
    { x: 15, y: 70 }, // LB
    { x: 85, y: 70 }, // RB
    { x: 30, y: 50 }, // CM
    { x: 70, y: 50 }, // CM
    { x: 50, y: 35 }, // AM
    { x: 20, y: 25 }, // LW
    { x: 80, y: 25 }, // RW
    { x: 50, y: 15 }, // ST
  ],
  "532": [
    { x: 50, y: 95 }, // GK
    { x: 25, y: 80 }, // LCB
    { x: 50, y: 80 }, // CB
    { x: 75, y: 80 }, // RCB
    { x: 10, y: 60 }, // LWB
    { x: 90, y: 60 }, // RWB
    { x: 35, y: 45 }, // LCM
    { x: 65, y: 45 }, // RCM
    { x: 50, y: 30 }, // CM
    { x: 35, y: 15 }, // ST
    { x: 65, y: 15 }, // ST
  ],
};



export const Pitch: React.FC<PitchProps> = ({ formation, players }) => {
  const positions = FORMATION_POSITIONS[formation];

  return (
    <div className="relative w-full h-full min-h-[670px]">
      {/* Pitch background */}
      <Image
        src={pitchBG}
        alt="Pitch Background"
        className="absolute left-0 top-0 w-full h-full object-cover md:object-fill aspect-square"
        priority
      />

      {/* Players */}
      {players.map((player, idx) => {
        const pos = positions[idx] || { x: 50, y: 50 };

        return (
          <div
            key={idx}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={String(player.profile_img)} alt={player.name} />
              <AvatarFallback>
                {player.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="mt-1 text-xs text-white/80 text-center">
              {player.name} 
          
            </div>
          </div>
        );
      })}
    </div>
  );
};
