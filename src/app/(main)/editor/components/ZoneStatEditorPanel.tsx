"use client";

import { LoadingSpinner } from "@/components/root/loading/Loading";
import { Zoneslabels } from "@/components/zones/zones.types";
import { RootState } from "@/lib/store";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RolesLabelsBank } from "./RolesLabelsBank";
import { ZoneScalerEditor } from "./ScalerEditor";
import { StatsLabelsBank } from "./StatsLabelsBank";
import ZoneEditorDndProvider from "./ZoneEditorProvider";
import ZoneEditorToolbar from "./ZoneEditorToolbar";
import { ZonePositionEditor } from "./ZonePositionEditor";
import { ZoneStatGroupEditor } from "./ZoneStatGroupEditor";

export function ZoneStatEditorPanel() {
	const zoneId = useSelector(
		(state: RootState) => state.zoneEditor.selectedZoneId
	);
	const zoneLabel = Zoneslabels.find((l) => l.id === zoneId)?.label;
	return (
		<ZoneEditorDndProvider>
			{zoneId ? (
				<Fragment>
					  <div className="flex-1 py-4 px-2">
						<header className="py-2">
							<h2 className="text-2xl font-bold">
								{zoneId ? zoneLabel : "ASd"}
							</h2>
							<p className="text-muted-foreground text-sm">
								Editing zone: <code>{zoneId}</code>
							</p>
						</header>

						<div className="space-y-4">
							<StatsLabelsBank />
							<RolesLabelsBank />
						</div>
						<div className="py-4">
							{zoneId && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="w-full grid grid-cols-2 gap-1">
										<ZoneStatGroupEditor
											title="Team Pros"
											zoneId={zoneId}
											type="pros"
											source="team"
										/>
										<ZoneStatGroupEditor
											title="VS Team Mistakes"
											zoneId={zoneId}
											type="pros"
											source="against"
										/>
									</div>
									<div className="w-full grid grid-cols-2 gap-1">
										<ZoneStatGroupEditor
											title="Own Team Mistakes"
											zoneId={zoneId}
											type="cons"
											source="team"
										/>
										<ZoneStatGroupEditor
											title="VS Team Pros"
											zoneId={zoneId}
											type="cons"
											source="against"
										/>
									</div>
									<ZonePositionEditor zoneId={zoneId} />
									<ZoneScalerEditor zoneId={zoneId} />
									<div className="col-span-2">
										<ZoneEditorToolbar />
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			) : (
				<LoadingSpinner />
			)}
		</ZoneEditorDndProvider>
	);
}
