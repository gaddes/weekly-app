import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import actions from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  current: [],
  archive: [],
  archivedDays: [],
};

describe('actions', () => {
  it('saveArchivedDays sets all flags to false when dayIdx === null', async () => {
    const store = mockStore(initialState);

    await store.dispatch(actions.saveArchivedDays(null));

    expect(store.getActions()).toEqual([{
      payload: [ false, false, false, false, false, false, false ],
      type: 'tasks/setArchivedDays',
    }]);
  })
});