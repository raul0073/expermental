import { filterStatsForDisplay } from "../utils";
import { PlayerStat } from "./Team.Type";

export const STAT_KEYS_CONFIG: Record<
  "pizza" | "radar",
  Record<"GK" | "DF" | "MF" | "FW", {
    categories: Record<string, string[]>;
  }>
> = {
  pizza: {
    GK: {
      categories: {
        general: [
          "Clean Sheet Percentage",
          "Wins",
          "Ball Recoveries"
        ],
        shot_stopping: [
          "adv_Post-Shot Expected Goals (PSxG)",
          "adv_Crosses Stopped",
          "adv_Keeper Defensive Actions Outside Box"
        ],
        distribution: [
          "adv_Average Distance of Defensive Actions",
          "adv_Passes Launched %",
          "adv_Average Pass Length"
        ]
      }
    },
    DF: {
      categories: {
        defending: [
          "Challenge Tackle Success %", "Aerial Duels Win %", "Shots/Passes Blocked", "Tackles in Defensive Third", "Ball Recoveries"
        ],
        build_up: [
          "Progressive Passes", "Long Passes Completed", "Total Pass Completion %", "Carries into Final Third", "types_Switches"
        ],
        attacking: [
          "Key Passes", "shot_creation_Shot-Creating Actions", "Passes into Penalty Area"
        ]
      }
    },
    MF: {
      categories: {
        possession: [
         "Progressive Carries", "Take-Ons Successful", "shot_creation_Shot-Creating Actions"
        ],
        playmaking: [
          "Key Passes", "Total Pass Completion %", "Carries into Final Third", "Passes into Penalty Area"
        ],
        defending: [
          "Tackles", "Interceptions", "Aerial Duels Win %", "Ball Recoveries"
        ]
      }
    },
    FW: {
      categories: {
        finishing: [
          "Goals", "Shots", "shot_creation_Goal-Creating Actions"
        ],
        passing: [
          "Assists", "Key Passes", "Passes into Penalty Area", "Crosses into Penalty Area"
        ],
        dribbling: [
          "Progressive Carries", "Dribbles Completed", "Take-Ons Successful"
        ]
      }
    }
  },
  radar: {
    GK: {
      categories: {
        mentality: [
          "Penalty Save Percentage",
          "Clean Sheet Percentage",
          "Saves",
          "Goals Against / 90",
        ],
        decisions: [
          "Keeper Defensive Actions per 90",
          "Average Distance of Defensive Actions",
          "Cross Stop Percentage",
          "Launch Pass Completion %",
        ],
        pressure: [
          "Penalties Faced",
          "Own Goals Conceded",
          "Errors Leading to Shot"
        ],
      },
    },
    DF: {
      categories: {
        mentality: [
          "Yellow Cards",
          "Red Cards",
          "Fouls Committed",
          "Aerial Duels Win %",
        ],
        decisions: [
          "Interceptions",
          "Errors Leading to Shot",
          "Passes Offside"
        ],
        pressure: [
          "Own Goals Conceded",
          "Dispossessed",
          "Miscontrols",
        ],
      },
    },
    MF: {
      categories: {
        mentality: [
          "Fouls Committed",
          "Yellow Cards",
          "Red Cards",
        ],
        decisions: [
          "Miscontrols",
          "Dispossessed",
          "Passes Offside",
          "Interceptions"
        ],
        pressure: [
          "Tackled on Take-On %",
          "Tackles in Middle Third"
        ],
      },
    },
    FW: {
      categories: {
        mentality: [
          "Offside Calls",
          "Fouls Committed",
          "Yellow Cards"
        ],
        decisions: [
          "Miscontrols",
          "Dispossessed",
          "Passes Offside"
        ],
        pressure: [
          "Tackled on Take-On %",
          "Challenges Lost"
        ],
      },
    },
  },
};

export const CHART_LABELS_ALIAS: Record<string, string> = {
  // General GK stats
  "Clean Sheet Percentage": "Cls %",
  "Wins": "Wins",
  "Shots/Passes Blocked": "Blocks",
  "adv_Post-Shot Expected Goals (PSxG)": "Post-Shot xG (PSxG)",
  "adv_Crosses Stopped": "Crosses Stopped",
  "adv_Keeper Defensive Actions Outside Box": "DefActions Outside Box",
  "adv_Average Distance of Defensive Actions": "Avg Action Distance",
  "adv_Passes Launched %": "Launch Pass %",
  "adv_Average Pass Length": "Avg Pass Length",
  "Ball Recoveries": "Recoveries",
  "Challenge Tackle Success %" : "Tackle Win %", 
  "Aerial Duels Win %": "Aerial Win %",
  "Long Passes Completed": "Long Pas Comp" ,
  "Total Pass Completion %" : "Passing %", 
  "Carries into Final Third" : "Progressive Carries",
  "types_Switches" : "Switches",
  "Passes Attempted (GK)": "Passes Attempted",
  "Launch Passes %": "Launch %",
  "Average Pass Length": "Avg Length",
  "shot_creation_Shot-Creating Actions" : "Shot-Creating Actions",
  // Extend for others...
  "Crosses Stopped": "Crosses Stopped",
  "xG": "Expected Goals (xG)",
  "xA": "Expected Assists (xA)",
  "Key Passes": "Key Passes",
  "Progressive Passes": "Progressive Passes",
  "Touches": "Touches",
};

export type ChartMetric = { key: string; value: number, raw_key: string, category: string };
export type ChartPayload = {
  player_name: string;
  player_position: string;
  pizza_metrics: ChartMetric[];
  radar_metrics: ChartMetric[];
};
export type ChartResponse = { pizza_chart: string, radar_chart: string };

export function topPizzaMetrics(
  stats: PlayerStat[],
  limit: number = 12
): string[] {
    const displayStats = filterStatsForDisplay(stats);
    return displayStats
    .filter((item) => item.label && item.val !== undefined)
    .sort((a, b) => {
      const rankA = a.rank ?? Infinity;
      const rankB = b.rank ?? Infinity;
      if (rankA !== rankB) return rankA - rankB;
      return (Number(b.val) || 0) - (Number(a.val) || 0);
    })
    .slice(0, limit)
    .map((item) => item.label);

}
export function getChartLabel(rawKey: string): string {
  return CHART_LABELS_ALIAS[rawKey] ?? rawKey;
}