import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string, season: number, teamName: string }> }) {
  const { leagueName, season, teamName } = await ctx.params;
  return apiHandler(req, `/mental/${leagueName}/${season}/${teamName}`);
}