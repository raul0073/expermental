import { PlayersConfig } from "@/lib/Types/PlayerConfig.Type";
import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL

export async function POST(req: NextRequest) {
	try {
		const body: {
			user_id: string,
			players_config: PlayersConfig 
		} = await req.json();
		const { user_id } = body;

		if (!user_id) {
			return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
		}

		const res = await fetch(`${API_URL}/user/players-config`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		if (!res.ok) throw new Error("Failed to save user players config");

		return NextResponse.json({ status: "ok" });
	} catch (err) {
		console.error("POST user/players-config error:", err);
		return NextResponse.json({ error: "Failed to save user players config" }, { status: 500 });
	}
}