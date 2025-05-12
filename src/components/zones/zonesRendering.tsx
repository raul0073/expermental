import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { ZoneModel } from "./ZoneModel";
import { verticalChannelZones } from "./zones.types";
import { ZoneRatingLegend3D } from "./ZonesLegend";

export function TeamZonesView({ teamName }: { teamName: string }) {
  
	const team = useSelector((state: RootState) => state.team[teamName]);
	const zonesData = team?.zones;

	if (!zonesData) return null;
  
	const maxRating = Math.max(
		...Object.values(zonesData).map((z) => z.rating || 0)
	);
	return (
		<>
			{verticalChannelZones.map((geo) => {
				const data = zonesData[geo.id];
				if (!data) return null;

				return (
					<ZoneModel
						key={geo.id}
						zone={{
							...geo, // contains: id, label, position, length, width
							...data, // contains: rating, team, players
						}}
						maxRating={maxRating}
					/>
				);
			})}
			<ZoneRatingLegend3D maxRating={maxRating} />
		</>
	);
}
