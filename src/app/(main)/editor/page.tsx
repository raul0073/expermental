"use client";

import { loadZoneEditorConfig } from "@/app/services/config.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ZoneStatEditorPanel } from "./components/ZoneStatEditorPanel";
import {  setSelectedZoneId, setUserZoneConfig } from "@/lib/features/ZoneEditorSlice";
import { Zoneslabels } from "@/components/zones/zones.types";

export default function ZoneEditorPage() {
  const dispatch = useDispatch()

  async function loadUserConfig(){
    try {
      const user_id = "anon_test_user_001"; 
      const data = await loadZoneEditorConfig(user_id);
        if(data){
          dispatch(setUserZoneConfig(data))
        dispatch(setSelectedZoneId(Zoneslabels[0].id))
        }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
		loadUserConfig()
	}, [dispatch]);
  return (
    
    <div className="flex h-full">
      <div className="flex-1 p-2">
        <ZoneStatEditorPanel />
      </div>
    </div>

  );
}