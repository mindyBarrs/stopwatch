import { formattedSeconds } from "../../utils/format.utils";

import { LapProps } from "../../utils/types/LapProps.types";

const Lap: React.FC<LapProps> = ({ index, lap, onDelete }) => (
	<div className="stopwatch-lap">
		<strong>{index}</strong>/ {formattedSeconds(lap)}{" "}
		<button onClick={onDelete}> X </button>
	</div>
);

export default Lap;
