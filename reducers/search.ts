export type SearchOptions = {
  _sort?: string;
  mylistCounterGte?: number;
  mylistCounterLte?: number;
  startTimeGte?: string;
  startTimeLte?: string;
  lengthMinutesGte?: number;
  lengthMinutesLte?: number;
  count?: number;
  page?: number;
};

export const initialState: SearchOptions = { _sort: "-startTime" };

export type State = SearchOptions;

export interface IAction {
  type: "update" | "init";
  payload: Partial<SearchOptions>;
}

export const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.payload,
      };
    case "init":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
