import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Data {
  data: { EUR: number; USD: number };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.freecurrencyapi.com" }),
  endpoints: (builder) => ({
    getRates: builder.query<Data, void>({
      query: () =>
        "/v1/latest?apikey=Ll0rKV34xAuhEugC7oxi5xlKiRFzmplW8GdYnOof&currencies=USD%2CEUR&base_currency=RUB",
    }),
  }),
});

export const { useGetRatesQuery } = apiSlice;
