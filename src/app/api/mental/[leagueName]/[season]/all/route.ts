import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string, season: number }> }) {
  const { leagueName, season } = await ctx.params;
  return apiHandler(req, `/mental/${leagueName}/${season}/all`);
}