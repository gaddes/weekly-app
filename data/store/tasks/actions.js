import { v4 as uuidv4 } from 'uuid';

import { tasks } from '../../api';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { setInitialState, setCurrent, setArchive } from './reducers';

// Thunks
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchInitialState())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const fetchInitialState = () => async dispatch => {
  const current = await tasks.getCurrent();
  const archive = await tasks.getArchive();

  dispatch(setInitialState({ current, archive }));
};

const addTask = item => (dispatch, getState) => {
  const { day, title, description, priority, currentDayIdx } = item;
  const state = getState().tasks;

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

  // Create copy of current state. This allows us to
  //  mutate it without causing errors in Redux.
  const current = [...state.current];

  // Update relevant day with new task data, or assign
  //  directly to this day if no data currently exists,
  //  e.g. on first app load
  current[day] = current[day]
    ? [...current[day], task]
    : [task];

  // Update ASYNC STORAGE
  return tasks.setCurrent(current)
    .then(() => {
      // Update REDUX STATE
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

const updateTask = item => (dispatch, getState) => {
  const { id, day, title, description, priority, currentDayIdx } = item;
  const state = getState().tasks;

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

  // Create copy of current state. This allows us to
  //  mutate it without causing errors in Redux.
  let current = [...state.current];

  // Add updated task to the specified day
  current[day] = [...current[day], task];

  // Remove old task (before it was updated)
  current = current.map(day => (
    // Filter out item with matching ID
    day.filter(item => item.id !== id)
  ));

  // Update ASYNC STORAGE
  return tasks.setCurrent(current)
    .then(() => {
      // Update REDUX STATE
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

const deleteTask = id => (dispatch, getState) => {
  const state = getState().tasks;

  const current = state.current.map(day => (
    // Filter out item with matching ID
    day.filter(item => item.id !== id)
  ));

  return tasks.setCurrent(current)
    .then(() => {
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

/**
 * TODO: not currently used but keeping as may be useful in future
 * Delete all current tasks from a particular day
 *
 * @param {number} dayIdx - integer representing day for which tasks should be deleted
 */
const deleteAllTasks = dayIdx => (dispatch, getState) => {
  const state = getState().tasks;

  const current = state.current.map((day, idx) => {
    if (idx === dayIdx) return [];
    return day;
  });

  return tasks.setCurrent(current)
    .then(() => {
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

const toggleCompleted = id => (dispatch, getState) => {
  const state = getState().tasks;

  const current = state.current.map(day => {
    return day.map(item => {
      return item.id === id
        // If item matches ID, toggle completed value
        ? { ...item, completed: !item.completed }
        : item;
    });
  });

  return tasks.setCurrent(current)
    .then(() => {
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

const addToArchive = items => (dispatch, getState) => {
  const state = getState().tasks;

  const low = items.filter(item => item.priority === 0);
  const medium = items.filter(item => item.priority === 1);
  const high = items.filter(item => item.priority === 2);

  const prioritisedTasks = [low, medium, high];

  // Add each newly-prioritised task to its respective priority
  //  within the existing archive
  const archive = state.archive.map((priority, idx) => {
    return [...priority, ...prioritisedTasks[idx]];
  });

  return tasks.setArchive(archive)
    .then(() => {
      dispatch(setArchive(archive));
    })
    .catch(e => { console.error(e); });
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

  return tasks.setArchive(archive)
    .then(() => {
      dispatch(setArchive(archive));
    })
    .catch(e => { console.error(e); });
};

const moveUncompletedTasksToArchive = currentDayIdx => (dispatch, getState) => {
  const state = getState().tasks;
  const incompleteTasks = [];

  // Get all incomplete tasks from previous days, EXCLUDING any
  //  that are flagged to next week or have already been completed.
  state.current.forEach((day, dayIdx) => {
    day.forEach(task => {
      const shouldBeArchived = !task.completed && !task.nextWeek && dayIdx < currentDayIdx;
      if (shouldBeArchived) {
        incompleteTasks.push(task);
      }
    });
  });

  if (incompleteTasks.length) {
    // Copy incomplete tasks to archive
    dispatch(addToArchive(incompleteTasks));

    // Remove incomplete tasks from current week
    incompleteTasks.forEach(task => {
      dispatch(deleteTask(task.id));
    })
  }
};

export default {
  addTask,
  updateTask,
  deleteTask,
  toggleCompleted,
  fetchInitialState,
  addToArchive,
  deleteFromArchive,
  moveUncompletedTasksToArchive,
};