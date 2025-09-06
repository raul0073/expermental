"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableHead } from "@/components/ui/table";
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
  centered?: boolean;
  end?: boolean
};

export default function SortableHeaderWithPopover({
  label,
  statKey,
  sortKey,
  sortDir,
  onSort,
  description,
  centered,
  end,
  numeric = false,
}: Props) {
  const isActive = statKey === sortKey;
  const icon = isActive ? (sortDir === "asc" ? "▲" : "▼") : "";

  return (
    <Popover>
      <PopoverTrigger asChild className="w-fit">
        <TableHead
          onClick={() => onSort(statKey)}
          className={cn(
            "cursor-pointer select-none whitespace-nowrap",
            numeric && "text-left", centered && "text-center", end && "text-right"
          )}
        >
          <div className={cn("flex items-center gap-2", centered && "justify-center", end && "justify-end")}>
            <span>{label} {icon}</span>
            <Info className="w-3 h-3 text-muted-foreground" />
          </div>
        </TableHead>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm">
        {description}
      </PopoverContent>
    </Popover>
  );
}
