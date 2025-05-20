import { ChartPayload, ChartResponse } from "@/lib/Types/Plots.Type";

export async function fetchPlayerChart(
	payload: ChartPayload
): Promise<ChartResponse> {
	const res = await fetch("/api/plotting", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const err = await res.json();
		throw new Error(err?.detail || "Failed to fetch chart");
	}

	return await res.json();
}