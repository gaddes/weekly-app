import { v4 as uuidv4 } from 'uuid';

import { tasks } from '../../api';
import { archive } from '../../mockData';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { addTask, setInitialState, setCompleted } from './reducers';

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

const toggleCompleted = id => dispatch => {
  dispatch(setCompleted(id));
};

const saveTask = item => (dispatch, getState) => {
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
  const updatedState = [...state.current];

  // Update relevant day with new task data, or assign
  //  directly to this day if no data currently exists,
  //  e.g. on first app load
  updatedState[day] = updatedState[day]
    ? [...updatedState[day], task]
    : [task];
  // updatedState[day] = [...updatedState[day], task];

  // Update ASYNC STORAGE
  tasks.setCurrent(updatedState)
    .then(() => {
      // Update REDUX STATE
      dispatch(addTask(item));
    })
    .catch(e => { console.error(e); });
};

export default {
  // Actions
  addTask,
  setInitialState,
  setCompleted,
  // Thunks
  fetchInitialState,
  toggleCompleted,
  saveTask,
};