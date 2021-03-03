import { v4 as uuidv4 } from 'uuid';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import isEmpty from 'lodash/isEmpty';

import { tasks } from '../../api';
import { archiveLimitFree } from '../../../helpers';
import { setInitialState, setCurrent, setArchive } from './reducers';


const getCurrent = (getState) => {
  const state = getState().tasks;
  // Return copy of state, so it can be mutated without causing Redux errors
  return [...state.current];
};

const saveCurrentTasks = (dispatch, updatedTasks) => (
  tasks.setCurrent(updatedTasks) // Update ASYNC STORAGE
    .then(() => dispatch(setCurrent(updatedTasks))) // Update REDUX STATE
    .catch(e => console.error(e))
);

const saveArchiveTasks = (dispatch, updatedTasks) => (
  tasks.setArchive(updatedTasks)
    .then(() => dispatch(setArchive(updatedTasks)))
    .catch(e => console.error(e))
);


/**
 * Retrieve tasks from Core Data on first app load, then set in state
 *
 * @returns {function(*): Promise<void>}
 */
const fetchInitialTasks = () => async dispatch => {
  const current = await tasks.getCurrent();
  const archive = await tasks.getArchive();

  dispatch(setInitialState({ current, archive }));
};

/**
 * Add new item to current tasks
 *
 * @param {Object} item
 * @returns {function(*, *): Promise<void>}
 */
const addTask = item => (dispatch, getState) => {
  const { day, title, description, priority, currentDayIdx } = item;
  const current = getCurrent(getState);

  const task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    priority,
    dateCreated: Date.now(),
  };

  if (day < currentDayIdx) {
    // Example: if today is Wednesday and this task was added to Tuesday,
    //  the user has most likely intended to add the task to NEXT week.
    // This flag will enable us to show this in the UI and, more importantly,
    //  we will only automatically delete tasks that are in the CURRENT week.
    task.nextWeek = true;
  }

  // Update relevant day with new task data, or assign directly to
  //  this day if no data currently exists, e.g. on first app load
  current[day] = current[day]
    ? [...current[day], task]
    : [task];

  return saveCurrentTasks(dispatch, current);
};

const updateTask = item => (dispatch, getState) => {
  const { id, day, title, description, priority, currentDayIdx } = item;
  let current = getCurrent(getState);

  const task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    priority,
    dateCreated: Date.now(),
  };

  if (day < currentDayIdx) {
    task.nextWeek = true; // Same logic as addTask action
  }

  // Add updated task to the specified day
  current[day] = [...current[day], task];

  // Remove old task (before it was updated)
  current = current.map(day => (
    // Filter out item with matching ID
    day.filter(item => item.id !== id)
  ));

  return saveCurrentTasks(dispatch, current);
};

const deleteTask = id => (dispatch, getState) => {
  const state = getState().tasks;

  const current = state.current.map(day => (
    // Filter out item with matching ID
    day.filter(item => item.id !== id)
  ));

  return saveCurrentTasks(dispatch, current);
};

/**
 * Remove multiple tasks by ID
 *
 * @param {Array} ids - List of ids for tasks to be deleted
 * @returns {function(*, *): Promise<void>}
 */
const deleteAllTasksById = ids => (dispatch, getState) => {
  const current = getCurrent(getState);
  const updatedCurrent = current.map(day => (
    day.filter(task => (
      !ids.includes(task.id)
    ))
  ));

  return saveCurrentTasks(dispatch, updatedCurrent);
};

/**
 * TODO: not currently used but keeping as may be useful in future
 * Delete all current tasks from a particular day
 *
 * @param {number} dayIdx - integer representing day for which tasks should be deleted
 */
const deleteAllTasksByDay = dayIdx => (dispatch, getState) => {
  const current = getCurrent(getState);
  const updatedCurrent = current.map((day, idx) => {
    if (idx === dayIdx) return [];
    return day;
  });

  return saveCurrentTasks(dispatch, updatedCurrent);
};

const toggleCompleted = id => (dispatch, getState) => {
  const current = getCurrent(getState);
  const updatedCurrent = current.map(day => {
    return day.map(item => {
      return item.id === id
        // If item matches ID, toggle completed value
        ? { ...item, completed: !item.completed }
        : item;
    });
  });

  return saveCurrentTasks(dispatch, updatedCurrent);
};

// TODO: can this helper function be re-written and used directly within `addToArchive` action?
//  or even better, can we extract this into a separate `helpers` sub-folder?
const removeOldest = archive => {
  // Sort by earliest > latest created
  const chronologicalFlatTasks = sortBy(flatten(archive), 'dateCreated');

  // Reverse array so is sorted by latest > earliest created
  reverse(chronologicalFlatTasks);

  // Remove tasks from archive so only `limit` number of tasks remain
  const items = chronologicalFlatTasks.slice(0, archiveLimitFree);

  // Reconstruct items into priority order
  const low = items.filter(item => item.priority === 0);
  const medium = items.filter(item => item.priority === 1);
  const high = items.filter(item => item.priority === 2);

  // Prioritised tasks (same structure as archive)
  return [low, medium, high];
};

