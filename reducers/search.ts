export type SearchOptions = {
  _sort?: string;
  mylistCounterGte?: number;
  mylistCounterLt?: number;
  startTimeGte?: string;
  startTimeLt?: string;
  count?: number;
  page?: number;
};

export const initialState: SearchOptions = { _sort: "-startTime" };

export type State = SearchOptions;

export interface IAction {
  type: "update";
  payload: Partial<SearchOptions>;
}

export const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
