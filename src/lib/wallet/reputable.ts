/* eslint-disable no-console */
import { Contract, ContractTransactionReceipt } from "ethers";
import { timeout, toEpoch } from "~/lib/date";
import type { BrowserProvider, TransactionReceipt } from "ethers";

import { reputable } from "~/lib/config";
import { Users } from "~/lib/wallet/reputable/users";

export default class Reputable {
  private provider: BrowserProvider;
  private contract: Contract;

  constructor(provider: BrowserProvider) {
    this.provider = provider;
  }

  async adder(target: string, origin: string, value: number) {
    const targetId = Users[target.toLowerCase()];
    const originId = Users[origin.toLowerCase()];

    if (!targetId || !originId) throw new Error("Invalid address");

    await this._maybeInstantiateContract();

    const tokenValue = toEpoch(new Date());

    return this.contract.adder(targetId, tokenValue, originId, value);
  }

  async parseTransactionReceipt(receipt: TransactionReceipt) {
    await this._maybeInstantiateContract();

    return new ContractTransactionReceipt(
      this.contract.interface,
      this.provider,
      receipt,
    );
  }

  async waitForScoreAdded(ethAddress: string) {
    await this._maybeInstantiateContract();

    return new Promise<void>((resolve) => {
      const sellerId = Users[ethAddress.toLowerCase()];

      this.contract.on("ScoreAdded", (event) => {
        if (event.args.sellerId === sellerId) {
          event.removeListener();
          resolve();
        }
      });
    });
  }

  async _maybeInstantiateContract() {
    this.contract = this.contract || (await this._instantiateContract());
  }

  async _instantiateContract() {
    const { address, abi } = reputable;
    const signer = await this.provider.getSigner();
    return new Contract(address, abi, signer);
  }
}
