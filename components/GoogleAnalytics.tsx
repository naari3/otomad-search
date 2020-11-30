import { FC } from "react";
import { existsGaId, GA_ID } from "../lib/gtag";

const GoogleAnalytics: FC = () => {
  return (
    existsGaId && (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });`,
          }}
        />
      </>
    )
  );
};

export default GoogleAnalytics;
