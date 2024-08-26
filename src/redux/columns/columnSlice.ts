import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../types";

const initialState: ColumnType[] = [];

const columnSlice = createSlice({
  initialState,
  name: "columns",
  reducers: {
    setTitleColumn: (state, action) => {
      const newAray = state.map((column) => {
        if (column.id === action.payload.id) {
          column.title = action.payload.title;
        }
        return column;
      });

      state = newAray;
    },
    addColumn: (state, action) => {
      state.push(action.payload);
    },
    setColumns: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTitleColumn, addColumn, setColumns } = columnSlice.actions;

export default columnSlice.reducer;
