import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import { umApi, vendorApi } from '@/redux/api';
import { rootReducer, rootPersistConfig } from './root-reducer';

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      // }
    })
      .concat(vendorApi.middleware)
      // .concat(idpApi.middleware)
      .concat(umApi.middleware),
});

const persistor = persistStore(store);

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
export { store, dispatch, persistor, useSelector, useDispatch };
