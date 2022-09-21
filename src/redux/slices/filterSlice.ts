import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface EditBoxState {
  account: string;
  startDate: string;
  endDate: string;
  unit: string;
  changed: boolean;
}

const initialState: EditBoxState = {
  account: '',
  startDate: '',
  endDate: '',
  unit: '',
  changed: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
      state.changed = true;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
      state.changed = true;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
      state.changed = true;
    },
    setUnit: (state, action: PayloadAction<string>) => {
      state.unit = action.payload;
      state.changed = true;
    },
    setChangeStatus: (state) => {
      state.changed = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccount,
  setStartDate,
  setEndDate,
  setUnit,
  setChangeStatus,
} = filterSlice.actions;

export default filterSlice.reducer;
