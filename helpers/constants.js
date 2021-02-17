// Order of colors must match "priorities" array declared in this file
const colors = [
  'green',
  'orange',
  'red',
];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const priorities = [
  'Low',
  'Medium',
  'High',
];

const initialCurrent = [
  // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  [], [], [], [], [], [], [],
];

const initialArchive = [
  // Low, Medium, High
  [], [], [],
];

const taskLimitFree = 7;
const taskLimitPro = 9999;

const archiveLimitFree = 10;
const archiveLimitPro = 9999;

export {
  colors,
  days,
  priorities,
  initialCurrent,
  initialArchive,
  taskLimitFree,
  taskLimitPro,
  archiveLimitFree,
  archiveLimitPro,
};