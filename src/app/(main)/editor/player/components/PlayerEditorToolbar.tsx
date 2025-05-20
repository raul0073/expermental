"use client";

import { savePlayersConfig } from "@/app/services/config.service";
import { Button } from "@/components/ui/button";
import {
  markSaved,
  setDraft,
} from "@/lib/features/PlayerConfigEditorSlice";
import { RootState } from "@/lib/store";
import { ScoreConfig } from "@/lib/Types/PlayerConfig.Type";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function PlayerEditorToolbar({activeRole}: { activeRole: keyof ScoreConfig}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { draftConfig } = useSelector((state: RootState) => state.playerEditor);
  const initialDraft = useSelector((state: RootState) => state.playerEditor.initial_config);
  const userId = useSelector((state: RootState) => state.userConfig.userId);
  const handleSave = async () => {
    try {
      setLoading(true);
      if(userId){
        const res = await savePlayersConfig(userId, draftConfig)
        console.log("Saving player config:", res);
        toast.success(`Player config for ${activeRole} saved.`, {
          description: new Date().toLocaleTimeString(),
        });
        dispatch(markSaved());
      }
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to save player config.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(setDraft(initialDraft));
  };

  const handleClear = () => {
    const emptyRoleConfig = { pros: {}, cons: {}, important: {} };
  
    dispatch(setDraft({
      ...draftConfig,
      score_config: {
        ...draftConfig.score_config,
        [activeRole]: emptyRoleConfig
      },
      score_weights: draftConfig.score_weights // keep existing weights
    }));
  };

  return (
    <div className="flex gap-3 border rounded p-6 bg-muted/40 justify-between">
      <div className="flex items-center gap-6">
        <Button size="lg" onClick={handleSave} disabled={true}>
          Save player config
        </Button>
        <Button size="lg" variant="secondary" onClick={handleReset} disabled={loading}>
          Reset config to initial
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <Button size="lg" variant="destructive" onClick={handleClear} disabled={loading}>
          Clear all
        </Button>
      </div>
    </div>
  );
}

export default PlayerEditorToolbar;
