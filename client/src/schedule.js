import Hours from "./hours";

var Holidays = require("date-holidays");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const buildSchedule = () => {
  const now = new Date();

  var hd = new Holidays("US");
  let holidays = hd.getHolidays(now.getYear());

  const month = now.toLocaleString("default", { month: "long" });
  const day = now.getDate();
  let timeline = [];

  for (let hour of Hours) {
    let startMonth = hour.Date_Start.split(" ")[0];
    let startDate = hour.Date_Start.split(" ")[1];
    if (startDate.indexOf("Day") !== -1) {
    }
    console.log({ startDate, startMonth });
  }
};

export default buildSchedule;
