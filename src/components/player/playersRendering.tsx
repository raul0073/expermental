"use client";

import { setSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { RootState } from "@/lib/store";
import { FORMATION_MAP, ROLE_POSITIONS } from "@/lib/Types/Formation.Type";
import { Billboard, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerModel } from "./playerModel";

export function Team() {
	const dispatch = useDispatch();

	const teamName = useSelector(
		(state: RootState) => state.userConfig.team.name
	);
	const team = useSelector((state: RootState) => state.team[teamName]);

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (
			team &&
			team.formation &&
			Array.isArray(team.best_11) &&
			team.best_11.length > 0 &&
			FORMATION_MAP[team.formation]?.length === team.best_11.length
		) {
			setIsReady(true);
		} else {
			setIsReady(false);
		}
	}, [team]);

	if (!isReady) {
		return (
			<group>
				<mesh position={[0, 5, 0]}>
					<Billboard>
						<Text fontSize={5} color="white" anchorX="center">
							{"Loading Team Best XI..."}
						</Text>
					</Billboard>
				</mesh>
			</group>
		);
	}

	const best11 = team.best_11;
	const roles = FORMATION_MAP[team.formation];

	// Subs: players not in best_11
	const subs = team.players.filter(
		(p) => !best11.some((b11) => b11.name === p.name)
	);

	return (
		<>
			{/* Render Best XI Players */}
			{best11.map((player, i) => {
				const role = roles[i];
				const position: [number, number] =
	role in ROLE_POSITIONS
		? ROLE_POSITIONS[role as keyof typeof ROLE_POSITIONS]
		: [0, 0];

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
				const z = -35;
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
