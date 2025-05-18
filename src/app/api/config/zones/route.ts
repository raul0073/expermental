import { ZonesConfig } from "@/lib/Types/Zones.Types";
import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL


export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const user_id = searchParams.get("user_id");

	if (!user_id) {
		return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
	}

	try {
		const res = await fetch(`${API_URL}/user/config?user_id=${user_id}`);
		if (!res.ok) throw new Error("Failed to fetch user config");
		const data = await res.json();
		return NextResponse.json(data);
	} catch (err) {
		console.error("GET /api/user-config error:", err);
		return NextResponse.json({ error: "Failed to fetch user config" }, { status: 500 });
	}
}


export async function POST(req: NextRequest) {
	try {
		const body: {
			user_id: string,
			zones_config: ZonesConfig
		} = await req.json();
		const { user_id } = body;
		const zonesConfig = body.zones_config
		if (!user_id) {
			return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
		}
		const DTO = {
			user_id: user_id,
			zones_config: zonesConfig
		}
		console.log(DTO);
		const res = await fetch(`${API_URL}/user/zones-config`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(DTO),
		});

		if (!res.ok) throw new Error("Failed to save user config");

		return NextResponse.json({ status: "ok" });
	} catch (err) {
		console.error("POST user/config error:", err);
		return NextResponse.json({ error: "Failed to save user config" }, { status: 500 });
	}
}