import "../styles/globals.css";
import "normalize.css";
import { useState, useReducer } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import {
  SearchContext,
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
        <SearchContext.Provider
          value={{
            options,
            setOptions: (v: SearchOptions) => {
              console.log(+new Date());
              console.log(v);
              setOptions(v);
            },
          }}
        >
          <Component {...pageProps} />
        </SearchContext.Provider>
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

export default MyApp;
