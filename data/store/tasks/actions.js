import { v4 as uuidv4 } from 'uuid';

import { tasks } from '../../api';
import { archive } from '../../mockData';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { setInitialState, setCurrent } from './reducers';

// Thunks
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchInitialState())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const fetchInitialState = () => async dispatch => {
  const current = await tasks.getCurrent();
  // TODO: fetch REAL data from core data
  const archiveTest = await tasks.getArchive();

  dispatch(setInitialState({ current, archive }));
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

export default {
  // Actions
  setInitialState,
  setCurrent,
  // Thunks
  addTask,
  deleteTask,
  toggleCompleted,
  fetchInitialState,
};