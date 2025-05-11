import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL;
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = `${API_URL}/team/init`
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error?.detail || "Failed to fetch team" }, { status: 500 });
    }

    const teamData = await res.json();
    return NextResponse.json(teamData);
    //eslint-disable-next-line
  } catch (err: any) {
    console.error("Team init failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
