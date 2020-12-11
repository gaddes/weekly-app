const selectCurrentTasks = state => state.tasks.current;
const selectArchiveTasks = state => state.tasks.archive;
const selectArchivedDays = state => state.tasks.archivedDays;

export default {
  selectCurrentTasks,
  selectArchiveTasks,
  selectArchivedDays,
};