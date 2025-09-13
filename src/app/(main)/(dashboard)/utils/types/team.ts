import { StaticImageData } from "next/image";
import { TeamDefaultChartData } from "../types";
export type TeamPlottingResponse = {
    default: TeamDefaultChartData;
    heatmap: HeatmapPlottingResponse
};

export type HeatmapPlottingResponse = {
        attacking: string | StaticImageData ,
        defending: string | StaticImageData 
    }