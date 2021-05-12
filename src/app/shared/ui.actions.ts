import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[UI} Open Sidenav';
export const CLOSE_SIDENAV = '[UI] Close Sidenav';
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading'

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV; 
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV
}

export class StartLoading implements Action {
  readonly type = START_LOADING
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING
}



export type UIActions = OpenSidenav | CloseSidenav | StartLoading | StopLoading