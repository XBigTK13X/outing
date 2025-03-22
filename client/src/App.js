import React from "react";
import "./App.css";
import buildSchedule from "./schedule";
import ScheduleChart from "./chart";

function App() {
  const [schedule, setSchedule] = React.useState(null);
  const [dateOffset, setDateOffset] = React.useState(0);
  const [chartIsVertical, setChartIsVertical] = React.useState(true);
  React.useEffect(() => {
    if (!schedule) {
      setSchedule(buildSchedule(dateOffset));
    }
  }, [schedule, dateOffset]);

  const changeDate = (offset) => {
    setSchedule(null);
    setDateOffset(offset);
  };

  if (!schedule) {
    return <p>Building schedule...</p>;
  }
  let dailyClosures = null;
  if (schedule.closedVenues.length) {
    dailyClosures = (
      <div>
        <h2>Closed for the Day</h2>
        <ul>
          {schedule.closedVenues.map((venue, venueIndex) => {
            return <li key={venueIndex}>{venue}</li>;
          })}
        </ul>
      </div>
    );
  }
  let outOfSeason = null;
  if (schedule.outOfSeasonVenues.length) {
    outOfSeason = (
      <div>
        <h2>Closed for the Season</h2>
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
      <p className="centered">Checking {dateOffset} days from now.</p>
      <button
        onClick={() => {
          changeDate(dateOffset - 1);
        }}
      >
        Previous Day
      </button>
      <button
        onClick={() => {
          changeDate(dateOffset + 1);
        }}
      >
        Next Day
      </button>
      <button
        onClick={() => {
          setChartIsVertical(!chartIsVertical);
        }}
      >
        Rotate Chart
      </button>
      <h2>Currently In Season</h2>
      <ScheduleChart
        vertical={chartIsVertical}
        today={schedule.today}
        dayOfWeek={schedule.dayOfWeek}
        monthDate={schedule.monthDate}
      />
      {dailyClosures}
      {outOfSeason}
    </div>
  );
}

export default App;
