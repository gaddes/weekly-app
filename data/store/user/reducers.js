import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    subscription: undefined,
  },
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

// These actions can be re-exported (if required) from a separate 'actions' file,
//  but they should never be imported by a component directly from here.
export const { setSubscription } = userSlice.actions;

export default userSlice.reducer;