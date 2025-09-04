import { NextRequest, NextResponse } from "next/server";
const BASE_API = process.env.API_URL;
/** Proxy to FastAPI and return a NextResponse */
export async function apiHandler(req: NextRequest, upstreamPath: string): Promise<NextResponse> {
  // Build upstream URL and copy query params
  const url = new URL(upstreamPath.replace(/^\//, ""), BASE_API + "/");
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));

  // Forward method/headers/body
  const init: RequestInit = {
    method: req.method,
    headers: req.headers,         // pass-through
    cache: "no-store",
  };
  if (req.method !== "GET" && req.method !== "HEAD") {// eslint-disable-next-line
    init.body = req.body as any;  // stream body through
  }

  const upstream = await fetch(url, init);

  // Return upstream as a NextResponse (status + headers + stream)
  const headers = new Headers(upstream.headers);
  return new NextResponse(upstream.body, { status: upstream.status, headers });
}