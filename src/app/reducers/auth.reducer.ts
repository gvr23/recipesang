import {User} from '../shared/models/user.model';
import * as AuthActions from '../actions/auth.actions';
import {act} from '@ngrx/effects';


export interface AuthState {
  loading: boolean;
  user: User;
  loginErrorMessage: string;
  redirect: boolean;
}

const INITIAL_STATE: AuthState = {
  loading: false,
  user: null,
  loginErrorMessage: null,
  redirect: false
};

export function AuthReducer(state = INITIAL_STATE, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        user: null,
        loading: true,
        loginErrorMessage: null
      };
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        loading: true,
        loginErrorMessage: null
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        redirect: action.payload.redirect,
        loading: false,
        loginErrorMessage: null
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        loginErrorMessage: action.payload
      };
    case AuthActions.LOGOUT:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
}
