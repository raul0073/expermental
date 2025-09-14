"use client";

import { useTheme } from "next-themes";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type MentalCircleProps = {
  value: number; // 0-100
};

export default function MentalCircle({ value }: MentalCircleProps) {
  // interpolate color between red -> yellow -> green
const getColor = (val: number) => {
  // clamp 0–100
  const value = Math.max(0, Math.min(100, val));
  // map 0–100 → 0–120 hue (red → yellow → green)
  const hue = (value / 100) * 120;
  return `hsl(${hue}, 100%, 45%)`;
};
const { theme } = useTheme();
  return (
    <div className="m-rating wrapper flex justify-center items-center">
        <div className="w-10 h-10 flex justify-center">
    <CircularProgressbar
  value={value}
  text={`${value}`}
  styles={buildStyles({
    pathColor: getColor(value),
    trailColor: theme === "dark" ? "#374151" : "#e5e7eb", 
    textColor: theme === "dark" ? "#f5f5f4" : "#27272a",  
    textSize: "31px",
  })}
/>
    </div>
    </div>
  );
}
