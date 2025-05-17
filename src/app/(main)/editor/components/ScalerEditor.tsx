"use client";

import { Badge } from "@/components/ui/badge";
import { updateScaler } from "@/lib/features/ZoneEditorSlice";
import { RootState } from "@/lib/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ZoneScalerEditorProps {
  zoneId: string;
  title?: string;
}

export function ZoneScalerEditor({ zoneId, title = "Scalers" }: ZoneScalerEditorProps) {
  const dispatch = useDispatch();

  const zone = useSelector((state: RootState) =>
    state.zoneEditor.zones_config.zone_config?.[zoneId] || {}
  );
  const scalers = useSelector((state: RootState) =>
    state.zoneEditor.zones_config.zone_scalers?.[zoneId] || {}
  );

  // collect live metric keys from pros / cons only
  const liveKeys = useMemo(() => {
    if (!zone) return [] as string[];
    const keys = new Set<string>();
    const collect = (branch?: Record<string, string[]>) => {
      if (!branch) return;
      Object.values(branch).forEach((arr) => arr.forEach((k) => keys.add(k)));
    };
    collect(zone.pros?.team);
    collect(zone.pros?.against);
    collect(zone.cons?.team);
    collect(zone.cons?.against);
    return Array.from(keys);
  }, [zone]);

  // merge default 0.2 + filter out stale keys
  const mergedScalers = useMemo(() => {
    const base: Record<string, number> = {};
    liveKeys.forEach((k) => {
      base[k] = scalers[k] ?? 0.2;
    });
    return base;
  }, [scalers, liveKeys]);

  const handleChange = (key: string, value: number) => {
    dispatch(updateScaler({ zoneId, key, value }));
    console.log(zoneId, key, value);
  };
  useEffect(() => {
    liveKeys.forEach((key) => {
      if (scalers[key] === undefined) {
        dispatch(updateScaler({ zoneId, key, value: 0.2 }));
      }
    });
  }, [liveKeys.join("|"), zoneId, scalers, dispatch, liveKeys]);
  return (
    <section className="border p-4 rounded-md bg-muted/40">
      <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">
        {title}
      </h3>

      {liveKeys.length === 0 && (
        <p className="text-muted-foreground text-xs italic">No metrics</p>
      )}

      <div className="flex flex-col gap-1">
        {liveKeys.map((key) => (
          <div key={key} className="flex items-center gap-2 bg-muted rounded px-2 py-1">
            <Badge className="capitalize px-2 py-1 text-xs">
              {key.replace(/_/g, " ")}
            </Badge>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              value={mergedScalers[key]}
              onChange={(e) => handleChange(key, Number(e.target.value))}
            />
            <span className="w-10 text-xs text-right">{mergedScalers[key].toFixed(1)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
