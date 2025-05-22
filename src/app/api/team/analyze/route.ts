import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
	const user_id = searchParams.get("user_id");
    const team_name = searchParams.get("team_name");

	if (!user_id) {
		return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
	}

	try {
		const res = await fetch(`${API_URL}/team/analyze?user_id=${user_id}&team_name=${team_name}`);
		if (!res.ok) throw new Error(`Failed to analyze ${team_name} with user ID: ${user_id}`);
		const data = await res.json();
		return NextResponse.json(data);
	} catch (err) {
		console.error("GET /api/team/analyze error:", err);
		return NextResponse.json({ error: "Failed to analyze team" }, { status: 500 });
	}

}