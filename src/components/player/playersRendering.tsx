import { setSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { arsenal433HoldingCoordinates, Player } from "./player.types";
import { PlayerModel } from "./playerModel";
import { useDispatch } from "react-redux";
import { useSidebar } from "@/components/ui/sidebar";

export function Team({ players }: { players: Player[] }) {
	const dispatch = useDispatch();
	const { setOpen } = useSidebar(); 

	return (
		<>
			{players.map((p) => (
				<PlayerModel
					key={p.id}
					avRating={p.avRating}
					name={p.name}
					number={p.number}
					position={arsenal433HoldingCoordinates[p.role] ?? [0, 0]}
					onClick={() => {
						dispatch(setSelectedPlayer({
							name: p.name,
							number: p.number,
							avRating: p.avRating,
							role: p.role,
							id: p.id,
							position: arsenal433HoldingCoordinates[p.role] ?? [0, 0],
						}));
						setOpen(true);
					}}
				/>
			))}
		</>
	);
}
