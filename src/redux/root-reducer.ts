import { combineReducers } from 'redux';
import { umApi, vendorApi } from '@/redux/api';

export const rootReducer = combineReducers({
  [vendorApi.reducerPath]: vendorApi.reducer,
  [umApi.reducerPath]: umApi.reducer,
});
