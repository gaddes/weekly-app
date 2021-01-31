import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    subscription: undefined,
    lastLogin: undefined,
  },
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },

    setLastLogin: (state, action) => {
      state.lastLogin = action.payload;
    },
  },
});

// These actions can be re-exported (if required) from a separate 'actions' file,
//  but they should never be imported by a component directly from here.
export const { setSubscription, setLastLogin } = userSlice.actions;

export default userSlice.reducer;