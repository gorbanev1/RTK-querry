import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// Тот же подход, что в вашем учебном проекте:
// reducers: (create) => ({ fetchDecksTC: create.asyncThunk(...) })
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
