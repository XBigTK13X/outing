import "./App.css";

import Hours from "./hours";

import buildSchedule from "./schedule";

buildSchedule();

function App() {
  return (
    <div>
      {Hours.map((hour, hourIndex) => {
        return <div key={hourIndex}>{hour.Venue}</div>;
      })}
    </div>
  );
}

export default App;
