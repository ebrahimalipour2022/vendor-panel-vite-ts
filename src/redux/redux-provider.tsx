import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
//
import { ReactNode } from 'react';
import { store, persistor } from './store';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
