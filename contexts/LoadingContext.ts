import { createContext, Dispatch, useContext } from "react";
import { initialState, IAction, State } from "../reducers/loading";

export const LoadingStateContext = createContext(initialState);
export const LoadingDispatchContext = createContext((() => true) as Dispatch<IAction>);

export const useDispatch = (): Dispatch<IAction> => {
  return useContext(LoadingDispatchContext);
};

export const useGlobalState = (): State => {
  return useContext(LoadingStateContext);
};
