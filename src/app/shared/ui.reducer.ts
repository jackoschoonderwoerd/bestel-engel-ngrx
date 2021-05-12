import {
  UIActions,
  OPEN_SIDENAV,
  CLOSE_SIDENAV,
  START_LOADING,
  STOP_LOADING
} from './ui.actions'

export interface UIState {
  isSidenavOpen: boolean,
  isLoading: boolean
}

const initialState: UIState = {
  isSidenavOpen: false,
  isLoading: false
}

export function uiReducer(state = initialState, action: UIActions) {
  switch(action.type) {
    case OPEN_SIDENAV:
      return {
        ...state,
        isSidenavOpen: true
      };
    case CLOSE_SIDENAV:
      return {
        ...state,
        isSidenavOpen: false
      }
    case START_LOADING: 
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default: {
      return {
        ...state
      }
    }
  }
} 

export const getIsSidenavOpen = (state: UIState) => state.isSidenavOpen;
export const getIsLoading = (state: UIState) => state.isLoading