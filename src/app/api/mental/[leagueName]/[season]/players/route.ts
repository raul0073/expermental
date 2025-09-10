import { apiHandler } from "@/app/api/_utils/handler";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ leagueName: string; season: string }> }
) {
  console.log("[DEBUG] Incoming request:", req.url);

  const { leagueName, season } = await ctx.params;
  console.log("[DEBUG] Extracted params:", { leagueName, season });

  const { searchParams } = new URL(req.url);
  console.log("[DEBUG] Raw searchParams:", searchParams.toString());

  const query = new URLSearchParams();

  const name = searchParams.get("name");
  const role = searchParams.get("role");
  const top_k = searchParams.get("top_k");

  if (name) query.set("name", name);
  if (role) query.set("role", role);
  if (top_k) query.set("top_k", top_k);

  console.log("[DEBUG] Final query params:", {
    name,
    role,
    top_k,
    queryString: query.toString(),
  });

  const queryString = query.toString();
  const backendUrl = `/mental/vv/players/${leagueName}/${season}${
    queryString ? `?${queryString}` : ""
  }`;

  console.log("[DEBUG] Proxying request to backend:", backendUrl);

  return apiHandler(req, backendUrl);
}
