import type { AppProps } from "next/app";

import { WalletProvider } from "~/hooks/useWallet";

import "~/styles/reset.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
