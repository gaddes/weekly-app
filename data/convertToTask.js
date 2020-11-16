export default function convertToTask(dataByWeek) {
  const dataByTask = [];

  dataByWeek.forEach((week, weekIdx) => {
    week.forEach((day, dayIdx) => {
      day.forEach(task => {
        const extendedTask = Object.assign({}, task, {
          week: weekIdx,
          day: dayIdx,
        });
        dataByTask.push(extendedTask);
      })
    })
  });

  return dataByTask;
}