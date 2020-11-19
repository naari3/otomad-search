import { createContext, Dispatch, useContext } from "react";
import {
  initialState,
  IAction,
  State,
  SearchOptions,
} from "../reducers/search";

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
