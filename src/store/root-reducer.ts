import { combineReducers } from 'redux';
import { umApi, vendorApi } from '@/store/api';

export const rootReducer = combineReducers({
  [vendorApi.reducerPath]: vendorApi.reducer,
  [umApi.reducerPath]: umApi.reducer,
});
