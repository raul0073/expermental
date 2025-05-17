import {  UserConfigModel } from "@/lib/Types/PlayerConfig.Type";
import { ZonesConfig } from "@/lib/Types/Zones.Types";

export const setUserTeamService = async (slug: string) => {
    await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: { "Content-Type": "application/json" },
    });
};




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

