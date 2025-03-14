import { useState, useEffect, useRef } from "react";

import Lap from "../Lap/Lap";

import { formattedSeconds } from "../../utils/format.utils";
import { StopwatchProps } from "../../utils/types/StopwatchProps.types";

const Stopwatch: React.FC<StopwatchProps> = ({ initialSeconds }) => {
	const [secondsElapsed, setSecondsElapsed] = useState<number>(initialSeconds);
	const [laps, setLaps] = useState<number[]>([]);
	const [isRunning, setIsRunning] = useState(false);

	const incrementer = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (incrementer.current) clearInterval(incrementer.current);
		};
	}, []);

	const handleStartClick = () => {
		if (!isRunning) {
			setIsRunning(true);
			incrementer.current = setInterval(() => {
				setSecondsElapsed((prev) => prev + 1);
			}, 1000);
		}
	};

	const handleStopClick = () => {
		if (isRunning && incrementer.current) {
			clearInterval(incrementer.current);
			setIsRunning(false);
		}
	};

	const handleResetClick = () => {
		if (incrementer.current) clearInterval(incrementer.current);
		setIsRunning(false);
		setSecondsElapsed(0);
		setLaps([]);
	};

	const handleLapClick = () => {
		setLaps((prevLaps) => [...prevLaps, secondsElapsed]);
	};

	const handleDeleteClick = (index: number) => {
		setLaps((prevLaps) => prevLaps.filter((_, i) => i !== index));
	};

	return (
		<div className="stopwatch">
			<h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

			<div className="stopwatch-controls">
				{!isRunning ? (
					<button
						type="button"
						className="start-btn"
						onClick={handleStartClick}
					>
						Start
					</button>
				) : (
					<button type="button" className="stop-btn" onClick={handleStopClick}>
						Stop
					</button>
				)}

				{secondsElapsed !== 0 && !isRunning && (
					<button
						type="button"
						className="reset-btn"
						onClick={handleResetClick}
					>
						Reset
					</button>
				)}

				{isRunning && (
					<button type="button" className="lap-btn" onClick={handleLapClick}>
						Lap
					</button>
				)}
			</div>

			<div className="stopwatch-laps">
				{laps.map((lap, i) => (
					<Lap
						key={i}
						index={i + 1}
						lap={lap}
						onDelete={() => handleDeleteClick(i)}
					/>
				))}
			</div>
		</div>
	);
};

export default Stopwatch;
