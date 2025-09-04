import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string }> }) {
  const { leagueName } = await ctx.params;
  return apiHandler(req, `/league/${encodeURIComponent(decodeURIComponent(leagueName))}/stats_types`);
}
