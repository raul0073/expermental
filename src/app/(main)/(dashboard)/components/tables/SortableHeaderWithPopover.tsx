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
      <TableHead
        onClick={() => onSort(statKey)}
        className={cn(
          "cursor-pointer select-none whitespace-nowrap",
          numeric && "text-left", centered && "text-center", end && "text-right"
        )}
      >
        <span>{label} {icon} <PopoverTableHead description={description} /></span>
      </TableHead>

  );
}





export const PopoverTableHead = ({ description }: { description: string }) => {

  return (
    <Popover>
      <PopoverTrigger asChild className="w-fit inline items-center">


        <Info className="w-3 h-3 text-muted-foreground" />

      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm">
        {description}
      </PopoverContent>
    </Popover>
  )
}