const addToArchive = items => (dispatch, getState) => {
  const state = getState().tasks;
  const user = getState().user;
  const isPro = !isEmpty(user.subscription);

  const low = items.filter(item => item.priority === 0);
  const medium = items.filter(item => item.priority === 1);
  const high = items.filter(item => item.priority === 2);

  const prioritisedTasks = [low, medium, high];

  // Add each newly-prioritised task to its respective priority
  //  within the existing archive
  const archive = state.archive.map((priority, idx) => {
    return [...priority, ...prioritisedTasks[idx]];
  });

  // Limit number of tasks in archive for non-pro users
  const newArchive = isPro ? archive : removeOldest(archive);

  return saveArchiveTasks(dispatch, newArchive);
};

const deleteFromArchive = item => (dispatch, getState) => {
  const state = getState().tasks;

  const archive = state.archive.map((priority, idx) => {
    if (idx === item.priority) {
      // Create new array without this specific task
      return priority.filter(task => task.id !== item.id);
    }
    return priority;
  });

  return saveArchiveTasks(dispatch, archive);
};

/**
 * Remove `nextWeek` flags from the specified number of days prior to the current day,
 * then add incomplete tasks to the archive and remove them from the current week.
 *
 * @param currentDayIdx - integer representing the current day
 * @param numDays - number of days since user last logged in
 * @returns {function(*, *): Promise<void>}
 */
const archiveIncompleteTasks = (currentDayIdx, numDays) => async (dispatch, getState) => {
  const state = getState().tasks;

  const allDays = [0, 1, 2, 3, 4, 5, 6]; // Mon, Tue ... Sun
  const twoWeeksReversed = [6, 5, 4, 3, 2, 1, 0, 6, 5, 4, 3, 2, 1, 0];
  const indexOfCurrentDay = twoWeeksReversed.indexOf(currentDayIdx);
  const incompleteTasks = [];

  // By default, Array.slice INCLUDES start value and EXCLUDES end value;
  //  see comments on individual params explaining why we +1 to each.
  const indicesOfDaysSinceLastLogin = twoWeeksReversed.slice(
    indexOfCurrentDay + 1, // +1 to EXCLUDE idx for current day
    indexOfCurrentDay + 1 + numDays, // +1 to INCLUDE idx for final day
  );

  // Add all days with idx greater than current day.
  // Example: user logs in on Monday, so all idx > 0 are in the
  //  current week, and should have their `nextWeek` label removed.
  const indicesOfDaysEqualToOrGreaterThanCurrent = allDays.slice(
    allDays.findIndex(idx => idx === currentDayIdx), // Start value (included)
    allDays.length, // End value (is NOT included in returned array)
  );

  // Merge arrays and remove duplicates
  const indicesOfDaysToRemoveNextWeekFlag = uniq([
    ...indicesOfDaysSinceLastLogin,
    ...indicesOfDaysEqualToOrGreaterThanCurrent,
  ]);

  // IF number of days since last login equals one week or more, get ALL day indices,
  // ELSE get specific day indices.
  const daysToArchive = numDays > allDays.length - 1
    ? allDays
    : indicesOfDaysSinceLastLogin;

  // Remove `nextWeek` flag from days that are now in the current week
  const currentTasks = state.current.map((day, idx) => {
    // If flag should not be removed, return unmodified day
    if (!indicesOfDaysToRemoveNextWeekFlag.includes(idx)) return day;

    return day.map(originalTask => {
      const task = { ...originalTask };
      delete task.nextWeek;
      return task;
    });
  });

  // Get all incomplete tasks from previous days, EXCLUDING any
  //  that are flagged to next week or have already been completed.
  currentTasks.forEach((day, dayIdx) => {
    day.forEach(task => {
      const shouldBeArchived = !task.completed && !task.nextWeek && daysToArchive.includes(dayIdx);
      if (shouldBeArchived) {
        incompleteTasks.push(task);
      }
    });
  });

  if (incompleteTasks.length) {
    // Create map of all incomplete task ids (to be deleted)
    const incompleteIds = incompleteTasks.map(task => task.id);

    return await Promise.all([
      // Copy incomplete tasks to archive
      dispatch(addToArchive(incompleteTasks)),
      // Remove incomplete tasks from current week
      dispatch(deleteAllTasksById(incompleteIds)),
    ]);
  }

  return Promise.resolve('There are no uncompleted tasks');
};

export default {
  addTask,
  updateTask,
  deleteTask,
  toggleCompleted,
  fetchInitialTasks,
  deleteFromArchive,
  archiveIncompleteTasks,
};