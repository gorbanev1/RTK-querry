import { createAppSlice } from "../../common/createAppSlice"
import { decksApi, type Deck } from "../../api/decksApi"

type Status = "idle" | "loading" | "succeeded" | "failed"

type DecksState = {
  items: Deck[]
  status: Status
  error: string | null
  isCreating: boolean
  createError: string | null
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

const initialState: DecksState = {
  items: [],
  status: "idle",
  error: null,
  isCreating: false,
  createError: null,
  page: 1,
  pageSize: 10,
  totalCount: 0,
  pagesCount: 0,
}

export const decksSlice = createAppSlice({
  name: "decks",
  initialState,
  selectors: {
    selectDecks: (state) => state.items,
    selectDecksStatus: (state) => state.status,
  },
  reducers: (create) => ({
    fetchDecksTC: create.asyncThunk(
      async (params: { page: number; pageSize: number }, { rejectWithValue }) => {
        try {
          const response = await decksApi.getDecks(params)
          return response.data
        } catch {
          return rejectWithValue("Не удалось загрузить колоды")
        }
      },
      {
        pending: (state) => {
          state.status = "loading"
          state.error = null
        },
        fulfilled: (state, action) => {
          state.items = action.payload.items
          state.totalCount = action.payload.totalCount
          state.pagesCount = action.payload.pagesCount
          state.page = action.payload.page
          state.pageSize = action.payload.pageSize
          state.status = "succeeded"
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = typeof action.payload === "string" ? action.payload : "Ошибка загрузки"
        },
      },
    ),
    createDeckTC: create.asyncThunk(
      async (name: string, { rejectWithValue }) => {
        try {
          const response = await decksApi.createDeck(name)
          return response.data.data.item
        } catch {
          return rejectWithValue("Не удалось создать колоду")
        }
      },
      {
        pending: (state) => {
          state.isCreating = true
          state.createError = null
        },
        fulfilled: (state) => {
          state.isCreating = false
          // После создания компонент повторно запрашивает страницу 1.
          // Так список и пагинация остаются синхронизированы с сервером.
        },
        rejected: (state, action) => {
          state.isCreating = false
          state.createError = typeof action.payload === "string" ? action.payload : "Ошибка создания"
        },
      },
    ),
  }),
})

export const { fetchDecksTC, createDeckTC } = decksSlice.actions
export const { selectDecks, selectDecksStatus } = decksSlice.selectors
export const decksReducer = decksSlice.reducer
