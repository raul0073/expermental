"use client";
import { ZoneState } from "@/lib/features/SelectedZoneSlice";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export function ZoneSidebar({ selectedZone }: { selectedZone: ZoneState }) {
  const { toggleSidebar } = useSidebar();
  const zone = selectedZone.selected;
  if (!zone) return null;
  
  return (
    <div className="mt-12 px-2">
    <div className="info mt-2 mb-4 text-sm space-y-1">
      <Button
			data-sidebar="trigger"
			variant="outline"
			size="icon"
			className={'text-white float-right'}
			onClick={()=>toggleSidebar()}
			>
			<X className="text-foreground" />
		</Button>
    </div>
      <h2 className="text-xl font-bold mb-4 text-primary">
        {zone.label}
      </h2>

      <div className="space-y-2">
        <p><strong>Rating:</strong> {zone.rating}</p>

        {zone.team && Object.entries(zone.team)
          .slice(0, 5) // Display top 5 metrics
          .map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {Number(value).toFixed(2)}
            </p>
        ))}

        {zone.players?.length > 0 && (
          <div>
            <p className="mt-4 font-semibold">Contributing Players:</p>
            <ul className="list-disc pl-5">
              {zone.players.map((p, i) => (
                <li key={i}>{p.name} ({p.role})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
