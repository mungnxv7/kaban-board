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
    addChildrenColumn: (state, action) => {
      const columIndex = state.findIndex(
        (colum) => colum.id === action.payload.columnId
      );
      state[columIndex].children.push(action.payload.children);
    },
  },
});

export const { setTitleColumn, addColumn, setColumns, addChildrenColumn } =
  columnSlice.actions;

export default columnSlice.reducer;
