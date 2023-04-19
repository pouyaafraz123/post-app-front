// date tools will be place here
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

export function convertToTwoDigits(num: number): string {
  return ("00" + num).slice(-2);
}

// function to create string from number at given length and add 0 to start
function padWithZero(num: number, minLength: number) {
  const numberString = num?.toString();
  if (numberString?.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString?.length) + numberString;
}

// function that convert date to readable string
function humanizedDate(
  date: string | Date,
  showTime?: boolean,
  showDay?: boolean,
): string {
  const dateInstance = typeof date === "string" ? new Date(date) : date;
  const time = `${dateInstance?.getHours()}:${padWithZero(
    dateInstance?.getMinutes(),
    2,
  )}`;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = dateInstance?.getDay();
  const humanizedDate = `${showDay ? weekday[day] : ""} ${
    monthNames[dateInstance?.getMonth()]
  } ${dateInstance?.getDate()}, ${dateInstance?.getFullYear()} ${
    showTime ? time : ""
  }`;

  return humanizedDate;
}

// function that convert data to readable string and return its time
function humanizedTime(date: any, utc?: boolean): string {
  const dateInstance = new Date(date);

  const output = `${padWithZero(dateInstance?.getHours(), 2)}:${padWithZero(
    dateInstance.getMinutes(),
    2,
  )}`;
  const utcOutput = `${padWithZero(
    dateInstance?.getUTCHours(),
    2,
  )}:${padWithZero(dateInstance?.getUTCMinutes(), 2)}`;

  if (utc) return utcOutput;

  return output;
}

// convert date to string
function convertToAPIDateFormat(date: string | Date): string {
  if (!!date) {
    const dateInstance = new Date(date);
    const year = dateInstance.getFullYear();
    const month = convertToTwoDigits(dateInstance.getMonth() + 1);
    const day = convertToTwoDigits(dateInstance.getDate());
    return `${year}-${month}-${day}`;
  }
  return "";
}

// convert date to string
function convertToAPIFullDateFormat(
  date: string | Date,
  utc?: boolean,
): string {
  if (!!date) {
    const dateInstance = new Date(date);
    const _date = convertToAPIDateFormat(date);
    const hour = convertToTwoDigits(
      utc ? dateInstance.getUTCHours() : dateInstance.getHours(),
    );
    const minute = convertToTwoDigits(
      utc ? dateInstance.getUTCMinutes() : dateInstance.getMinutes(),
    );
    // const seconds = convertToTwoDigits(
    //   utc ? dateInstance.getUTCSeconds() : dateInstance.getSeconds()
    // );
    return `${_date} ${hour}:${minute}`;
  }
  return "";
}

// convert date string to full date
function convertToFullDateFormat(date: string | Date): string {
  const dateInstance = new Date(date);
  const year = dateInstance.getFullYear();
  const month = convertToTwoDigits(dateInstance.getMonth() + 1);
  const day = convertToTwoDigits(dateInstance.getDate());

  const time = `${dateInstance.getHours()}:${padWithZero(
    dateInstance.getMinutes(),
    2,
  )}:${padWithZero(dateInstance.getSeconds(), 2)}`;
  const dateSlash = `${month}/${day}/${year}`;

  return `${dateSlash} - ${time}`;
}

function convertToDate(date: string | Date): string {
  const dateInstance = new Date(date);
  const year = dateInstance.getFullYear();
  const month = convertToTwoDigits(dateInstance.getMonth() + 1);
  const day = convertToTwoDigits(dateInstance.getDate());
  const dateSlash = `${month}/${day}/${year}`;

  return `${dateSlash}`;
}

function convertToTime(date: string | Date): string {
  const dateInstance = new Date(date);

  const time = `${dateInstance.getHours()}:${padWithZero(
    dateInstance.getMinutes(),
    2,
  )}:${padWithZero(dateInstance.getSeconds(), 2)}`;

  return `${time}`;
}

function getDaysBetween(date: [Date | null, Date | null]) {
  const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
  if (date[0] && date[1]) {
    const start: number = date[0].getTime();
    const end: number = date[1].getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    return Array.from(
      new Array(daysBetweenDates),
      (v, i) => new Date(start + i * MS_PER_DAY),
    );
  }
  return [];
}

function isTimeOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  var e1start = aStart.getTime();
  var e1end = aEnd.getTime();
  var e2start = bStart.getTime();
  var e2end = bEnd.getTime();

  return (
    (e1start > e2start && e1start < e2end) ||
    (e2start > e1start && e2start < e1end)
  );
}

function isPastFrom24H(date: Date) {
  return new Date().getTime() - date.getTime() < 24 * 60 * 60 * 1000;
}

function isPast(date: Date) {
  return date.getTime() < Date.now();
}

export {
  isPastFrom24H,
  humanizedDate,
  convertToAPIDateFormat,
  convertToAPIFullDateFormat,
  humanizedTime,
  padWithZero,
  convertToFullDateFormat,
  getDaysBetween,
  isTimeOverlap,
  convertToDate,
  convertToTime,
  isPast,
};
