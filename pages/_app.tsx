import "../styles/globals.css";
import "normalize.css";
import { useState, useReducer } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import {
  SearchStateContext,
  SearchDispatchContext,
} from "../contexts/SearchContext";
import {
  initialState as searchInitialState,
  reducer as searchReducer,
} from "../reducers/search";
import {
  LoadingDispatchContext,
  LoadingStateContext,
} from "../contexts/LoadingContext";
import {
  initialState as loadingInitialState,
  reducer as loadingReducer,
} from "../reducers/loading";
import {
  ViewingDispatchContext,
  ViewingStateContext,
} from "../contexts/ViewingContext";
import {
  initialState as viewingInitialState,
  reducer as viewingReducer,
} from "../reducers/viewing";

function MyApp({ Component, pageProps }: AppProps) {
  const [searchState, searchDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );
  const [loadingState, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [viewingState, viewingDispatch] = useReducer(
    viewingReducer,
    viewingInitialState
  );
  return (
    <SearchStateContext.Provider value={searchState}>
      <SearchDispatchContext.Provider value={searchDispatch}>
        <LoadingStateContext.Provider value={loadingState}>
          <LoadingDispatchContext.Provider value={loadingDispatch}>
            <ViewingStateContext.Provider value={viewingState}>
              <ViewingDispatchContext.Provider value={viewingDispatch}>
                <Component {...pageProps} />
              </ViewingDispatchContext.Provider>
            </ViewingStateContext.Provider>
          </LoadingDispatchContext.Provider>
        </LoadingStateContext.Provider>
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

export default MyApp;
