import { instance } from "./instance"

export type Deck = {
  id: string
  name: string
  createdAt: string
}

export type GetDecksResponse = {
  items: Deck[]
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
}

export type BaseResponse<T> = {
  resultCode: number
  messages: string[]
  data: T
}

export const decksApi = {
  getDecks(params: { page: number; pageSize: number }) {
    return instance.get<GetDecksResponse>("decks", { params })
  },
  createDeck(name: string) {
    return instance.post<BaseResponse<{ item: Deck }>>("decks", { name })
  },
}
