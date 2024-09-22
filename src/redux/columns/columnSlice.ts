import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../types";

const initialState: ColumnType[] = [];

const columnSlice = createSlice({
  initialState,
  name: "columns",
  reducers: {
    setTitleColumn: (state, action) => {
      const newArray = state.map((column) => {
        if (column.id === action.payload.id) {
          column.title = action.payload.title;
        }
        return column;
      });

      state = newArray;
    },
    addColumn: (state, action) => {
      state.push(action.payload);
    },
    setColumns: (state, action) => {
      return action.payload;
    },
    setColumnsDrag: (state, action) => {
      state[action.payload.index].children = action.payload.children;
    },
    addChildrenColumn: (state, action) => {
      const columIndex = state.findIndex(
        (colum) => colum.id === action.payload.columnId
      );
      state[columIndex].children.push(action.payload.children);
    },
    updateChildrenColumn: (state, action) => {
      const columIndex = state.findIndex(
        (colum) => colum.id === action.payload.columnId
      );
      state[columIndex].children = state[columIndex].children.map((card) => {
        if (card.id === action.payload.children.id) {
          return action.payload.children;
        }
        return card;
      });
    },
    deleteColumn: (state, action) => {
      const columIndex = state.findIndex(
        (colum) => colum.id === action.payload
      );
      state.splice(columIndex, 1);
    },
    deleteChildrenItem: (state, action) => {
      const columIndex = state.findIndex(
        (colum) => colum.id === action.payload.idColumn
      );
      const childrenIndex = state[columIndex].children.findIndex(
        (colum) => colum.id === action.payload.idChildren
      );
      state[columIndex].children.splice(childrenIndex, 1);
    },
  },
});

export const {
  setTitleColumn,
  addColumn,
  setColumns,
  deleteColumn,
  deleteChildrenItem,
  updateChildrenColumn,
  addChildrenColumn,
  setColumnsDrag,
} = columnSlice.actions;

export default columnSlice.reducer;
