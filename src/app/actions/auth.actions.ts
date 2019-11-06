import {Action} from '@ngrx/store';
import {User} from '../shared/models/user.model';

export const LOGIN_START = '[Auth Reducer] Login Start';
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {}
}
export const SIGN_UP_START = '[Auth Reducer] Sign up Start';
export class SignupStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: {email: string, password: string}) {}
}

export const AUTHENTICATE_SUCCESS = '[Auth Reducer] Login';
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: User) {}
}
export const AUTHENTICATE_FAIL = '[Auth Reducer] Login Fail';
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}
export const LOGOUT = '[Auth Reducer] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
}
export const AUTO_LOGIN = '[Auth Reducer] Auto Login';
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | AutoLogin;
