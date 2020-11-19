import "../styles/globals.css";
import "normalize.css";
import { useState, useReducer } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import {
  SearchStateContext,
  SearchDispatchContext,
} from "../contexts/SearchContext";
import { initialState, reducer, SearchOptions } from "../reducers/search";

function MyApp({ Component, pageProps }: AppProps) {
  const [options, setOptions] = useState<SearchOptions>({
    _sort: "-startTime",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

export default MyApp;
