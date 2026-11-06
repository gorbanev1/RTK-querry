import {
    createApi,
    fetchBaseQuery

} from "@reduxjs/toolkit/query/react";

import type {GetDecksResponse, BaseResponse, Deck} from "./decksApi.ts";

export const decksRtkApi = createApi({
    reducerPath: 'decksRtkApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || '/api/'
    }),
    endpoints: (builder) => ({
        getDecks: builder.query<GetDecksResponse, { page: number, pageSize: number }>({
            query: (params) => (
                {
                    url: 'decks',
                    params: params
                })

        }),
        createDeck: builder.mutation<BaseResponse<{item: Deck}>, string>({
            query: (name)=>({
                url: 'decks',
                method: "POST",
                body: {name}
            })
        })
    })
})

export const {useGetDecksQuery, useCreateDeckMutation} = decksRtkApi