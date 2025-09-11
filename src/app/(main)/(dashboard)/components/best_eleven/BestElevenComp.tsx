"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BestElevenResponse } from "../../utils/types";
import { FormationPlayer, Pitch } from "./Pitch";

interface BestXIProps {
  data: BestElevenResponse;
  className?: string;
}

export const BestXIMentalFormation: React.FC<BestXIProps> = ({ data, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!data?.top_formations?.length) return <div>No formations available</div>;

  const selectedFormation = data.top_formations[selectedIndex].formation;
  const bestEleven: FormationPlayer[] = data.top_formations[selectedIndex].best_eleven.map((p, idx) => ({
    ...p,
    number: idx + 1,
    profile_img: p.profile_img || "NA",
    onClick: () => alert(`${p.name} clicked`),
  }));

  return (
    <Card className={cn("w-full h-full", className)}>
        <CardHeader>
        <CardTitle>
            Best Mentality XI
        </CardTitle>
        <CardDescription>
            {`Top players ranked by Mental Score.`} <br /> <span>Selected top 3 combinations</span>
        </CardDescription>

        <Select value={selectedIndex.toString()} onValueChange={(val) => setSelectedIndex(Number(val))}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select Formation" />
          </SelectTrigger>
          <SelectContent>
            {data.top_formations.map((d, i) => (
              <SelectItem key={i} value={i.toString()}>
                {d.formation} | Score: {d.score.toFixed(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="w-full h-fit p-0 relative">
        <Pitch formation={selectedFormation} players={bestEleven} />
      </CardContent>
    </Card>
  );
};
