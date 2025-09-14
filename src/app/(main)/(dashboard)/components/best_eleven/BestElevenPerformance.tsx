"use client";

import ScatterSkeleton from "@/components/root/skeletons/ScatterSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BestElevenResponse } from "../../utils/types";
import { FormationPlayer, Pitch } from "./Pitch";

interface BestXIProps {
  data: BestElevenResponse | undefined;
  className?: string;
}

export const BestXIPerformanceFormation: React.FC<BestXIProps> = ({ data, className }) => {
   if(!data) return <ScatterSkeleton />
  if (!data?.best_performing_eleven?.best_eleven) return <div>No formations available</div>;

  const selectedFormation = data.best_performing_eleven.formation;
  const bestEleven: FormationPlayer[] = data.best_performing_eleven.best_eleven.map((p, idx) => ({
    ...p,
    number: idx + 1,
    profile_img: p.profile_img || "NA",
    onClick: () => alert(`${p.name} clicked`),
  }));

  return (
    <Card className={cn("w-full h-full", className)}>
      <CardHeader>
        <CardTitle>
            Best Performing XI
        </CardTitle>
        <CardDescription>
            {`Players ranked by Performance Index, highlighting their effectiveness and impact during matches.`}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full h-fit p-0 relative">
        <Pitch formation={selectedFormation} players={bestEleven} />
      </CardContent>
    </Card>
  );
};
