import { createContext, Dispatch, useContext } from "react";
import { initialState, IAction, SearchOptions } from "../reducers/search";

export const SearchStateContext = createContext(initialState);
export const SearchDispatchContext = createContext((() => true) as Dispatch<IAction>);

export const useDispatch = (): Dispatch<IAction> => {
  return useContext(SearchDispatchContext);
};

export const useGlobalState = (): SearchOptions => {
  return useContext(SearchStateContext);
};
