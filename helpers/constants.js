// Order of items must match "priorities" array declared in this file
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

const initialArchivedDays = [
  // TRUE if day has already been archived for the current week
  false, false, false, false, false, false, false,
];

export {
  colors,
  days,
  priorities,
  initialCurrent,
  initialArchive,
  initialArchivedDays,
};