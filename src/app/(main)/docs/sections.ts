export const SECTIONS_TEXT = {
  whatIsMentalScore: `The experiMental platform is designed to quantify the cognitive, psychological and
    decision-making traits of football players. Unlike traditional stats like goals or
    tackles the Mental Score reflects a player's mental attributes such as resilience
    under pressure, creativity, composure and ability to influence team performance.`,

  whyCalculate: `Football performance is more than just physical stats. Mental traits often determine
    consistency, decision-making and impact in high-pressure situations. experiMental
    provides coaches, analysts and fans with a comprehensive view of players'
    psychological and cognitive strengths.`,

  whyCalculateList: [
    "Identify players who thrive under pressure.",
    "Compare players beyond traditional metrics.",
    "Support tactical and transfer decisions.",
  ],

  howCalculatedIntro: `The Mental Score is derived from a combination of on-field statistics and role-specific
    mappings. Each player is analyzed based on their position and the traits that are most
    relevant for that role.`,

  step1RoleClassification: `Players are assigned a role (e.g., Goalkeeper, Center Back, Winger) using a weighted
    analysis of performance stats like tackles, passes, xG, interceptions and progressive
    actions. This ensures that the traits we measure are appropriate for the player's position.`,

  step2TraitMapping: `Each role has a predefined mapping of mental traits to relevant statistics.`,

  step2TraitMappingList: [
    { role: "Goalkeepers", traits: "Resilience, Composure, Anticipation" },
    { role: "Midfielders", traits: "Creativity, Decision Making, Work Rate" },
    { role: "Forwards/Wingers", traits: "Composure, Off-the-Ball Movement, Vision" },
  ],

  step2TraitMappingNote: `Each trait is scored using weighted statistics extracted from sources like passing, shooting,
    defense and possession metrics.`,

  step3Normalization: `Raw statistics are normalized to account for different playing times, leagues and team styles.
    Each trait receives a weighted score which is then combined to form a single Mental Score for
    the player. Negative weights are applied for undesirable traits such as errors or disciplinary
    issues.`,

  step4Filtering: `To ensure meaningful results, players with insufficient playing time (less than 600 minutes
    in the season) are excluded. This prevents skewed scores from outliers or players with limited
    data.`,

  outputUseCases: `The final Mental Score can be used in multiple ways:`,

  outputUseCasesList: [
    "Rank players across leagues or teams based on mental performance.",
    "Generate Best XI selections considering both skill and mental traits.",
    "Support scouting, transfers and tactical decisions.",
    "Provide fans with insights into players' psychological strengths.",
  ],

  summary: `The experiMental platform bridges the gap between traditional statistics and
    cognitive performance in football. By evaluating traits like resilience, creativity
    and composure, we provide a holistic view of a player's impact both on and off the ball.`,
};