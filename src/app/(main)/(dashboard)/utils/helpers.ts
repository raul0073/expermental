import { Player } from "./types";

export function getBestEleven(players: Player[]): Player[] {
  const requiredRoles = ["GK", "CB", "CB", "FB", "FB", "DM", "CM", "AM", "W", "W", "CF"];
  const selected: Player[] = [];

  for (const role of requiredRoles) {
    const match = players.find((p) => p.role === role && !selected.includes(p));
    if (match) selected.push(match);
  }

  return selected;
}