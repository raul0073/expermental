"use client";

import { Button } from "@/components/ui/button";
import { Zoneslabels } from "@/components/zones/zones.types";
import { setSelectedZoneId } from "@/lib/features/ZoneEditorSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

export function ZoneEditorSidebar() {
	const selected = useSelector(
		(state: RootState) => state.zoneEditor.selectedZoneId
	);
	const dispatch = useDispatch();
	return (
        
		<div className="space-y-2">
            <div className="mt-12 px-2">
			{/* Header */}
			<div className="info mt-2 mb-4 text-sm space-y-1">
				<div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-bold mb-2 text-primary">{"All Pitch Zones"}</h2>
                </div>
			</div>
            </div>
			{Object.entries(Zoneslabels).map(([id, zone]) => (
				<Button
					key={id}
                    variant="secondary"
					onClick={() => dispatch(setSelectedZoneId(zone.id))}
					className={`block w-full text-left px-4 py-2 rounded ${
						selected === zone.id
							&& "bg-primary font-semibold"
					}`}>
					{zone.label}
				</Button>
			))}
		</div>
	);
}
