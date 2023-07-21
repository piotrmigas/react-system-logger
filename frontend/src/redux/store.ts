import { configureStore } from '@reduxjs/toolkit';
import log from './slices/log';
import { api } from './api';

export const store = configureStore({
  reducer: { log, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
