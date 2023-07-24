import {
  Contract,
  ContractTransactionReceipt,
  EventLog,
  toUtf8Bytes,
} from "ethers";

import type { BrowserProvider, TransactionReceipt } from "ethers";

import Config from "~/lib/config";

export default class Govrn {
  private provider: BrowserProvider;
  private contract: Contract;

  constructor(provider: BrowserProvider) {
    this.provider = provider;
  }

  async mint(
    detailsUri: string,
    dateOfSubmission: number,
    dateOfEngagement: number,
  ) {
    await this._maybeInstantiateContract();

    return this.contract.mint(
      toUtf8Bytes(detailsUri),
      dateOfSubmission,
      dateOfEngagement,
    );
  }

  async parseTransactionReceipt(receipt: TransactionReceipt) {
    await this._maybeInstantiateContract();

    return new ContractTransactionReceipt(
      this.contract.interface,
      this.provider,
      receipt,
    );
  }

  async getMintedIdFromReceipt(receipt: TransactionReceipt) {
    const { logs } = await this.parseTransactionReceipt(receipt);

    if (logs.length !== 1) {
      throw new Error("Expected one log. Someone call the blockchain police.");
    }

    const log = logs[0] as EventLog;

    return this.contract.interface
      .decodeEventLog(log.fragment, log.data, log.topics)
      .toObject();
  }

  async _maybeInstantiateContract() {
    this.contract = this.contract || (await this._instantiateContract());
  }

  async _instantiateContract() {
    const { address, abi } = Config.govrn;
    const signer = await this.provider.getSigner();
    return new Contract(address, abi, signer);
  }
}
