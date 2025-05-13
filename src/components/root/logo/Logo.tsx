import React from "react";
import ScraperSvgComp from "@/app/assets/svgs/ScraperSvgComp";
import clsx from "clsx";


const textSize: Record<LogoSize, string> = {
  small:  "text-2xl",  
  medium: "text-4xl",  
  big:    "text-6xl",  
};

const iconSize: Record<LogoSize, string> = {
  small:  "w-4 h-4",   
  medium: "w-6 h-6",  
  big:    "w-8 h-8",   
};

type LogoSize = "small" | "medium" | "big";

interface LogoProps {
  size?: LogoSize;        
  className?: string;    
}

function Logo({ size = "small", className }: LogoProps) {
  return (
    <div
      className={clsx(
        "logo font-default flex items-center gap-1", 
        textSize[size],
        className
      )}
    >
      <span className="font-thin tracking-tighter">experi</span>
      <span className="font-semibold tracking-tight">mental</span>

      <ScraperSvgComp
        className={clsx(
          iconSize[size],
          "inline mb-[8px] fill-emerald-700 stroke-black stroke-2"
        )}
      />
    </div>
  );
}

export default Logo;
