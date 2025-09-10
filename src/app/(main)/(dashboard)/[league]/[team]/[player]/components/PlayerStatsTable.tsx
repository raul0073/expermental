import { Player } from "@/app/(main)/(dashboard)/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LABELS_CONFIG } from "@/lib/Types/LABELS";
import { STAT_OPTION_LABELS } from "@/lib/Types/PlayerStats.Type";
import { cn } from "@/lib/utils";
type StatCategory = keyof typeof LABELS_CONFIG;



function PlayerStatsTable({playerData, className}: {playerData: Player, className: string}) {

     const statCategories = Object.keys(playerData.stats ?? {}) || {} ;
     
     //eslint-disable-next-line
  const renderStatRow = (cat: StatCategory, stat: string, value: any) => {
    const label =
      LABELS_CONFIG[cat]?.[stat.replace(/ - /g, "_")] ??
      stat;
    return (
      <tr key={stat}>
        <td className="border px-2 py-1">{label}</td>
        <td className="border px-2 py-1">{value}</td>
      </tr>
    );
  };


  return (
    <div className={cn("w-full", className)}>
         {/* Stats Tabs */}
          {playerData.stats && Object.entries(playerData.stats).length > 0 && (
            <div className="px-2">
            <h3 className="font-semibold mb-2">Stats</h3>
            <Tabs defaultValue={statCategories[0]} className="w-full">
              <TabsList className="flex flex-col md:flex-row items-start gap-2 mb-2 h-fit">
                {statCategories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="text-left w-fit"
                  >
                    {STAT_OPTION_LABELS[cat.toLowerCase() as keyof typeof STAT_OPTION_LABELS]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {statCategories.map((cat) => (
                <TabsContent key={cat} value={cat}>
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm border-collapse border border-slate-300">
                      <thead>
                        <tr>
                          <th className="text-muted-foreground uppercase text-left border px-2 py-1">Stat</th>
                          <th className="text-muted-foreground uppercase text-left border px-2 py-1">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerData.stats && Object.entries(playerData.stats[cat]).map(([stat, value]) =>
                          renderStatRow(cat, stat, value)
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          )} 
    </div>
  )
}

export default PlayerStatsTable
