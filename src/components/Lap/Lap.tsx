import { formattedSeconds } from "../../utils/format.utils";

import { LapProps } from "../../utils/types/LapProps.types";

const Lap: React.FC<LapProps> = ({ index, lap, onDelete }) => (
	<div className="stopwatch-lap">
		<div>
			<strong>{index}</strong>/ {formattedSeconds(lap)}{" "}
		</div>

		<button type="button" className="remove-btn" onClick={onDelete}>
			{" "}
			X{" "}
		</button>
	</div>
);

export default Lap;
