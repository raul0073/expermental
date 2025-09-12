import LeagueLogo from "@/components/root/league/LeagueLogo";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import Link from "next/link";
import { Player } from "../../../utils/types/player";
import MentalCircle from "../../mental/MentalRankCircle";
import SortableHeaderWithPopover from "../SortableHeaderWithPopover";

export type PlayerTableProps = {
  players: Player[];
  leaguePage?: boolean;
  className?: string;
  leagueName?: string;
  teamName?: string;

};

export type PlayerTableSortKey = "name" | "team" | "league" | "mental" | "performance" | "role";
export type SortDirection = "asc" | "desc";
export const PlayersTable = ({
  players,
  leaguePage,
  sortKey,
  sortDir,
  leagueName,
  teamName,
  handleSort,
}: PlayerTableProps & {  sortKey: PlayerTableSortKey;
  sortDir: SortDirection;
  handleSort: (key: PlayerTableSortKey) => void;}) => (
  <Table className="rounded text-xs md:text-sm">
    <TableHeader>
      <TableRow>
        <TableHead className="w-12 cursor-pointer" onClick={() => handleSort("name")}>#</TableHead>
        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>Player</TableHead>
        {leaguePage && <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>Role</TableHead>}
        {!leaguePage && (
          <>
            <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>Team</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("league")}>League</TableHead>
          </>
        )}
        <SortableHeaderWithPopover
          key="mental"
          label="Mental"
          statKey="mental"
          sortKey={sortKey}
          sortDir={sortDir}//eslint-disable-next-line
          onSort={(key) => handleSort(key as any)}
          description="Overall mental score (M-score 0–100)"
          centered
        />
        <SortableHeaderWithPopover
          key="performance"
          label="Performance"
          statKey="performance"
          sortKey={sortKey}
          sortDir={sortDir}//eslint-disable-next-line
          onSort={(key) => handleSort(key as any)}
          description="Overall performance rating (0–100 composite)"
          end
        />
      </TableRow>
    </TableHeader>
    <TableBody>
      {players.map((player, idx) => {
        const leagueKey = leagueName ?? player.league ?? player.__meta__?.league
        const team = teamName ?? player.team ?? player.__meta__?.team;
        console.log("REAM NAME: ", leagueName, teamName)
        const breakdown = player.mental?.breakdown ?? {};
        const bestTrait = Object.entries(player.mental.breakdown).reduce<string | null>((best, [trait, data]) => {
          if (!best) return trait;
          return data.avg > breakdown[best].avg ? trait : best;
        }, null); 

        return (
          <TableRow key={`${player.fbref_id ?? idx}-${idx}`}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="">
              <Link
                href={`/${encodeURIComponent(leagueKey)}/${encodeURIComponent(team!)}/${encodeURIComponent(player.name)}`}
                className="hover:underline flex-col flex items-start"
              >
                <div>{player.name} </div>
                <span className="hidden md:block text-[.6rem] text-muted-foreground">{bestTrait}</span>
              </Link>
            </TableCell>
            {leaguePage && <TableCell>{player.role}</TableCell>}
            {!leaguePage && (
              <>
                <TableCell>{team}</TableCell>
                <TableCell>
                   <Link
                    href={`/${encodeURIComponent(leagueKey)}`}
                    className="flex items-center gap-2"
                  >
                   {<LeagueLogo league={leagueKey} size="sm"/>}
                   
                    <Badge
                    className="text-xs text-nowrap"
                      variant={leagueKey.slice(0, 3) as
                        | "GER"
                        | "ENG"
                        | "ESP"
                        | "ITA"
                        | "FRA"}
                    >
                      {LEAGUES_NAME[leagueKey] ?? leagueKey}
                    </Badge>
                  </Link>
                </TableCell>
              </>
            )}
            <TableCell><MentalCircle value={player.mental?.m ?? 0} /></TableCell>
            <TableCell className="text-right font-bold">{player.ranking?.performance ?? 0}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
