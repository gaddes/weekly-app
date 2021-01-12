import { v4 as uuidv4 } from 'uuid';
import isNumber from 'lodash/isNumber';

import { tasks } from '../../api';
import { initialArchivedDays } from '../../../helpers';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { setInitialState, setCurrent, setArchive, setArchivedDays } from './reducers';

// Thunks
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchInitialState())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const fetchInitialState = () => async dispatch => {
  const current = await tasks.getCurrent();
  const archive = await tasks.getArchive();
  const archivedDays = await tasks.getArchivedDays();

  dispatch(setInitialState({ current, archive, archivedDays }));
};

const addTask = item => (dispatch, getState) => {
  const { day, title, description, priority } = item;
  const state = getState().tasks;

  const task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    priority,
    dateCreated: Date.now(),
  };

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
  tasks.setCurrent(current)
    .then(() => {
      // Update REDUX STATE
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

const updateTask = item => (dispatch, getState) => {
  const { id, day, title, description, priority } = item;
  const state = getState().tasks;

  const task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    priority,
    dateCreated: Date.now(),
  };

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
  tasks.setCurrent(current)
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

  tasks.setCurrent(current)
    .then(() => {
      dispatch(setCurrent(current));
    })
    .catch(e => { console.error(e); });
};

/**
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

  tasks.setCurrent(current)
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

  tasks.setCurrent(current)
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

  tasks.setArchive(archive)
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

  tasks.setArchive(archive)
    .then(() => {
      dispatch(setArchive(archive));
    })
    .catch(e => { console.error(e); });
};

const saveArchivedDays = dayIdx => (dispatch, getState) => {
  const state = getState().tasks;

  /**
   * IF param 'dayIdx' is a number, assign TRUE to the respective day (i.e. archived)
   * ELSE reset days to initial state.
   *
   * This allows us to pass no param (or 'null') to reset days.
   */
  const days = isNumber(dayIdx)
    ? state.archivedDays.map((day, idx) => {
      if (idx === dayIdx) return true;
      return day;
    })
    : initialArchivedDays;

  tasks.setArchivedDays(days)
    .then(() => {
      dispatch(setArchivedDays(days));
    })
    .catch(e => { console.error(e); });
};

export default {
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  toggleCompleted,
  fetchInitialState,
  addToArchive,
  deleteFromArchive,
  saveArchivedDays,
};