"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRole } from "@/lib/features/PlayerConfigEditorSlice";
import type { RootState } from "@/lib/store";
import { ScoreConfig } from "@/lib/Types/PlayerConfig.Type";
import { useSidebar } from "@/components/ui/sidebar";

const ROLES = ["GK", "DEF", "MID", "FWD"];

export function RoleSelector() {
  const dispatch = useDispatch();
  const activeRole = useSelector((state: RootState) => state.playerEditor.activeRole);
  const {open} = useSidebar()
  return (
    <div className={`w-full mx-auto relative border p-4 rounded-md bg-muted/40 grid  ${open ? 'grid-cols-1 mt-12' : 'grid-cols-4'}`}>
      {ROLES.map((role) => (
        <button
          key={role}
          onClick={() => dispatch(setActiveRole(role as  keyof ScoreConfig))}
          className={`px-3  text-sm rounded border font-medium transition ${open ? 'py-4' : 'py-1'} ${
            role === activeRole
              ? " dark:bg-amber-800 bg-emerald-600"
              : "bg-background text-foreground border-muted"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}