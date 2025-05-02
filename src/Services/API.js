import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../Services/config";

const { baseURL, username, endpoints } = config;

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `${endpoints.profile}${username}`,
    }),
    getAbout: builder.query({
      query: () => `${endpoints.about}${username}`,
    }),
    getServices: builder.query({
      query: () => `${endpoints.services}${username}`,
      transformResponse: (res) => res?.data || {},
    }),
    getProjects: builder.query({
      query: () => `${endpoints.project}${username}`,
      transformResponse: (res) => res.data?.project || [],
    }),
    getBlogs: builder.query({
      query: () => `${endpoints.blog}${username}`,
      transformResponse: (res) => res.data?.data || [],
    }),
    getContact: builder.query({
      query: () => `${endpoints.contact}${username}`,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAboutQuery,
  useGetServicesQuery,
  useGetProjectsQuery,
  useGetBlogsQuery,
  useGetContactQuery,
} = portfolioApi;
