"use client";

import { fetchPlayerChart } from "@/app/services/plotting.service";
import { ChartPayload, ChartResponse } from "@/lib/Types/Plots.Type";
import { getChartPayload } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../root/loading/Loading";
import { Player } from "./player.types";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerChart } from "@/lib/features/ChartsSlice";
import { RootState } from "@/lib/store";

export function PlayerStatsChart({ player }: { player: Player }) {
	const dispatch = useDispatch();

	const charts = useSelector((state: RootState) => state.charts?.[player.name] ?? {});
	const [radarChart, setRadarChart] = useState<string | null>(charts.radar ?? null);
	const [pizzaChart, setPizzaChart] = useState<string | null>(charts.pizza ?? null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const hasBothCharts = radarChart && pizzaChart;
		if (hasBothCharts) return;

		async function fetchCharts() {
			setLoading(true);
			setError(null);

			try {
				const payload: ChartPayload | null = getChartPayload(player);
				console.log(`COMPONENT PAYLOAD: ${payload}`);
				if (!payload) return;

				const res: ChartResponse = await fetchPlayerChart(payload);

				dispatch(setPlayerChart({
					player_name: player.name,
					chart_type: "radar",
					image: res.radar_chart,
				}));
				dispatch(setPlayerChart({
					player_name: player.name,
					chart_type: "pizza",
					image: res.pizza_chart,
				}));

				setRadarChart(res.radar_chart);
				setPizzaChart(res.pizza_chart);

			} catch (err) {
				console.error("Chart fetch failed:", err);
				setError("Failed to load charts.");
			} finally {
				setLoading(false);
			}
		}

		fetchCharts();
	}, [player.name, radarChart, pizzaChart, dispatch]);

	if (loading) return <LoadingSpinner message="loading charts..." />;
	if (error) return <p className="text-red-500 text-sm">{error}</p>;
	if (!radarChart && !pizzaChart)
		return <p className="text-muted-foreground text-sm">No charts available.</p>;

	return (
		<div className="flex flex-col justify-center items-center gap-8">
			{pizzaChart && (
				<Image
					src={`data:image/png;base64,${pizzaChart}`}
					alt={`${player.name} Pizza Chart`}
					width={400}
					height={400}
					className="w-fit h-fit object-contain"
				/>
			)}
			{radarChart && (
				<Image
					src={`data:image/png;base64,${radarChart}`}
					alt={`${player.name} Radar Chart`}
					width={400}
					height={400}
					className="w-fit h-fit object-contain"
				/>
			)}
		</div>
	);
}
