import { NextRequest } from "next/server";
import { apiHandler } from "../../_utils/handler";

export const runtime = "nodejs";
export async function GET(req: NextRequest) {
  return apiHandler(req, "/leagues");
}