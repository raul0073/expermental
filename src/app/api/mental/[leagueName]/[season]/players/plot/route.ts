import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ leagueName: string; season: string }> }
) {
  const { leagueName, season } = await ctx.params;

  const query = req.nextUrl.searchParams.toString();

  const backendUrl = `/mental/vv/players/${leagueName}/${season}/plot${
    query ? `?${query}` : ""
  }`;


  return apiHandler(req, backendUrl);
}
