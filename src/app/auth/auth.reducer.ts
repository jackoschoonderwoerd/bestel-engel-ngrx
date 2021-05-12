import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean,
  userEmail: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  userEmail: null
}

export function authReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        userEmail: action.userEmail
      }
    case SET_UNAUTHENTICATED: 
      return {
        ...state,
        isAuthenticated: false,
        userEmail: null
      }
    default: 
      return {
        ...state
      }
  }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
export const getUserEmail = (state: AuthState) => state.userEmail;