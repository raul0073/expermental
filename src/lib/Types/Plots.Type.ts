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
          "Challenge Tackle Success %", "Aerial Duels Win %", "Shots/Passes Blocked"
        ],
        build_up: [
          "Progressive Passes", "Long Passes Completed", "Total Pass Completion %", "Carries into Final Third",
        ],
        attacking: [
          "Key Passes", "shot_creation_Shot-Creating Actions", "Passes into Penalty Area"
        ]
      }
    },
    MF: {
      categories: {
        possession: [
          "Carries", "Progressive Carries", "Take-Ons Successful"
        ],
        playmaking: [
          "Key Passes", "xA", "Pass Completion %"
        ],
        defending: [
          "Tackles", "Interceptions"
        ]
      }
    },
    FW: {
      categories: {
        finishing: [
          "Goals", "xG", "Shots"
        ],
        creativity: [
          "Assists", "xA", "Key Passes", "Passes into Penalty Area", "Crosses into Penalty Area"
        ],
        ball_progression: [
          "Progressive Carries", "Dribbles Completed"
        ]
      }
    }
  },
  radar: {
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
          "Challenge Tackle Success %", "Aerial Duels Win %", "Shots/Passes Blocked"
        ],
        build_up: [
          "Progressive Passes", "Long Passes Completed", "Total Pass Completion %", "Carries into Final Third",
        ],
        attacking: [
          "Key Passes", "shot_creation_Shot-Creating Actions", "Passes into Penalty Area"
        ]
      }
    },
    MF: {
      categories: {
        possession: [
          "Carries", "Progressive Carries", "Take-Ons Successful"
        ],
        playmaking: [
          "Key Passes", "xA", "Pass Completion %"
        ],
        defending: [
          "Tackles", "Interceptions"
        ]
      }
    },
    FW: {
      categories: {
        finishing: [
          "Goals", "xG", "Shots"
        ],
        creativity: [
          "Assists", "xA", "Key Passes", "Passes into Penalty Area", "Crosses into Penalty Area"
        ],
        ball_progression: [
          "Progressive Carries", "Dribbles Completed"
        ]
      }
    }
  }
};

export const CHART_LABELS_ALIAS: Record<string, string> = {
  // General GK stats
  "Clean Sheet Percentage": "Clean Sheet %",
  "Wins": "Wins",
  "adv_Post-Shot Expected Goals (PSxG)": "Post-Shot xG (PSxG)",
  "adv_Crosses Stopped": "Crosses Stopped",
  "adv_Keeper Defensive Actions Outside Box": "DefActions Outside Box",
  "adv_Average Distance of Defensive Actions": "Avg Distance (DefActions)",
  "adv_Passes Launched %": "Launch Pass %",
  "adv_Average Pass Length": "Avg Pass Length",
  "Ball Recoveries": "Recoveries",
  "Challenge Tackle Success %" : "Tackle Success %", 
  "Aerial Duels Win %": "Aerial Win %",
  "Long Passes Completed": "Long Pas Comp" ,
  "Total Pass Completion %" : "Passing %", 
  "Carries into Final Third" : "Progressive Carries",
  // keeper_adv
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

export type ChartMetric = { key: string; value: number, rawKey: string, category: string };
export type ChartPayload = {
  player_name: string;
  stat_type: string;
  chart_type: "radar" | "pizza" ;
  metrics: ChartMetric[];
};
export type ChartResponse = { image_base64: string };
  
export function topPizzaMetrics(
  stats: PlayerStat[],
  limit: number = 12
): string[] {
  // 1. Filter out useless keys (like "nation", "born", etc.)
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