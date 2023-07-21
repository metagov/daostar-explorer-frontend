import { BrowserProvider, TransactionReceipt } from "ethers";

import Config from "~/lib/config";

export type Integration = "govrn" | "reputable";

import Govrn from "~/lib/wallet/govrn";

export default class Wallet {
  private provider: BrowserProvider;
  public govrn: Govrn;

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.provider = new BrowserProvider(window.ethereum);
      this.govrn = new Govrn(this.provider);
    }
  }

  async getAddress() {
    const signer = await this.provider.getSigner();
    return signer.getAddress();
  }

  async sign(message: string) {
    const signer = await this.provider.getSigner();
    return signer.signMessage(message);
  }

  async switchNetwork(integration: Integration) {
    const currentNetwork = await this.provider.getNetwork();
    const currentChainId = Number(currentNetwork.chainId);
    const { network } = Config[integration];

    if (network === currentChainId) return;

    await this.provider.send("wallet_switchEthereumChain", [
      { chainId: `0x${network.toString(16)}` },
    ]);
  }

  getTxReceipt(txHash: string) {
    return this.provider.getTransactionReceipt(txHash);
  }

  watchTransaction(txHash: string) {
    return new Promise<TransactionReceipt>((resolve, reject) => {
      this._watchTransaction(txHash, resolve, reject);
    });
  }

  _watchTransaction(
    txHash: string,
    resolve: (receipt: TransactionReceipt) => void,
    reject: (reason: any) => void,
  ) {
    this.getTxReceipt(txHash)
      .then((receipt) => {
        if (receipt) {
          resolve(receipt);
        } else {
          setTimeout(() => {
            this._watchTransaction(txHash, resolve, reject);
          }, Config.wallet.pollingInterval);
        }
      })
      .catch(reject);
  }
}
