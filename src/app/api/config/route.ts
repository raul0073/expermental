import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { slug } = await req.json();

	const response = NextResponse.json({ ok: true });
	response.cookies.set("user_team", slug, {
		httpOnly: false, // allow client JS access if needed
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
	return response;
}