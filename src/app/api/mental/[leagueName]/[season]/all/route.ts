import { LeaguePagePayload } from "@/app/(main)/(dashboard)/utils/fetcher"; // <-- correct type
import { apiHandler } from "@/app/api/_utils/handler";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

// Cache folder
const CACHE_DIR = path.join(process.cwd(), "cache");
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// In-memory cache keyed by league-season
const memoryCache: Record<string, LeaguePagePayload | null> = {};

// Build cache file path
function cacheFilePath(league: string, season: number) {
  return path.join(CACHE_DIR, `mental_${league}_${season}.json`);
}

// Load disk cache
function loadDiskCache(league: string, season: number): LeaguePagePayload | null {
  const file = cacheFilePath(league, season);
  if (fs.existsSync(file)) {
    try {
      const text = fs.readFileSync(file, "utf-8");
      const json = JSON.parse(text) as LeaguePagePayload;
      memoryCache[`${league}_${season}`] = json;
      return json;
    } catch (err) {
      console.warn("Disk cache invalid, ignoring:", err);
      return null;
    }
  }
  return null;
}

// Save cache to disk
function saveDiskCache(league: string, season: number, payload: LeaguePagePayload) {
  try {
    fs.writeFileSync(cacheFilePath(league, season), JSON.stringify(payload), "utf-8");
  } catch (err) {
    console.error("Failed to save cache:", err);
  }
}

// Convert streaming response to string
async function streamToString(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let done = false;
  while (!done) {
    const { value, done: finished } = await reader.read();
    done = finished;
    if (value) result += decoder.decode(value, { stream: true });
  }
  return result;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ leagueName: string; season: number }> }) {
  const { leagueName, season } = await ctx.params;
  const key = `${leagueName}_${season}`;
  const refresh = new URL(req.url).searchParams.get("refresh") === "true";

  // Serve memory cache
  if (memoryCache[key] && !refresh) return NextResponse.json(memoryCache[key]);

  // Serve disk cache
  if (!refresh && loadDiskCache(leagueName, season)) return NextResponse.json(memoryCache[key]);

  try {
    const upstreamRes = await apiHandler(req, `/mental/${leagueName}/${season}/all`);
    const text = await streamToString(upstreamRes as unknown as Response);

    let payload: LeaguePagePayload;
    try {
      payload = JSON.parse(text) as LeaguePagePayload;
    } catch (err) {
      console.error("Upstream returned invalid JSON:", err);
      // fallback to cache
      if (memoryCache[key]) return NextResponse.json(memoryCache[key]);
      const diskCache = loadDiskCache(leagueName, season);
      if (diskCache) return NextResponse.json(diskCache);
      return new NextResponse("Upstream returned invalid JSON", { status: 502 });
    }

    // Save cache
    memoryCache[key] = payload;
    saveDiskCache(leagueName, season, payload);

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Error fetching league data:", err);
    if (memoryCache[key]) return NextResponse.json(memoryCache[key]);
    const diskCache = loadDiskCache(leagueName, season);
    if (diskCache) return NextResponse.json(diskCache);
    return new NextResponse("Failed to fetch league data", { status: 500 });
  }
}
