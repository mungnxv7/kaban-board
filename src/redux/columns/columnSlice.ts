import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../../types";

const initialState: ColumnType[] = [];

const columnSlice = createSlice({
  initialState,
  name: "column",
  reducers: {},
});

export default columnSlice.reducer;
