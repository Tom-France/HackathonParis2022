import { configureStore } from "@reduxjs/toolkit";
import tagsSlice from "./tagsSlice";

export const store = configureStore({
  reducer: {
    tags: tagsSlice,
  }
});
