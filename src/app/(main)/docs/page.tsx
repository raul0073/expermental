import { Metadata } from "next";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Mental Score Platform Documentation | Football Analytics",
    description:
      "Learn how the Mental Score platform calculates player mental traits like resilience, composure, and creativity, and why it matters for performance analysis.",
    keywords: [
      "football analytics",
      "mental score",
      "player evaluation",
      "resilience",
      "composure",
      "creativity",
      "sports data",
    ],
    openGraph: {
      title: "Mental Score Platform Documentation",
      description:
        "Understand how we calculate Mental Scores for football players and what traits we evaluate.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mental Score Platform Documentation",
      description:
        "Understand how we calculate Mental Scores for football players and what traits we evaluate.",
    },
  };
};

function page() {
  const sections = [
    { id: "what-is-mental-score", title: "What is the Mental Score?" },
    { id: "why-calculate", title: "Why do we calculate a Mental Score?" },
    { id: "how-calculated", title: "How the Mental Score is Calculated" },
    { id: "output-use-cases", title: "Output and Use Cases" },
    { id: "summary", title: "Summary" },
  ];

  return (
    <div className="flex max-w-7xl px-6 py-10 gap-10 relative">
      {/* Aside / Index */}
      <aside className="hidden md:block sticky top-20 w-64 self-start">
        <nav className="space-y-2">
          <h3 className="font-bold text-lg mb-2">Contents</h3>
          <ul className="space-y-1">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="text-blue-600 hover:underline scroll-smooth"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-bold relative pl-4 leading-tight tracking-tight before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
          Experimental Documentation
        </h1>

        <section id="what-is-mental-score" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">
            What is the Mental Score?
          </h2>
          <p className="text-sm">
          {`  The Mental Score platform is designed to quantify the cognitive, psychological, and
            decision-making traits of football players. Unlike traditional stats like goals or
            tackles, the Mental Score reflects a player's mental attributes, such as resilience
            under pressure, creativity, composure, and ability to influence team performance.`}
          </p>
        </section>

        <section id="why-calculate" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">
            Why do we calculate a Mental Score?
          </h2>
          <p className="text-sm">
           {` Football performance is more than just physical stats. Mental traits often determine
            consistency, decision-making, and impact in high-pressure situations. Our platform
            provides coaches, analysts, and fans with a comprehensive view of players'
            psychological and cognitive strengths.`}
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            <li>Identify players who thrive under pressure.</li>
            <li>Compare players beyond traditional metrics.</li>
            <li>Support tactical and transfer decisions.</li>
          </ul>
        </section>

        <section id="how-calculated" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">
            How the Mental Score is Calculated
          </h2>
          <p className="text-sm">
           {` The Mental Score is derived from a combination of on-field statistics and role-specific
            mappings. Each player is analyzed based on their position and the traits that are most
            relevant for that role.`}
          </p>

          <h3 className="text-xl font-semibold">Step 1: Role Classification</h3>
           <p className="text-sm">
           {` Players are assigned a role (e.g., Goalkeeper, Center Back, Winger) using a weighted
            analysis of performance stats like tackles, passes, xG, interceptions, and progressive
            actions. This ensures that the traits we measure are appropriate for the player's position.`}
          </p>

          <h3 className="text-xl font-semibold">Step 2: Trait Mapping</h3>
          <p>
            Each role has a predefined mapping of mental traits to relevant statistics. For example:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            <li><strong>Goalkeepers:</strong> Resilience, Composure, Anticipation.</li>
            <li><strong>Midfielders:</strong> Creativity, Decision Making, Work Rate.</li>
            <li><strong>Forwards/Wingers:</strong> Composure, Off-the-Ball Movement, Vision.</li>
          </ul>
            <p className="text-sm">
            Each trait is scored using weighted statistics extracted from sources like passing, shooting,
            defense, and possession metrics.
          </p>

          <h3 className="text-xl font-semibold">Step 3: Normalization & Aggregation</h3>
            <p className="text-sm">
           {` Raw statistics are normalized to account for different playing times, leagues, and team styles.
            Each trait receives a weighted score, which is then combined to form a single Mental Score for
            the player. Negative weights are applied for undesirable traits, such as errors or disciplinary
            issues.`}
          </p>

          <h3 className="text-xl font-semibold">Step 4: Filtering and Quality Control</h3>
          <p>
           {` To ensure meaningful results, players with insufficient playing time (less than 600 minutes
            in the season) are excluded. This prevents skewed scores from outliers or players with limited
            data.`}
          </p>
        </section>

        <section id="output-use-cases" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">
            Output and Use Cases
          </h2>
          <p>
            The final Mental Score can be used in multiple ways:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/60 rounded p-3">
            <li>Rank players across leagues or teams based on mental performance.</li>
            <li>Generate Best XI selections considering both skill and mental traits.</li>
            <li>Support scouting, transfers, and tactical decisions.</li>
            <li>{`Provide fans with insights into players' psychological strengths.`}</li>
          </ul>
        </section>

        <section id="summary" className="space-y-4">
          <h2 className="relative text-2xl font-semibold tracking-tighter text-muted-foreground">
            Summary
          </h2>
          <p>
           {` The Mental Score platform bridges the gap between traditional statistics and
            cognitive performance in football. By evaluating traits like resilience, creativity,
            and composure, we provide a holistic view of a player's impact both on and off the ball.`}
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;
