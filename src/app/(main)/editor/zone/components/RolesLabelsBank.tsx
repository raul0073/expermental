"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ROLE_POSITIONS } from "@/lib/Types/Formation.Type";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function RoleBadge({ code }: { code: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: code, data: { role: code } });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <span ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Badge variant="secondary" className="select-none uppercase">
        {code}
      </Badge>
    </span>
  );
}

export function RolesLabelsBank() {
  const roleCodes = Object.keys(ROLE_POSITIONS);

  return (
    <div className="border rounded p-4 w-full">
      <h3 className="text-lg mb-2">Available Roles</h3>
      <div className="flex flex-wrap gap-2">
        {roleCodes.map((code) => (
          <RoleBadge key={code} code={code} />
        ))}
      </div>
    </div>
  );
}
