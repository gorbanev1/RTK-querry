import {configureStore} from '@reduxjs/toolkit'
import {decksRtkApi} from "../api/decksRtkApi.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    [decksRtkApi.reducerPath]: decksRtkApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(decksRtkApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch=useDispatch.withTypes<AddDispatch>()
export const useAppSelector=useSelector.withTypes<RootState>()
