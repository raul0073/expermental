"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateZoneConfigEntry } from "@/lib/features/ZoneEditorSlice";
import { RootState } from "@/lib/store";
import { LABELS_CONFIG } from "@/lib/Types/LABELS";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { StatDescriptionPopover } from "./PopoverDesc";
import { formatStatKey } from "@/lib/utils";

interface ZoneStatGroupEditorProps {
	zoneId: string;
	title: string;
	type: "pros" | "cons";
	source: "team" | "against";
}

export function ZoneStatGroupEditor({
	zoneId,
	title,
	type,
	source,
}: ZoneStatGroupEditorProps) {
	const dispatch = useDispatch();

	const data: Record<string, string[]> = useSelector(
		(state: RootState) =>
			state.zoneEditor.zones_config.zone_config?.[zoneId]?.[type]?.[source] ||
			{}
	);

	const zoneConfig = useSelector(
		(state: RootState) =>
			state.zoneEditor.zones_config.zone_config?.[zoneId] || {}
	);

	const droppableId = `${zoneId}-${type}-${source}`;
	const { setNodeRef, isOver } = useDroppable({ id: droppableId });

	// helper to clean undefined/empty
	const cleanKeys = (arr: unknown[]): string[] =>
		(arr || []).filter(
			(k): k is string => typeof k === "string" && k.length > 0
		);

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			if (event.over?.id !== droppableId) return;
			const { key, category } = (event.active.data.current || {}) as {
				key?: string;
				category?: string;
			};
			if (!key || !category) return;

			const current = cleanKeys(data[category]);
			if (current.includes(key)) return;
			const humanLabel = LABELS_CONFIG[category]?.[key];

			const updatedSource = {
				...data,
				[category]: [...current, humanLabel],
			};

			dispatch(
				updateZoneConfigEntry({
					zoneId,
					data: {
						[type]: {
							...zoneConfig[type],
							[source]: updatedSource,
						},
					},
				})
			);
		},
	});

	const handleRemove = (category: string, key: string) => {
		const filtered = cleanKeys(data[category]).filter((k) => k !== key);
		const newSource = {
			...data,
			[category]: filtered,
		};
		if (filtered.length === 0) delete newSource[category];

		dispatch(
			updateZoneConfigEntry({
				zoneId,
				data: {
					[type]: {
						...zoneConfig[type],
						[source]: newSource,
					},
				},
			})
		);
	};

	return (
		<section
			ref={setNodeRef}
			className={`relative border p-4 rounded-md bg-muted/40 transition-colors ${
				isOver ? "ring-2 ring-primary/50" : ""
			}`}>
			<div className="flex justify-between items-center">
				<h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">
					{title}
				</h3>
				<StatDescriptionPopover type={type} source={source} />
			</div>
			<ScrollArea className="h-48">
				{Object.entries(data).map(([category, keys]) => (
					<div key={category} className="mb-3">
						<p className="text-xs font-bold mb-1 capitalize">{category}</p>
						<div className="flex flex-wrap gap-2">
							{keys.map((key) => (
								<Badge key={key} className="flex items-center gap-1">
									{formatStatKey(key)}
									<Trash2
										size={12}
										className="cursor-pointer hover:text-destructive ml-1"
										onClick={() => handleRemove(category, key)}
									/>
								</Badge>
							))}
						</div>
					</div>
				))}
			</ScrollArea>

			{Object.keys(data).length === 0 && (
				<p className="text-muted-foreground text-xs italic h-full absolute left-1/2 -translate-x-1/2 top-1/2">
					Drop keys here
				</p>
			)}
		</section>
	);
}
