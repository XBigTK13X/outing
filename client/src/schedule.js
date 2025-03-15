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
  let holidays = hd.getHolidays(now.getFullYear());

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

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDayOfWeek = weekday[now.getDay()];
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

  const timeToFloat = (openOrClose) => {
    let hour = parseFloat(openOrClose.split(":")[0]);
    if (openOrClose.indexOf(":30") !== -1) {
      hour += 0.5;
    }
    if (openOrClose.indexOf("PM") !== -1) {
      hour += 12;
    }
    return hour;
  };

  const inSeasonVenues = [];
  const outOfSeasonVenues = [];

  for (let outingSchedule of Hours) {
    let start = parseMonthAndDate(outingSchedule.Date_Start);
    let end = parseMonthAndDate(outingSchedule.Date_End);
    if (start.month > end.month) {
      if (nowMonth < start.month) {
        start.dateTime = new Date(nowYear - 1, start.month, start.date);
        end.dateTime = new Date(nowYear, end.month, end.date);
      } else {
        start.dateTime = new Date(nowYear, start.month, start.date);
        end.dateTime = new Date(nowYear + 1, end.month, end.date);
      }
    } else {
      start.dateTime = new Date(nowYear, start.month, start.date);
      end.dateTime = new Date(nowYear, end.month, end.date);
    }
    if (start === "Closed" || end === "Closed") {
      continue;
    }
    if (now >= start.dateTime && now <= end.dateTime) {
      let outing = {
        venue: outingSchedule.Venue,
        openTime: outingSchedule[`${nowDayOfWeek}_Start`],
        openFloat: timeToFloat(outingSchedule[`${nowDayOfWeek}_Start`]),
        closeTime: outingSchedule[`${nowDayOfWeek}_End`],
        closeFloat: timeToFloat(outingSchedule[`${nowDayOfWeek}_End`]),
      };

      todaysOutings.push(outing);
      if (inSeasonVenues.indexOf(outingSchedule.Venue) === -1) {
        inSeasonVenues.push(outingSchedule.Venue);
      }
    }
  }
  for (let outingSchedule of Hours) {
    if (
      inSeasonVenues.indexOf(outingSchedule.Venue) === -1 &&
      outOfSeasonVenues.indexOf(outingSchedule.Venue) === -1
    ) {
      outOfSeasonVenues.push(outingSchedule.Venue);
    }
  }

  return {
    today: todaysOutings,
    dayOfWeek: nowDayOfWeek,
    inSeasonVenues,
    outOfSeasonVenues,
  };
};

export default buildSchedule;
