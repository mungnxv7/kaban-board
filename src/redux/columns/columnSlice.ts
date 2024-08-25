import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../types";

const initialState: ColumnType[] = [];

const columnSlice = createSlice({
  initialState,
  name: "columns",
  reducers: {
    setTitleColumn: (state, action) => {
      console.log(action);

      const newAray = state.map((column) => {
        if (column.id === action.payload.id) {
          column.title = action.payload.title;
        }
        return column;
      });
      console.log(newAray);
    },
    addColumn: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setTitleColumn, addColumn } = columnSlice.actions;

export default columnSlice.reducer;
