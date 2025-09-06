"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, ArrowUpRightSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { StatsPayload } from "../../utils/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
    stats: StatsPayload;
};

export default function TeamsStatsTable({ stats }: Props) {
    // only keep keys that are actual arrays (defense, possession, etc.)
    const statTypes = Object.keys(stats).filter(//eslint-disable-next-line
        (key) => Array.isArray((stats as any)[key])
    );

    const [activeTab, setActiveTab] = useState(statTypes[0]);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    // wrap teams in useMemo to avoid unnecessary recalculations
    const teams = useMemo(() => stats[activeTab] ?? [], [stats, activeTab]);

    // build columns dynamically from metrics keys
    const metricKeys = useMemo(() => {
        if (!teams.length) return [];
        return Object.keys(teams[0].metrics || {});
    }, [teams]);

    // sorted teams
    const sortedTeams = useMemo(() => {
        if (!sortKey) return teams;
        return [...teams].sort((a, b) => {
            const va = a.metrics?.[sortKey] ?? 0;
            const vb = b.metrics?.[sortKey] ?? 0;
            return sortAsc ? va - vb : vb - va;
        });
    }, [teams, sortKey, sortAsc]);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    return (
          <Card className="h-fit border-none shadow-none">
      <CardHeader className="p-1 md:p-6">
        <CardTitle>Teams Stats Bank</CardTitle>
        <CardDescription className="text-xs">Scraped from fbref.com via <Link target="_blank" href={'https://soccerdata.readthedocs.io/en/latest/'} className="hover:underline">soccerdata <ArrowUpRightSquare className="inline h-3 w-auto" /></Link></CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent">

                {statTypes.map((type) => ( 
                    <TabsTrigger key={type} value={type} className="capitalize data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        {type.replace(/_/g, " ")}
                    </TabsTrigger>
                ))}
            </TabsList>

            {statTypes.map((type) => (
                <TabsContent key={type} value={type}>
                  
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Team</TableHead>
                                    {metricKeys.map((key) => (
                                        <TableHead key={key}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-1"
                                                onClick={() => handleSort(key)}
                                            >
                                                {key}
                                                <ArrowUpDown className="h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedTeams.map((row) => (
                                    <TableRow key={row.team}>
                                        <TableCell className="font-medium">{row.team}</TableCell>
                                        {metricKeys.map((key) => (
  <TableCell key={key}>
    {row.metrics?.[key] !== undefined
      ? row.metrics[key]!.toFixed(1)
      : "-"}
  </TableCell>
))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TabsContent>
            ))}
        </Tabs>
            </Card>
    );
}
