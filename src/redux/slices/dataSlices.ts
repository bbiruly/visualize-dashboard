import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  _id: string;
  Day: string;
  Age: string;
  Gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

const initialState: Data[] = [];  // Initializing as an empty array

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Reducer to handle adding a new data object to the array
    addData: (state, action: PayloadAction<Data>) => {
      state.push(action.payload);  // Push the new data into the array
    },
    // Optionally, you can add a reducer to update or remove data based on _id
    // For example, to update an existing entry:
    updateData: (state, action: PayloadAction<Data>) => {
      const index = state.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;  // Update the existing entry
      }
    },
    // Or to delete an entry by _id:
    removeData: (state, action: PayloadAction<string>) => {
      return state.filter(item => item._id !== action.payload);  // Filter out the item by _id
    },
  }
});

export const { addData, updateData, removeData } = dataSlice.actions;

export default dataSlice.reducer;
