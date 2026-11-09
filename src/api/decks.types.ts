
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

