import "~/lib/sass/_app.scss";
import type { AppProps } from "next/app";
import Layout from "~/components/modules/layout";
import { trpc } from "~/utils/trpc/client";
import { ThemeProvider } from "next-themes";
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(App);
