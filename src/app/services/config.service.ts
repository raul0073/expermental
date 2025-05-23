import {  PlayersConfig, UserConfigModel } from "@/lib/Types/PlayerConfig.Type";
import { ZonesConfig } from "@/lib/Types/Zones.Types";



export async function loadZoneEditorConfig(user_id: string): Promise<ZonesConfig | null> {
	try {
		const res = await fetch(`/api/config/zones?user_id=${user_id}`);
		if (!res.ok) throw new Error("Failed to fetch user config");
		const data = await res.json();
		return data?.zones_config || null;
	} catch (err) {
		console.error("fetchUserConfig error:", err);
		return null;
	}
}
export async function loadPlayerEditorConfig(user_id: string): Promise<UserConfigModel | null> {
	try {
		const res = await fetch(`/api/config/zones?user_id=${user_id}`);
		if (!res.ok) throw new Error("Failed to fetch user config");
		const data = await res.json();
		return data || null;
	} catch (err) {
		console.error("fetchUserConfig error:", err);
		return null;
	}
}

/**
 * PUT the full zones_config object to the server for this user.
 * Returns true if the request succeeded (status 2xx).
 */
export async function saveZonesConfig(
  userId: string,
  zones_config: ZonesConfig
): Promise<boolean> {
  try {
    const res = await fetch("/api/config/zones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        zones_config: zones_config
      }),
    });
    const data = await res.json();
    return data
  } catch (err) {
    console.error("saveZonesConfig error:", err);
    return false;
  }
}
export async function savePlayersConfig(
  userId: string,
  players_config: PlayersConfig
): Promise<boolean> {
  try {
    const res = await fetch("/api/config/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        players_config: players_config
      }),
    });
    const data = await res.json();
    return data
  } catch (err) {
    console.error("saveZonesConfig error:", err);
    return false;
  }
}

