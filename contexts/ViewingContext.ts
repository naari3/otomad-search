import { createContext, Dispatch, useContext } from "react";
import { initialState, IAction, State } from "../reducers/viewing";

export const ViewingStateContext = createContext(initialState);
export const ViewingDispatchContext = createContext(
  (() => true) as Dispatch<IAction>
);

export const useDispatch = () => {
  return useContext(ViewingDispatchContext);
};

export const useGlobalState = () => {
  return useContext(ViewingStateContext);
};
