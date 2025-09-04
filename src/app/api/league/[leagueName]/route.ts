import { NextRequest } from "next/server";
import { apiHandler } from "../../_utils/handler";

export const runtime = "nodejs";
export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string }> }) {
  const { leagueName } = await ctx.params; // Next 15: params is a Promise
  return apiHandler(req, `/league/${encodeURIComponent(decodeURIComponent(leagueName))}`);
}