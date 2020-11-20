export type State = boolean;

export const initialState: State = false;

export interface IAction {
  type: "update";
  payload: State;
}

export const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case "update":
      return action.payload;
    default:
      return state;
  }
};
