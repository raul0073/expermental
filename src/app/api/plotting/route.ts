import { ChartPayload } from "@/lib/Types/Plots.Type";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const API_URL = process.env.API_URL
export async function POST(req: NextRequest) {
	try {
		const payload: ChartPayload = await req.json();
		console.log(payload);
		console.log(payload);
		const response = await fetch(`${API_URL}/test/test-pizza`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const error = await response.json();
			return NextResponse.json({ error }, { status: response.status });
		}

		const result = await response.json();
		return NextResponse.json(result);
	} catch (err) {
		console.error("Chart route error:", err);
		return NextResponse.json({ error: "Failed to process chart request" }, { status: 500 });
	}
}
