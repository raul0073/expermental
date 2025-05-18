"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LABELS_CONFIG } from "@/lib/Types/LABELS";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";

export interface StatKeyBadgeProps {
  id: string;
  label: string;
  category: string;
}

export function StatKeyBadge({ id, label, category }: StatKeyBadgeProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id, data: { key: id, category } });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <span ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Badge
        className="select-none whitespace-nowrap capitalize"
      >
        {label}
      </Badge>
    </span>
  );
}

export function StatsLabelsBank() {
  const statTypes = Object.keys(LABELS_CONFIG);
  const [activeType, setActiveType] = useState(statTypes[0]);

  return (
    <div className="border rounded p-4 w-full">
      <h3 className="text-lg font-semibold mb-2">Available Stats</h3>

      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList className="overflow-x-auto max-w-full flex-nowrap whitespace-nowrap">
          {statTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {statTypes.map((type) => (
          <TabsContent key={type} value={type} asChild>
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.entries(LABELS_CONFIG[type]).map(([key, lbl]) => (
                  <StatKeyBadge
                    key={key}
                    id={key}
                    label={lbl as string}
                    category={type}
                  />
                ))}
              </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
