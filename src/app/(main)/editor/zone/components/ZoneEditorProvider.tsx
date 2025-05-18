"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

export default function ZoneEditorDndProvider({
  children,
  onDragEnd,
}: {
  children: React.ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}
