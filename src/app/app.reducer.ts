import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface GlobalState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsSidenavOpen = createSelector(getUiState, fromUI.getIsSidenavOpen);
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);