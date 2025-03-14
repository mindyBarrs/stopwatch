import * as React from "react";
import { createRoot } from "react-dom/client";
import { Component, ClassAttributes } from "react";


const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);


/*
*
*  The following are the issues with the code
*   - ClassAttributes isn't need, unless we are going to access the components ref
* 
*/
interface StopwatchProps extends ClassAttributes<Stopwatch> {
initialSeconds: number;
}

/* 
*
*  The following are the issues with the code
*   - laps should be initialized in the constructor, 
*     and incrementer should be initialized in the state
*   - All of the handle... aren't boud to this class which will, 
*     cause an runtime errors when the classes are invoked.
*   - handleDeleteClick is missing the closing bracket, which will cause a sytx error
*   - render method is missing the closing bracket, which will cause a syntax error
*   - The return statement is outside of the render method, which will cause a syntax error
*   - The use if any type does defeat the purpose of using TypeScript
* 
*/
class Stopwatch extends Component<StopwatchProps, any> {
incrementer: any
  laps: any[]
  
constructor(props: StopwatchProps) {
super(props);
this.state = {
secondsElapsed: props.initialSeconds,
lastClearedIncrementer: null,
}
this.laps = [];
}
handleStartClick() {
this.incrementer = setInterval(() =>
this.setState({
secondsElapsed: this.state.secondsElapsed + 1,
}), 1000);
}
handleStopClick() {
clearInterval(this.incrementer);
this.setState({
lastClearedIncrementer: this.incrementer,
});
}
handleResetClick() {
clearInterval(this.incrementer);
this.laps = [],
this.setState({
secondsElapsed: 0,
});
}
handleLabClick() {
  this.laps = this.laps.concat([this.state.secondsElapsed]);
  
  // The forceUpdate method is not needed, best recommendation is to use the setState method
this.forceUpdate();
}
}// <- miss placed closing brack for the Stopwatch class

handleDeleteClick(index: number) {
  return () => this.laps.splice(index, 1);


  render() {
    const {
      secondsElapsed,
      lastClearedIncrementer,
    } = this.state;
  }

return (
<div className="stopwatch">
<h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
{(secondsElapsed === 0 || this.incrementer === lastClearedIncrementer
? <button type="button" className="start-btn"
onClick={this.handleStartClick}>start</button>
: <button type="button" className="stop-btn"
onClick={this.handleStopClick}>stop</button>
)}
{(secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer
? <button type="button" onClick={this.handleLabClick}>lap</button>
: null
)}
{(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer
? <button type="button" onClick={this.handleResetClick}>reset</button>
: null
)}
<div className="stopwatch-laps">
{ this.laps && this.laps.map((lap, i) =>
<Lap index={i+1} lap={lap} onDelete={this.handleDeleteClick(i)} />) }
</div>
</div>
);
}
}

/*
*
*  The following are the issues with the code
*  - OnDelete is typed as a () => {} which implies that it returns an empty object,
*    but it should be a function that returns void
* 
*/
const Lap = (props: { index: number, lap: number, onDelete: () => {} }) => (
<div key={props.index} className="stopwatch-lap">
<strong>{props.index}</strong>/ {formattedSeconds(props.lap)} <button
onClick={props.onDelete} > X </button>
</div>
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Stopwatch initialSeconds={0} />
  </React.StrictMode>
);