"use client";

import { setSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { RootState } from "@/lib/store";
import { FORMATION_MAP, ROLE_POSITIONS } from "@/lib/Types/Formation.Type";
import { useDispatch, useSelector } from "react-redux";
import { PlayerModel } from "./playerModel";
import { Billboard, Text } from "@react-three/drei";

export function Team({ teamName }: { teamName: string }) {
	const dispatch = useDispatch();
	const team = useSelector((state: RootState) => state.team[teamName]);
	if(!team) return (
		<Billboard>
				<Text
					position={[0, 1.1, 0]}
					fontSize={4}
					color={`white`}
					fontWeight={'bold'}
					anchorX="center"
					anchorY="bottom">
					{`Loading Team Stats`}
				</Text>
			</Billboard>
	)
	
	const best11 = team.best_11;
	const roles = FORMATION_MAP[team.formation];
	
	if (!roles || !best11) return null;
	// Subs: players not in best_11
	const subs = team.players.filter(
		(p) => !best11.some((b11) => b11.name === p.name)
	);
	
	return (
		<>
			{/* Render Best XI Players */}
			{best11.map((player, i) => {
				const role = roles[i];
				const position = ROLE_POSITIONS[
					role as keyof typeof ROLE_POSITIONS
				] ?? [0, 0];

				return (
					<PlayerModel
						key={`starter-${player.name}`}
						name={player.name}
						isSub={false}
						rating={player.rating}
						shirt_number={player.shirt_number}
						position={position}
						onClick={() => {
							dispatch(clearSelectedZone());
							dispatch(setSelectedPlayer(player));
						}}
					/>
				);
			})}

			{/* Render Subs on sideline */}
			{subs.map((sub, i) => {
				const spacing = 3;
				const x = -5 + i * spacing;
				const z = -40;
				return (
					<PlayerModel
						isSub={true}
						key={`sub-${sub.name}`}
						name={sub.name}
						rating={sub.rating}
						shirt_number={sub.shirt_number}
						position={[x, z]}
						onClick={() => {
							dispatch(clearSelectedZone());
							dispatch(setSelectedPlayer(sub));
						}}
					/>
				);
			})}
		</>
	);
}
