import { createContext, Dispatch, useContext } from "react";
import { initialState, IAction, State } from "../reducers/search";

export type SearchOptions = {
  _sort?: string;
  mylistCounterGte?: number;
  mylistCounterLt?: number;
  startTimeGte?: string;
  startTimeLt?: string;
};

export type SearchContextType = {
  options: SearchOptions;
  setOptions: (options: SearchOptions) => void;
};

const initialSearchContext: SearchContextType = {
  options: { _sort: "-startTime" },
  setOptions: () => {},
};

export const SearchContext = createContext<SearchContextType>(
  initialSearchContext
);

export const SearchStateContext = createContext(initialState);
export const SearchDispatchContext = createContext(
  (() => true) as Dispatch<IAction>
);

export const useDispatch = () => {
  return useContext(SearchDispatchContext);
};

export const useGlobalState = () => {
  return useContext(SearchStateContext);
};
