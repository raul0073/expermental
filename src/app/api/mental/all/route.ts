import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { apiHandler } from "../../_utils/handler";
import { DashboardPayload } from "@/app/(main)/(dashboard)/utils/fetcher";

export const runtime = "nodejs";

// Cache folder & file
const CACHE_DIR = path.join(process.cwd(), "cache");
const CACHE_FILE = path.join(CACHE_DIR, "mental_all.json");

// Ensure folder exists
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// In-memory cache
let memoryCache: DashboardPayload | null = null;

// Load disk cache
function loadDiskCache(): DashboardPayload | null {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const text = fs.readFileSync(CACHE_FILE, "utf-8");
      const json = JSON.parse(text) as DashboardPayload;
      memoryCache = json;
      return json;
    } catch (err) {
      console.warn("Disk cache invalid, ignoring:", err);
      return null;
    }
  }
  return null;
}

// Save cache to disk
function saveDiskCache(json: DashboardPayload) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(json), "utf-8");
  } catch (err) {
    console.error("Failed to save cache:", err);
  }
}

// Convert ReadableStream to string
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

// Route handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const refresh = searchParams.get("refresh") === "true";

  // Serve memory cache if available
  if (memoryCache && !refresh) return NextResponse.json(memoryCache);

  // Serve disk cache if available
  if (!refresh && loadDiskCache()) return NextResponse.json(memoryCache);

  try {
    // Fetch upstream via apiHandler
    const upstreamRes = await apiHandler(req, "/mental/all");

    // Convert streaming response to string
    const text = await streamToString(upstreamRes as unknown as Response);

    // Parse JSON
    let payload: DashboardPayload;
    try {
      payload = JSON.parse(text) as DashboardPayload;
    } catch (err) {
      console.error("Upstream returned invalid JSON:", err);
      // fallback to cache
      if (memoryCache) return NextResponse.json(memoryCache);
      const diskCache = loadDiskCache();
      if (diskCache) return NextResponse.json(diskCache);
      return new NextResponse("Upstream returned invalid JSON", { status: 502 });
    }

    // Save to memory & disk
    memoryCache = payload;
    saveDiskCache(payload);

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Error fetching /mental/all:", err);
    if (memoryCache) return NextResponse.json(memoryCache);
    const diskCache = loadDiskCache();
    if (diskCache) return NextResponse.json(diskCache);
    return new NextResponse("Failed to fetch dashboard", { status: 500 });
  }
}
