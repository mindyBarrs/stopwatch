import React from "react";
import { createRoot } from "react-dom/client";
import { Component } from "react";

/*
 *
 *  The following are improvements made to the code
 *   - Create a StopwatchState interface to define the state of the Stopwatch component
 *      and added laps to the state
 *   - Bound all the methods in the constructor to the class instance
 *   - Added a type to the onDelete prop in the Lap component
 *   - Corrected all of the syntex errors in the code
 *   - Removed the use of any and replaced it with the correct types
 *
 */

const formattedSeconds = (sec: number) =>
	Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps {
	initialSeconds: number;
}

interface StopwatchState {
	laps: number[];
	secondsElapsed: number;
	lastClearedIncrementer: NodeJS.Timeout | null;
}

class Stopwatch extends Component<StopwatchProps, StopwatchState> {
	incrementer: NodeJS.Timeout | null = null;

	constructor(props: StopwatchProps) {
		super(props);

		this.state = {
			secondsElapsed: props.initialSeconds,
			lastClearedIncrementer: null,
			laps: [],
		};

		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.handleLabClick = this.handleLabClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	handleStartClick() {
		this.incrementer = setInterval(
			() =>
				this.setState({
					secondsElapsed: this.state.secondsElapsed + 1,
				}),
			1000
		);
	}

	handleStopClick() {
		if (this.incrementer !== null) {
			clearInterval(this.incrementer);
		}

		this.setState({
			lastClearedIncrementer: this.incrementer,
		});
	}

	handleResetClick() {
		if (this.incrementer !== null) {
			clearInterval(this.incrementer);
		}

		this.setState({
			secondsElapsed: 0,
			laps: [],
		});
	}

	handleLabClick() {
		this.setState((prevState) => ({
			laps: prevState.laps.concat([prevState.secondsElapsed]),
		}));
	}

	handleDeleteClick(index: number) {
		return () => {
			this.setState((prevState) => ({
				laps: prevState.laps.filter((_, i) => i !== index),
			}));
		};
	}

	render() {
		const { secondsElapsed, lastClearedIncrementer } = this.state;

		return (
			<div className="stopwatch">
				<h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
				{secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
					<button
						type="button"
						className="start-btn"
						onClick={this.handleStartClick}
					>
						start
					</button>
				) : (
					<button
						type="button"
						className="stop-btn"
						onClick={this.handleStopClick}
					>
						stop
					</button>
				)}
				{secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
					<button type="button" onClick={this.handleLabClick}>
						lap
					</button>
				) : null}
				{secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
					<button type="button" onClick={this.handleResetClick}>
						reset
					</button>
				) : null}
				<div className="stopwatch-laps">
					{this.state.laps &&
						this.state.laps.map((lap, i) => (
							<Lap
								index={i + 1}
								lap={lap}
								onDelete={this.handleDeleteClick(i)}
							/>
						))}
				</div>
			</div>
		);
	}
}

const Lap = (props: { index: number; lap: number; onDelete: () => void }) => (
	<div key={props.index} className="stopwatch-lap">
		<strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
		<button onClick={props.onDelete}> X </button>
	</div>
);

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Stopwatch initialSeconds={0} />
	</React.StrictMode>
);
