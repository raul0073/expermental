import { Metadata } from "next";

export const seoMeta: Metadata = {
  title: "Top 5 European Leagues Stats 24-25 – Team & Player Visuals",
  description:
    "Explore detailed statistics and interactive visualizations for EPL, La Liga, Serie A, Bundesliga, and Ligue 1 24-25 seasons. Analyze players, teams, and match performance.",
  keywords: [
    "EPL 24-25",
    "La Liga 24-25",
    "Serie A 24-25",
    "Bundesliga 24-25",
    "Ligue 1 24-25",
    "football stats",
    "soccer analytics",
    "player performance",
    "team stats",
    "football visualizations",
  ],
  authors: [{ name: "Raz Massami", url: "https://football-experimental.vercel.app/" }],
  openGraph: {
    title: "Top 5 European Leagues Stats 24-25",
    description:
      "Dive into EPL, La Liga, Serie A, Bundesliga, and Ligue 1 24-25 stats with interactive team and player visualizations.",
    url: "https://football-experimental.vercel.app/",
    siteName: "European Football Stats Visualizer",
    images: [
      {
        url: "https://football-experimental.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top 5 European Leagues Stats 24-25",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 5 European Leagues Stats 24-25",
    description:
      "Interactive visualizations for EPL, La Liga, Serie A, Bundesliga, and Ligue 1 players and teams.",
    images: ["https://yourdomain.com/twitter-card.png"],
    creator: "@yourTwitterHandle",
  },
  robots: "index, follow",
};
