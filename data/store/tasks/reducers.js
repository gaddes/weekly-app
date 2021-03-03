import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: undefined,
    archive: undefined,
  },
  reducers: {
    setInitialState: (state, action) => {
      const { current, archive } = action.payload;
      state.current = current;
      state.archive = archive;
    },

    setCurrent: (state, action) => {
      state.current = action.payload;
    },

    setArchive: (state, action) => {
      state.archive = action.payload;
    },
  },
});

export const { setInitialState, setCurrent, setArchive } = taskSlice.actions;
export default taskSlice.reducer;