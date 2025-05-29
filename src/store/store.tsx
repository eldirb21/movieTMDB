import { configureStore, Middleware } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import logger from "redux-logger";

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    movieList: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
