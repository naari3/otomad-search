import "../styles/globals.css";
import "normalize.css";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import type { AppProps } from "next/app";
import Head from "next/head";
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
import { DefaultSeo } from "next-seo";

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
  const router = useRouter();

  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SearchStateContext.Provider value={searchState}>
        <SearchDispatchContext.Provider value={searchDispatch}>
          <LoadingStateContext.Provider value={loadingState}>
            <LoadingDispatchContext.Provider value={loadingDispatch}>
              <ViewingStateContext.Provider value={viewingState}>
                <ViewingDispatchContext.Provider value={viewingDispatch}>
                  <DefaultSeo
                    description="音MADを検索するためのサービス"
                    canonical="https://otomad-search.vercel.app/"
                    title="otomad-search"
                    openGraph={{
                      type: "website",
                      locale: "ja_JP",
                      url: "https://otomad-search.vercel.app/",
                      images: [
                        {
                          url: "https://otomad-search.vercel.app/opengrap.png",
                          alt: "otomad-search",
                          height: 1200,
                          width: 630,
                        },
                      ],
                    }}
                    twitter={{
                      cardType: "summary",
                    }}
                  />
                  <Component {...pageProps} />
                </ViewingDispatchContext.Provider>
              </ViewingStateContext.Provider>
            </LoadingDispatchContext.Provider>
          </LoadingStateContext.Provider>
        </SearchDispatchContext.Provider>
      </SearchStateContext.Provider>
    </>
  );
}

export default MyApp;
