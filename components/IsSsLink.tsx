import React from "react";
import Link from "next/link";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import removeEmpty from "../lib/removeEmpty";

const IsSsLink = ({
  disableMessage,
  enableMessage,
}: {
  disableMessage: string;
  enableMessage: string;
}) => {
  const options = useSearchGlobalState();

  return options.isSs ? (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({ ...options, page: 1, isSs: null }),
      }}
    >
      <a>{disableMessage}</a>
    </Link>
  ) : (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({ ...options, page: 1, isSs: true }),
      }}
    >
      <a>{enableMessage}</a>
    </Link>
  );
};

export default IsSsLink;
