import { HTMLAttributes } from "react";

export interface SvgCompProps extends HTMLAttributes<SVGSVGElement> {
    width?: string
    height?: string;
    fill?: string
}
function ScraperSvgComp({ width, height, fill, ...props }: SvgCompProps) {
	return (
		<svg
        {...props}
			fill={fill || "#000000"}
			width={width || "24px"}
			height={height || "24px"}
			viewBox="-0.56 0 171.265 171.265"
			xmlns="http://www.w3.org/2000/svg">
			<g id="scraper" transform="translate(-421.662 -997.216)">
				<path
					id="Path_105"
					data-name="Path 105"
					d="M567.7,1015.657a4,4,0,1,0,5.656,0A4,4,0,0,0,567.7,1015.657Z"
				/>
				<path
					id="Path_106"
					data-name="Path 106"
					d="M591.8,1017.423a19.372,19.372,0,0,0-5.711-13.787l-.707-.709a19.5,19.5,0,0,0-27.578,0l-40.61,40.61c-25.274-2.8-61.3,14.466-92.591,44.575l-2.94,2.828,77.541,77.54,2.827-2.939c30.688-31.9,48.212-69.5,44.308-94.58l39.75-39.75A19.373,19.373,0,0,0,591.8,1017.423Zm-52.871,60.949c.113,21.706-14.987,51.8-39.863,78.658l-65.951-65.951c25.689-23.775,54.811-38.8,76.333-39.794l-7.859,7.859,28.285,28.283Zm41.5-52.817-50.558,50.56L512.9,1059.144l50.559-50.559a11.5,11.5,0,0,1,16.262,0l.708.709a11.5,11.5,0,0,1,0,16.263Z"
				/>
			</g>
		</svg>
	);
}

export default ScraperSvgComp;
