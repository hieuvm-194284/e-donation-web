import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../public/fonts/sf-ui-display-black-58646a6b80d5a.woff',
      weight: "800",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-heavy-586470160b9e5.woff',
      weight: "700",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-bold-58646a511e3d9.woff',
      weight: "600",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-semibold-58646eddcae92.woff',
      weight: "500",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-medium-58646be638f96.woff',
      weight: "400",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-light-58646b33e0551.woff',
      weight: "300",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-thin-58646e9b26e8b.woff',
      weight: "200",
      style: "normal",
    },
    {
      path: '../public/fonts/sf-ui-display-ultralight-58646b19bf205.woff',
      weight: "100",
      style: "normal",
    },
  ],
});

const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));
  return (
    <main className={myFont.className}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </main>
  );
}
