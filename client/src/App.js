import React from "react";
import "./App.css";
import buildSchedule from "./schedule";
import ScheduleChart from "./chart";

function App() {
  const [schedule, setSchedule] = React.useState(null);
  React.useEffect(() => {
    if (!schedule) {
      setSchedule(buildSchedule());
    }
  }, [schedule]);
  if (!schedule) {
    return <p>Building schedule...</p>;
  }
  let outOfSeason = null;
  if (schedule.outOfSeasonVenues.length) {
    outOfSeason = (
      <div>
        <h2>Out of Season</h2>
        <ul>
          {schedule.outOfSeasonVenues.map((venue, venueIndex) => {
            return <li key={venueIndex}>{venue}</li>;
          })}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h2>Currently In Season</h2>
      <ScheduleChart today={schedule.today} dayOfWeek={schedule.dayOfWeek} />
      {outOfSeason}
    </div>
  );
}

export default App;
