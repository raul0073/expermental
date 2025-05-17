"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRole } from "@/lib/features/PlayerConfigEditorSlice";
import type { RootState } from "@/lib/store";
import { ScoreConfig } from "@/lib/Types/PlayerConfig.Type";

const ROLES = ["GK", "DEF", "MID", "FWD"];

export function RoleSelector() {
  const dispatch = useDispatch();
  const activeRole = useSelector((state: RootState) => state.playerEditor.activeRole);

  return (
    <div className="w-full mx-auto relative border p-4 rounded-md bg-muted/40 grid grid-cols-4">
      {ROLES.map((role) => (
        <button
          key={role}
          onClick={() => dispatch(setActiveRole(role as  keyof ScoreConfig))}
          className={`px-3 py-1 text-sm rounded border font-medium transition ${
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