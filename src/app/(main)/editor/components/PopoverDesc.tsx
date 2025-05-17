import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import React from "react";

export interface DescPopoverProps {
	/** "pros" or "cons" */
	type: "pros" | "cons";
	/** "team" or "against" */
	source: "team" | "against";
}

export const StatDescriptionPopover: React.FC<DescPopoverProps> = ({
	type,
	source,
}) => {
	const title = `${type.charAt(0).toUpperCase() + type.slice(1)} (${
		source.charAt(0).toUpperCase() + source.slice(1)
	})`;
	const description = getStatDescription(source, type);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					type="button"
					aria-label={`Show description for ${title}`}
					className="inline-flex items-center p-1 rounded-full hover:bg-muted">
					<Info className="w-4 h-4 text-muted-foreground" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-4">
				<h4 className="text-sm font-semibold leading-none">{title}</h4>
				<p className="mt-2 text-sm text-muted-foreground">{description}</p>
			</PopoverContent>
		</Popover>
	);
};
export function getStatDescription(
	source: "team" | "against",
	type: "pros" | "cons"
): string {
	const sourceConfig = STAT_DESCRIPTION_CONFIG[source];
	if (!sourceConfig) {
		throw new Error(`Invalid source: ${source}`);
	}
	const desc = sourceConfig[type];
	if (!desc) {
		throw new Error(`Invalid type: ${type}`);
	}
	return desc;
}

export const STAT_DESCRIPTION_CONFIG: Record<
	"team" | "against",
	Record<"pros" | "cons", string>
> = {
    team: {
        pros:  'Positive actions by your team, such as goals scored, successful tackles, progressive passes, and clean sheets.',
        cons:  'Negative actions by your team, such as errors leading to shots, turnovers, fouls conceded, and goals conceded.',
      },
      against: {
        pros: 'Negative actions by the opponent, like opponent errors, off-target shots, and forced turnovers, which benefit your team.',
        cons:  'Positive actions by the opponent against your team, such as shots on target, successful opponent dribbles, and progressive carries by the opponent.',
      }
};
