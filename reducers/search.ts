export type SearchOptions = {
  q?: string;
  _sort?: string;
  mylistCounterGte?: number;
  mylistCounterLte?: number;
  startTimeGte?: string;
  startTimeLte?: string;
  lengthMinutesGte?: number;
  lengthMinutesLte?: number;
  viewCounterGte?: number;
  viewCounterLte?: number;
  likeCounterGte?: number;
  likeCounterLte?: number;
  userId?: number;
  count?: number;
  page?: number;
  per?: number;
};

export const initialState: SearchOptions = { _sort: "-startTime" };

export type State = SearchOptions;

export interface IAction {
  type: "update" | "init";
  payload: Partial<SearchOptions>;
}

export const reducer = (state: State, action: IAction): State => {
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
