"use client";
import { useSelector } from "react-redux";
import { applyPreset, clearAll, clearZone, resetToInitial, savePreset } from "@/lib/features/ZoneEditorSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { saveZonesConfig } from "@/app/services/config.service";
import { toast } from "sonner";
import { useState } from "react";

export default function ZoneEditorToolbar() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false)
  const zone = useSelector((s: RootState) => s.zoneEditor);
  const userId = "anon_test_user_001"; 
  const zoneId = zone.selectedZoneId
  const presets = useSelector((s: RootState) => s.zoneEditor.presets);

  const handleSavePreset = () => {
    const name = prompt("Save preset as:");
    if (name && zoneId) {
      dispatch(savePreset({ name, zoneId }));
    }
  };

  const handleApplyPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    if (name && zoneId) {
      dispatch(applyPreset({ name, zoneId }));
    }
  };
  const handleSave = async () => {
   try {
    setLoading(true)
    const result = await saveZonesConfig(userId, zone.zones_config);
    if (result) {
      toast.success("Zones config updated.", {
        description: new Date().toLocaleDateString(),
      })
    } else {
      toast.error("Zone config failed to update.", {
        description: `${result}`,
       })
  };
   } catch (error) {
      console.error(error)
   } finally {
    setLoading(false)
   }
}
  if (!zoneId) return null;
  return (
    <div className="flex gap-3 border rounded p-6 bg-muted/40 justify-between">
     <div className="flex  items-center gap-6">
     <Button size="lg" onClick={handleSave} disabled={loading}>
        Save zone settings
      </Button>

      <Button size="lg" variant="secondary" onClick={() => dispatch(resetToInitial())} disabled={loading}>
        Reset zone settings (resets all to first load)
      </Button>
      <div className="flex items-center gap-4">
      <Button value={'outline'} onClick={handleSavePreset} className="">
        Save Preset
      </Button>
      <select
        className="text-sm px-4 py-3 border rounded"
        onChange={handleApplyPreset}
        defaultValue=""
      >
        <option value="" disabled>
           Apply Preset
        </option>
        {presets && Object.keys(presets).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
     </div>
    <div className="flex  items-center gap-6">
    <Button
        size="lg"
        variant="destructive"
        onClick={() => dispatch(clearZone({ zoneId }))} disabled={loading}>
        Clear This Zone settings
      </Button>
      <Button size="lg" variant="destructive" onClick={() => dispatch(clearAll())} disabled={loading}>
        Clear All 
      </Button>
    </div>
    </div>
  );
}
