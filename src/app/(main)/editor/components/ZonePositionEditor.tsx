"use client";

import React from "react";
import { useDroppable, useDndMonitor, DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { updateZonePosition } from "@/lib/features/ZoneEditorSlice";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ZonePositionEditorProps {
  zoneId: string;
  title?: string;
}

export function ZonePositionEditor({ zoneId, title = "Positions" }: ZonePositionEditorProps) {
  const dispatch = useDispatch();

  const positions = useSelector((state: RootState) =>
    state.zoneEditor.zones_config.zone_config?.[zoneId]?.positions || {}
  );

  const droppableId = `${zoneId}-roles`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  // ─── Drag end logic ────────────────────────────────────────────────
  useDndMonitor({
    onDragEnd: (evt: DragEndEvent) => {
      if (evt.over?.id !== droppableId) return;
      const { role } = (evt.active.data.current || {}) as { role?: string };
      if (!role || positions.hasOwnProperty(role)) return;
      dispatch(updateZonePosition({ zoneId, role, weight: 0.1 }));
    },
  });

  // ─── Helpers ───────────────────────────────────────────────────────
  const handleRemove = (role: string) => {
    dispatch(updateZonePosition({ zoneId, role, weight: undefined }));
  };

  const handleWeightChange = (role: string, weight: number) => {
    dispatch(updateZonePosition({ zoneId, role, weight }));
  };

  // ─── Determine top weights ─────────────────────────────────────────
  const sortedRoles = Object.entries(positions)
    .sort(([, a], [, b]) => (b || 0) - (a || 0))
    .map(([role]) => role);

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <section
      ref={setNodeRef}
      className={`border p-4 rounded-md bg-muted/40 transition-colors ${
        isOver ? "ring-2 ring-primary/50" : ""
      }`}
    >
      <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">
        {title}
      </h3>

      {Object.keys(positions).length === 0 && (
        <p className="text-muted-foreground text-xs italic">Drop roles here</p>
      )}

      <ScrollArea className="h-18">
        <div className="flex flex-col gap-3">
          {Object.entries(positions).map(([role, weight]) => {
            const rank = sortedRoles.indexOf(role);
            let bgClass = "bg-muted";
            if (rank === 0) bgClass = "bg-green-400";
            else if (rank === 1) bgClass = "bg-green-600";
            else if (rank === 2) bgClass = "bg-gray-300";
            else if (rank >= 3) bgClass = "bg-gray-500";

            return (
              <div
                key={role}
                className={`flex items-center gap-2 rounded px-2 py-1 `}
              >
                <Badge className={`uppercase px-2 py-1 text-sm shrink-0  ${bgClass}`}>{role}</Badge>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  value={weight as number}
                  onChange={(e) => handleWeightChange(role, Number(e.target.value))}
                />
                <span className="w-10 text-xs text-right">{Number(weight).toFixed(2)}</span>

                <Trash2
                  size={14}
                  className="cursor-pointer hover:text-destructive ml-1"
                  onClick={() => handleRemove(role)}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
