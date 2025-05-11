import PitchCanvas from "@/components/pitch/PitchComp";
import TeamSelect from "@/components/team-select/TeamSelect";

export default function Home() {
	return (
		<section className="home">
			<TeamSelect />
			<PitchCanvas />
		</section>
	);
}
