import { Separator } from "@/components/ui/separator";

interface ConfigExplanation {
	title: string;
	description: string;
	example: Record<string, string[]>;
}

const playerConfigExplanation: Record<string, ConfigExplanation | string> & {
	tip: string;
} = {
	pros: {
		title: "Pros (Strengths)",
		description:
			"These stats reward a player's contributions. Use around 5–8 per role. Focus on areas the player should excel in based on position and style — tackling for defenders, progression for midfielders, and finishing for attackers.",
		example: {
			DEF: ["Tackles + Interceptions", "Aerial Duels Win %"],
			MID: ["Progressive Passes", "Carries into Final Third"],
			FWD: ["Goals", "Shot-Creating Actions"],
		},
	},
	cons: {
		title: "Cons (Weaknesses)",
		description:
			"Stats that capture negative contributions. Use 3–6 per role. These reflect discipline, composure, and decision-making. Don't overuse — just enough to penalize consistent issues.",
		example: {
			DEF: ["Errors Leading to Shot", "Fouls Committed"],
			MID: ["Dispossessed", "Yellow Cards"],
			FWD: ["Big Chances Missed", "Offsides"],
		},
	},
	important: {
		title: "Important (Impactful Stats)",
		description:
			"Use 2–4 max. These define match-winners. Pick the game-changing KPIs: goals, assists, shot creation, xG. Weighting these ensures your top performers rise.",
		example: {
			GK: ["Save Percentage", "Clean Sheets"],
			MID: ["Expected Assists (xA)", "Shot-Creating Actions"],
			FWD: ["Goals", "xG"],
		},
	},
	tip: "Player ratings are influenced by two main elements: (1) statistical percentile scores based on role-specific configs, and (2) minutes played, which provides availability context. Regular starters gain a small consistency boost, but highly impactful low-minute players can still shine if their per-90 stats are elite.",
};

const zoneConfigExplanation = {
	team: "These are your team's own outputs in a zone — touches, xG, progressive passes. Choose up to 5–7 per zone, focusing on your tactical strengths (e.g., wing dominance or central buildup).",
	against:
		"These reflect danger areas: what opponents are doing in that space. Use to measure vulnerability — entries, shots conceded, take-ons allowed.",
	players:
		"Each zone weights players based on how relevant their position is. The score blends their match impact (rating) with zone responsibility. The more a zone relies on a position, the more the player's impact matters.",
	tip: "Good configs reflect your team's identity: a high press? Weight attacking zones and player touches. Compact defense? Invest in defensive zones and against-stats suppression. There are 15 zones across the pitch — spread across defensive, midfield, and attacking thirds, and across left/central/right channels. Think of each zone as a lens into your tactical shape.",
};
const headerClass =
	"relative text-5xl font-extrabold my-12 flex gap-4 items-end tracking-tight after:absolute after:-left-5 after:bg-primary after:w-2 after:h-full after:top-1/2 after:-translate-y-1/2";
function About() {
	return (
		<section className="about min-h-screen w-full bg-background text-foreground">
			<div className="container py-8 px-12 space-y-20" id="editor-intro">
				<article className="space-y-10">
					<section className="space-y-4">
						<h3 className={headerClass} id="players-explain">
							Introduction
						</h3>
						<p className="leading-relaxed text-xl">
							Our goal is to give you the tools to build a football intelligence
							model that reflects your footballing beliefs. Every team, every
							coach sees the game differently. Train the system to think like
							you.
						</p>
						<p className="leading-relaxed text-lg">
							Your team, your model. Our system lets you shape how players and
							zones are understood by the engine. Configure scoring weights,
							role importance, and tactical zones so analysis reflects your
							footballing principles.
						</p>
						<p className="text-muted-foreground italic text-sm">
							The docs below guide you through building your own model.
						</p>
					</section>
					<div className="grid grid-cols-1 items-center gap-6">
						<ZonesGuidanceComp
							headerClass={headerClass}
							zoneConfigExplanation={zoneConfigExplanation}
						/>
						<Separator />
						<PlayerGuidanceComp
							headerClass={headerClass}
							playerConfigExplanation={playerConfigExplanation}
						/>
					</div>
				</article>
			</div>
		</section>
	);
}

export default About;

