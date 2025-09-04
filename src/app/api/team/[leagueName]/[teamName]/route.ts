import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string; teamName: string }> }) {
  const { leagueName, teamName } = await ctx.params;
  return apiHandler(
    req,
    `/team/${encodeURIComponent(decodeURIComponent(leagueName))}/${encodeURIComponent(decodeURIComponent(teamName))}`
  );
}
