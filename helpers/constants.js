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
  days,
  priorities,
  initialCurrent,
  initialArchive,
  initialArchivedDays,
};