import { setCookie } from "nookies";

export type State = "detail" | "icon";

export const initialState: State = "detail";

export interface IAction {
  type: "update";
  payload: State;
}

export const reducer = (state: State, action: IAction): State => {
  switch (action.type) {
    case "update":
      setCookie(null, "viewing", action.payload, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return action.payload;
    default:
      return state;
  }
};
