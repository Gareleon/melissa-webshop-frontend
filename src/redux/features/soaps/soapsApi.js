import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/soaps`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log(token); //This is correctly logging token...
    if (token) {
      headers.set(`Authorization`, `Bearer ${token}`);
    }
    return headers;
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
      providesTags: (result, error, id) => [{ type: "Soaps", id }],
    }),
    addSoap: builder.mutation({
      query: (newSoap) => ({
        url: `/`,
        method: "POST",
        body: newSoap,
      }),
      invalidatesTags: ["Soaps"],
    }),
    editSoap: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
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
