"use client";
import { ZoneState } from "@/lib/features/SelectedZoneSlice";
export function ZoneSidebar({ selectedZone }: { selectedZone: ZoneState }) {
	return (
	
      <div className="mt-12 px-2">

		
			{selectedZone && (
				<div className="">
					<h2 className="text-xl font-bold mb-4 text-primary">
						{selectedZone.selected?.label}
					</h2>
					<div className="space-y-2">
						{/* Replace with real data later */}
						<p>
							<strong>Possession:</strong> 62%
						</p>
						<p>
							<strong>Entries:</strong> 15
						</p>
						<p>
							<strong>Shots Created:</strong> 3
						</p>
						<p>
							<strong>Recoveries:</strong> 4
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
