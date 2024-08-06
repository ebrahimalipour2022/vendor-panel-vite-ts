import { useCallback, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
// utils
import { getTokens, logout, setTokens } from '@/utils/token';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH_AFTER_LOGIN } from '@/config-global';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import type {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
  LoginData,
} from '../../types';
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

const VITE_IDP_API_URL = import.meta.env.VITE_IDP_API_URL;
const VITE_UM_API_URL = import.meta.env.VITE_UM_API_URL;
const VITE_UM_API_VERSION = import.meta.env.VITE_UM_API_VERSION;

export function AuthProvider({ children }: Props) {
  // HOOKS
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  // INITIALIZE
  const initialize = useCallback(async () => {
    try {
      const tokenObj = getTokens();
      if (tokenObj?.access_token) {
        setTokens(tokenObj);
        const response = await axios({
          method: 'GET',
          url: `${VITE_UM_API_URL}${VITE_UM_API_VERSION}/Customer/CustomerGeneralInfo`,
          headers: {
            Authorization: 'Bearer ' + tokenObj?.access_token,
          },
        });

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: { ...response.data },
          },
        });
        // const redirectURL = searchParams.get('redirectTo') ?? PATH_AFTER_LOGIN;
        // navigate(redirectURL);
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (values: LoginData) => {
    await axios({
      method: 'POST',
      url: `${VITE_IDP_API_URL}/connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data:
        values.method === 'user-pass'
          ? {
              username: values?.username,
              password: values?.password,
              grant_type: 'password',
              client_id: 'angular',
              scope: 'hasti_api offline_access profile',
              captcha_code: null,
            }
          : {
              username: values?.username,
              otp_code: values?.verificationCode,
              grant_type: 'otp',
              client_id: 'otp.client',
              scope: 'hasti_api openid profile',
            },
    })
      .then(({ data }) => {
        if (data) {
          setTokens(data);
          dispatch({
            type: Types.LOGIN,
            payload: {
              user: {
                username: values?.username,
              },
            },
          });
          navigate(PATH_AFTER_LOGIN, { replace: true });
        }
        // const redirectURL = searchParams.get('redirectTo') ?? PATH_AFTER_LOGIN;
      })
      .catch((err) => {
        toast.error(t('toast.unauthorized'));
      });
  }, []);

  // LOGOUT
  const signOut = useCallback(() => {
    try {
      logout();
      // dispatch({
      //   type: Types.LOGOUT,
      // });
    } catch (error) {
      /* empty */
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () =>
      ({
        user: state.user,
        method: '',
        loading: status === 'loading',
        authenticated: status === 'authenticated',
        unauthenticated: status === 'unauthenticated',
        //
        login,
        signOut,
      } as JWTContextType),
    [login, signOut, state.user, status]
  );
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
