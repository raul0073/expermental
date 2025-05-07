import { ZoneModel } from "./ZoneModel";
import { verticalChannelZones } from "./zones.types";

export function TeamZonesView() {
  return (
    <>
    {verticalChannelZones.map(zone => (
      <ZoneModel key={zone.id} zone={zone} />
    ))}
  </>
  );
}
