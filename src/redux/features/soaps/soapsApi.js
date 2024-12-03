import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/soaps`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set(`Authorization`, `Bearer ${token}`);
    }
    return Headers;
  },
});

const soapsApi = createApi({
  reducerPath: "soapApi",
  baseQuery,
  tagTypes: ["Soaps"],
  endpoints: (builder) => ({
    fetchAllSoaps: builder.query({
      query: () => "/",
      providesTags: ["Soaps"],
    }),
    fetchSoapById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id }],
    }),
    addSoap: builder.mutation({
      query: (newBook) => ({
        url: `/create-soap`,
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Soaps"],
    }),
    editSoap: builder.mutation({
      query: (id, ...rest) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Soaps"],
    }),
    deleteSoap: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Soaps"],
    }),
  }),
});

export const {
  useFetchAllSoapsQuery,
  useFetchSoapByIdQuery,
  useAddSoapMutation,
  useEditSoapMutation,
  useDeleteSoapMutation,
} = soapsApi;
export default soapsApi;
