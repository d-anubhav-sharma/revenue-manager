import { configureStore } from "@reduxjs/toolkit";
import revenueReducer from "./Slice";

export default configureStore({ reducer: { revenue: revenueReducer } });
