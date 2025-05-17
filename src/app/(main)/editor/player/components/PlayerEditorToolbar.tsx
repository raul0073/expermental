"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import {
  markSaved,
  setDraft,
} from "@/lib/features/PlayerConfigEditorSlice";
import { PlayersConfig } from "@/lib/Types/PlayerConfig.Type";
import { toast } from "sonner";

function PlayerEditorToolbar() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { draftConfig, dirty } = useSelector((state: RootState) => state.playerEditor);
  const initialDraft = useSelector((state: RootState) => state.playerEditor.initial_config);

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: replace this with actual save logic/API call
      console.log("Saving player config:", draftConfig);
      toast.success("Player config saved.", {
        description: new Date().toLocaleTimeString(),
      });
      dispatch(markSaved());
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
    const emptyDraft: PlayersConfig = {
      score_config: {
        GK: { pros: {}, cons: {}, important: {} },
        DEF: { pros: {}, cons: {}, important: {} },
        MID: { pros: {}, cons: {}, important: {} },
        FWD: { pros: {}, cons: {}, important: {} },
      },
      score_weights: { pros: 1, cons: -1, important: 2 },
    };
    dispatch(setDraft(emptyDraft));
  };

  return (
    <div className="flex gap-3 border rounded p-6 bg-muted/40 justify-between">
      <div className="flex items-center gap-6">
        <Button size="lg" onClick={handleSave} disabled={loading || !dirty}>
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
