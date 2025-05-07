import { APIRes } from "@/lib/Types/PlayerStats.Type";
import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL;


export async function GET(req: NextRequest) {
    const prefix = 'team-stats/player';
    try {
        // Extract query parameters from the request URL
        const url = new URL(req.url);
        const team = url.searchParams.get("team");
        const stats_type = url.searchParams.get("stats_type");
        const player_name = url.searchParams.get("player_name");

        if (!team || !stats_type || player_name === null) {
            return NextResponse.json({ error: "Missing required query parameters" },{ status: 400 });
        }

        // Construct the full URL for the API call
        const fullUrl = `${API_URL}/${prefix}?team=${team}&stats_type=${stats_type}&player_name=${player_name}`;

        // Fetch data from the API
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Application-type": "application/json", 
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const data: APIRes = await res.json();
        return NextResponse.json(data, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching team season stats:", error);
        return NextResponse.json({ error: "Something went wrong while fetching data" },
            { status: 500 }
        );
    }
}
