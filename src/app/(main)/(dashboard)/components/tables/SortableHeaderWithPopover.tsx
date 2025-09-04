"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

type Props = {
  label: string;
  statKey: string;
  sortKey: string;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
  description: string;
  numeric?: boolean;
};

export default function SortableHeaderWithPopover({
  label,
  statKey,
  sortKey,
  sortDir,
  onSort,
  description,
  numeric = false,
}: Props) {
  const isActive = statKey === sortKey;
  const icon = isActive ? (sortDir === "asc" ? "▲" : "▼") : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <th
          onClick={() => onSort(statKey)}
          className={cn(
            "cursor-pointer select-none whitespace-nowrap",
            numeric && "text-right"
          )}
        >
          <div className="flex items-center gap-2">
            <span>{label} {icon}</span>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </th>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm">
        {description}
      </PopoverContent>
    </Popover>
  );
}
