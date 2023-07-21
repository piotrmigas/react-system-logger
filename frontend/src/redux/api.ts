import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Log = { id: number; message: string; attention: boolean; tech: string; date: Date };

export const api = createApi({
  tagTypes: ['Log', 'Tech'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://system-logger-api.vercel.app' }),
  endpoints: (builder) => ({
    getLogs: builder.query<Log[], void>({
      query: () => '/logs',
      providesTags: ['Log'],
    }),
    searchLogs: builder.mutation<Log[], string>({
      query: (text) => ({
        url: text ? `/logs?q=${text}` : '/logs',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData('getLogs', undefined, () => {
              return data;
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addLog: builder.mutation<Log, Partial<Log>>({
      query: (body) => ({
        url: '/logs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Log'],
    }),
    deleteLog: builder.mutation<Log, number>({
      query: (id) => ({
        url: `/logs/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Log'],
    }),
    updateLog: builder.mutation<void, Pick<Log, 'id'> & Partial<Log>>({
      query: ({ id, ...patch }) => ({
        url: `/logs/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getLogs', undefined, (draft) => {
            draft.map((log) => (log.id === id ? patch : log));
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Log'],
    }),
    getTechs: builder.query<Tech[], void>({
      query: () => '/techs',
      providesTags: ['Tech'],
    }),
    addTech: builder.mutation<Tech, Partial<Tech>>({
      query: (body) => ({
        url: '/techs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tech'],
    }),
    deleteTech: builder.mutation<Tech, number>({
      query: (id) => ({
        url: `/techs/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Tech'],
    }),
  }),
});

export const {
  useGetLogsQuery,
  useUpdateLogMutation,
  useAddLogMutation,
  useDeleteLogMutation,
  useSearchLogsMutation,
  useGetTechsQuery,
  useAddTechMutation,
  useDeleteTechMutation,
} = api;
