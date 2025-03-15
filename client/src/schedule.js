import Hours from "./hours";

import Holidays from "date-holidays";

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

  let holiday_lookup = {};
  for (let holiday of holidays) {
    if (holiday.name === "Memorial Day" || holiday.name === "Labor Day") {
      let date = new Date(holiday.start);
      holiday_lookup[holiday.name] = {
        month: date.getMonth(),
        date: date.getDate(),
      };
    }
  }

  const nowMonth = now.toLocaleString("default", { month: "long" });
  const nowDate = now.getDate();
  const nowDayOfWeek = now.getDay();
  let todaysOutings = [];

  const parseMonthAndDate = (startOrEnd) => {
    let foundMonth = startOrEnd.split(" ")[0];
    let foundDate = startOrEnd.split(" ")[1];
    if (holiday_lookup.hasOwnProperty(startOrEnd)) {
      foundMonth = holiday_lookup[startOrEnd].month;
      foundDate = holiday_lookup[startOrEnd].date;
    } else {
      foundMonth = monthNames.indexOf(foundMonth);
      foundDate = parseInt(foundDate);
    }
    return {
      month: foundMonth,
      date: foundDate,
    };
  };

  for (let hour of Hours) {
    let start = parseMonthAndDate(hour.Date_Start);
    let end = parseMonthAndDate(hour.Date_End);
    if (nowMonth >= start.month && nowMonth <= end.month) {
      if (
        (nowMonth !== start.month && nowMonth !== end.month) ||
        (nowMonth === start.month && nowDate >= start.date) ||
        (nowMonth === end.month && nowDate <= end.date)
      ) {
        todaysOutings.push({
          venue: hour.Venue,
          openTime: hour[`${nowDayOfWeek}_Start`],
          closeTime: hour[`${nowDayOfWeek}_End`],
        });
      }
    }
  }

  return todaysOutings;
};

export default buildSchedule;
