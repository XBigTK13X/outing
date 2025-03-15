import "./App.css";

import Hours from "./hours";

import buildSchedule from "./schedule";

const schedule = buildSchedule();

function App() {
  return (
    <div>
      {schedule.map((outing, outingIndex) => {
        return <div key={outingIndex}>{outing.venue}</div>;
      })}
    </div>
  );
}

export default App;
