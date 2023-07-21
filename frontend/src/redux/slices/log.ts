import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Log } from '../api';

type InitialState = {
  current: Log | null;
};

const initialState: InitialState = {
  current: null,
};

export const slice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Log>) => {
      state.current = action.payload;
    },
  },
});

export const { setCurrent } = slice.actions;

export const selectCurrent = (state: RootState) => state.log.current;

export default slice.reducer;
