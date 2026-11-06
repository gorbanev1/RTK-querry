import {configureStore} from '@reduxjs/toolkit'
import {decksRtkApi} from "../api/decksRtkApi.ts";
import {decksReducer} from "../features/decks/decksSlice.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    [decksRtkApi.reducerPath]: decksRtkApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(decksRtkApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch=useDispatch.withTypes<AddDispatch>()
export const useAppSelector=useSelector.withTypes<RootState>()
