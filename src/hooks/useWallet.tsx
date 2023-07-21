import { ReactNode, createContext, useContext, memo } from "react";

import Wallet from "~/lib/wallet";

type WalletContextType = Wallet | null;

const WalletContext = createContext<WalletContextType>(null);

export const WalletProvider = memo(
  ({
    wallet,
    children,
  }: {
    wallet: WalletContextType;
    children: ReactNode;
  }) => {
    return (
      <WalletContext.Provider value={wallet || new Wallet()}>
        {children}
      </WalletContext.Provider>
    );
  },
);

WalletProvider.displayName = "WalletProvider";

export function useWallet(): WalletContextType {
  return useContext(WalletContext);
}
