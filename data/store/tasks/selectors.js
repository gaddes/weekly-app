const selectCurrentTasks = state => state.tasks.current;
const selectArchiveTasks = state => state.tasks.archive;

export default {
  selectCurrentTasks,
  selectArchiveTasks,
};