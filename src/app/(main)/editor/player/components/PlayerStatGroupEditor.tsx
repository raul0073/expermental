"use client";

import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { addStat, removeStat } from "@/lib/features/PlayerConfigEditorSlice";
import { RootState } from "@/lib/store";
import { Category, ScoreConfig } from "@/lib/Types/PlayerConfig.Type";
import { Trash2, ThumbsUp, ThumbsDown, Star } from "lucide-react";
const categoryIcon = {
  pros: <ThumbsUp  />, 
  cons: <ThumbsDown  />, 
  important: <Star  />,
};

export function PlayerStatGroupEditor({
  category,
}: {
  category: Category;
}) {
  const dispatch = useDispatch();
  const activeRole = useSelector((state: RootState) => state.playerEditor.activeRole)
  const group = useSelector((state: RootState) => {
    const roleGroup = state.playerEditor.draftConfig?.score_config?.[activeRole];
    return roleGroup?.[category as keyof typeof roleGroup] ?? {};
  });

  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${activeRole}-${category}`,
    data: {
       role: activeRole, category
    },
  });

  useDndMonitor({
    onDragEnd({ active, over }) {
      console.log("active", active);
      console.log("over", over);
      const from = active.data.current;
      const to = over?.data?.current;
  
      if (!over || !to || !from?.fromBank || !from.key || !from.statType) return;
  
      if (to.category === category && to.role === activeRole) {
        console.log("✅ VALID DROP");
        dispatch(
          addStat({
            role: activeRole,
            category,
            statType: from.statType,
            key: from.key,
          })
        );
      }
    },
  });

  const handleRemove = (statType: string, key: string) => {
    dispatch(
      removeStat({
        role: activeRole as keyof ScoreConfig,
        category,
        statType,
        key,
      })
    );
  };

  return (
    <section
      ref={setNodeRef}
      className={`relative border p-4 rounded-md bg-muted/40 transition-colors ${
        isOver ? "ring-2 ring-primary/50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">
          {category} ({activeRole})
        </h3>
        <span>{categoryIcon[category]} </span>
      </div>
      {Object.keys(group).length > 0 ? (
        Object.entries(group).map(([statType, keys]) => {
          const filtered = keys.filter((k) => typeof k === "string" && k.length > 0);
          if (filtered.length === 0) return null;

          return (
            <div key={statType} className="mb-3">
              <p className="text-xs font-bold mb-1 capitalize">{statType}</p>
              <div className="flex flex-wrap gap-2">
                {filtered.map((key) => (
                  <Badge key={key} className={`flex items-center gap-1 ${category === 'cons' && 'bg-red-400' }`}>
                    {key}
                    <Trash2
                      size={12}
                      className="cursor-pointer hover:text-destructive ml-1"
                      onClick={() => handleRemove(statType, key)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-muted-foreground text-xs italic">
          Drop stats here…
        </p>
      )}
    </section>
  );
}