export const ZonesGuidanceComp = ({
	headerClass,
	zoneConfigExplanation,
}: {
	headerClass: string;
	zoneConfigExplanation: {
		tip: string;
		team: string;
		against: string;
		players: string;
	};
}) => {
	return (
		<section className="space-y-4">
			<h3 className={headerClass} id="zone-explain">
				How to configure zones rating
			</h3>

			<h3 className="text-3xl font-semibold"></h3>
			<div className="bg-muted/40 border border-muted-foreground rounded-xl p-6 space-y-4 text-base leading-relaxed">
				<h4 className="text-2xl font-bold">Team stats:</h4>
				<p>{zoneConfigExplanation.team}</p>
			</div>
			<div className="bg-muted/40 border border-muted-foreground rounded-xl p-6 space-y-4 text-base leading-relaxed">
				<h4 className="text-2xl font-bold">Against stats: </h4>
				<p> {zoneConfigExplanation.against}</p>
			</div>
			<div className="bg-muted/40 border border-muted-foreground rounded-xl p-6 space-y-4 text-base leading-relaxed">
				<h4 className="text-2xl font-bold">Players:</h4>
				<p>{zoneConfigExplanation.players}</p>
			</div>
			<p className="text-muted-foreground italic mt-2">
				{zoneConfigExplanation.tip}
			</p>

			<div className="mt-6">
				<p className="text-center text-sm text-muted-foreground mt-3">
					A 15-zone division of the pitch
				</p>
			</div>

			<div className="mt-10 text-base leading-relaxed space-y-4 border border-muted bg-muted rounded-xl p-6">
				<h4 className="text-2xl font-bold" id="zones-guide">
					Zone Editor Guide
				</h4>
				<p>
					<strong>Zone Selection:</strong>{" "}
					{`Click a zone in the sidebar to
			configure it. For example, "Defensive Left Wing" configures your
			team’s strengths and weaknesses in that area.`}
				</p>
				<p>
					<strong>Available Stats:</strong> Use the tabs to browse stats by type
					(e.g., Passing, Possession). Drag relevant metrics into the boxes.
				</p>
				<ul className="list-disc ml-6 space-y-1">
					<li>
						<strong>Team Pros:</strong> What your team does well here (e.g.,
						progressive passes, xG).
					</li>
					<li>
						<strong>Own Team Mistakes:</strong> Self-caused issues — errors,
						dispossessions, fouls.
					</li>
					<li>
						<strong>Vs Team Pros:</strong> What the opponent is doing well in
						this zone — shots, take-ons, etc.
					</li>
				</ul>
				<p>
					<strong>Available Roles:</strong> Select roles that are responsible
					for this zone (e.g., LB, LWB). You can weight each one using the
					sliders.
				</p>
				<p>
					<strong>Scalers:</strong> You can further amplify the impact of
					specific stats by assigning them weights.
				</p>
				<p className="italic text-muted-foreground">
					{`Don't over-optimize a single zone. Consistency across zones
			builds better analysis.`}
				</p>
			</div>
		</section>
	);
};

export const PlayerGuidanceComp = ({
	headerClass,
	playerConfigExplanation,
}: {
	headerClass: string;
	playerConfigExplanation: Record<string, ConfigExplanation | string> & {
		tip: string;
	};
}) => {
	return (
		<section className="space-y-4">
			<h3 className={headerClass} id="players-explain">
				How to configure player scoring
			</h3>
			{(
				Object.entries(playerConfigExplanation) as [string, ConfigExplanation][]
			).map(
				([key, value]) =>
					key !== "tip" && (
						<div
							key={key}
							className="bg-muted/40 border border-muted-foreground rounded-xl p-6 space-y-4">
							<h4 className="text-2xl font-bold">{value.title}</h4>
							<p className="text-base leading-relaxed">{value.description}</p>
							<div>
								<p className="text-sm text-muted-foreground font-semibold mb-1">
									Examples per role:
								</p>
								<ul className="list-disc list-inside text-sm ml-4 grid grid-cols-2 gap-x-6">
									{Object.entries(value.example).map(([role, stats]) => (
										<li key={role}>
											<strong>{role}</strong>: {stats.join(", ")}
										</li>
									))}
								</ul>
							</div>
						</div>
					)
			)}
			<div className="mt-10 text-base leading-relaxed space-y-4 border border-muted bg-muted rounded-xl p-6">
				<h4 className="text-2xl font-bold" id="players-guide">
					Player Config Editor Guide
				</h4>
				<p>
					<strong>Position Selection:</strong>{" "}
					{`Choose the player role
			you're configuring (GK, DEF, MID, FWD). Each has unique
			statistical expectations.`}
				</p>
				<p>
					<strong>Available Stats:</strong> Use the category tabs to filter
					available metrics. Drag metrics into one of the three boxes:
				</p>
				<ul className="list-disc ml-6 space-y-1">
					<li>
						<strong>Pros:</strong> Positive actions this position should be
						rewarded for (e.g., Clearances, Assists).
					</li>
					<li>
						<strong>Cons:</strong> Penalize mistakes or negative contributions
						(e.g., Red Cards, Missed Chances).
					</li>
					<li>
						<strong>Important:</strong> Select only 2–4 elite-impact stats — the
						ones that define match-winners.
					</li>
				</ul>
				<p>
					<strong>Save & Reset:</strong> Once satisfied, save the config. You
					can also reset to the initial state if needed.
				</p>
				<p className="text-muted-foreground italic">
					Well-balanced configs help surface the right players. Don’t overload
					any one category — balance impact and availability.
				</p>
			</div>
			<p className="text-muted-foreground italic text-base mt-4">
				{playerConfigExplanation.tip}
			</p>
		</section>
	);
};
