"use client";

import Link from "next/link";

function AboutSidebar() {
  return (
    <div><nav className="space-y-6 text-sm font-medium">
    <ul className="space-y-4 pl-2 border-l border-muted">
        <li>
            <Link href="#editor-intro" className="hover:underline block pl-4 text-muted-foreground hover:text-foreground transition">
                Introduction
            </Link>
        </li>
        <li>
            <Link href="#zone-explain" className="hover:underline block pl-4 text-muted-foreground hover:text-foreground transition">
                Zones Config Explanation
            </Link>
        </li>
        <li>
            <Link href="#zones-guide" className="hover:underline block pl-4 text-muted-foreground hover:text-foreground transition">
                Zones Config Guide
            </Link>
        </li>
        <li>
            <Link href="#players-explain" className="hover:underline block pl-4 text-muted-foreground hover:text-foreground transition">
            Player Config Explanation
            </Link>
        </li>
        <li>
            <Link href="#players-guide" className="hover:underline block pl-4 text-muted-foreground hover:text-foreground transition">
                Player Config Guide
            </Link>
        </li>
    </ul>
</nav></div>
  )
}

export default AboutSidebar