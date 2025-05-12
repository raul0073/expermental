import { TeamModel } from "@/lib/Types/Team.Type";
import { NextResponse } from "next/server";
const API_URL = process.env.API_URL;


export async function GET() {
  try {
    const res = await fetch(`${API_URL}/team/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data: TeamModel[] = await res.json();
    return NextResponse.json(data, {status: 200});
    //eslint-disable-next-line
  } catch (error: any) {
    console.error("[GET /teams]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
