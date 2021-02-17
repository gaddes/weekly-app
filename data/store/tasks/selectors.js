import flatten from 'lodash/flatten';

const selectCurrentTasks = state => state.tasks.current;
const selectNumCurrentTasks = state => flatten(state.tasks.current).length;
const selectArchiveTasks = state => state.tasks.archive;

export default {
  selectCurrentTasks,
  selectNumCurrentTasks,
  selectArchiveTasks,
};