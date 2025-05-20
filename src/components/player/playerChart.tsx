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

export function PlayerStatsChart({
	player,
	chartType,
	statType,
}: {
	player: Player;
	chartType: "radar" | "pizza";
	statType: string;
}) {
	const dispatch = useDispatch();

	const chartImage = useSelector((state: RootState) =>
		state.charts?.[player.name]?.[chartType] ?? null
	);

	const [imageBase64, setImageBase64] = useState<string | null>(chartImage);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// If chart is already in Redux, skip fetching
		if (chartImage) {
			setImageBase64(chartImage);
			return;
		}

		async function getChart() {
			setLoading(true);
			setImageBase64(null);
			setError(null);

			try {
				const payload: ChartPayload | null = getChartPayload(player, chartType, statType);

				if (payload) {
					const res: ChartResponse = await fetchPlayerChart(payload);
					setImageBase64(res.image_base64);

					dispatch(setPlayerChart({
						player_name: player.name,
						chart_type: chartType,
						image: res.image_base64,
					}));
				}

			} catch (err) {
				console.error("Chart fetch failed:", err);
			} finally {
				setLoading(false);
			}
		}

		getChart();
	}, [player.name, chartType, statType, chartImage]);


	if (loading) return <LoadingSpinner message="loading chart..." />;
	if (error) return <p className="text-red-500 text-sm">{error}</p>;
	if (!imageBase64) return <p className="text-muted-foreground text-sm">No chart available.</p>;

	return (
		<div className="w-full flex justify-center items-center">
			<Image
				src={`data:image/png;base64,${imageBase64}`}
				alt={`${chartType} chart`}
				width={800}
				height={800}
				className="w-[500px] h-[500px] object-contain mx-auto"
			/>
		</div>
	);
}
