import govrnAbi from "~/lib/wallet/abis/govrn.json";
import reputableAbi from "~/lib/wallet/abis/govrn.json";

const {
  API_URL,
  GOVRN_NETWORK,
  GOVRN_CONTRACT_ADDRESS,
  REPUTABLE_NETWORK,
  REPUTABLE_CONTRACT_ADDRESS,
  WALLET_POLLING_INTERVAL,
  REPUTABLE_SUBMISSION_ENABLED,
} = process.env;

const DEFAULT_GOVRN_NETWORK = "goerli";
const DEFAULT_REPUTABLE_NETWORK = "sepolia";
const DEFAULT_GOVRN_CONTRACT_ADDRESS =
  "0x44fa8E6588e7a9ad869837d09621Cc663539D753";
const DEFAULT_REPUTABLE_CONTRACT_ADDRESS = "0x0";
const DEFAULT_API_URL = "http://localhost:4000";
const DEFAULT_WALLET_POLLING_INTERVAL = 5000;
const DEFAULT_REPUTABLE_SUBMISSION_ENABLED = false;

const networkChainIds = {
  mainnet: 1,
  goerli: 5,
  gnosis: 100,
  sepolia: 11155111,
};

export type ContractConfig = {
  network: number;
  address: string;
  abi: string;
};

export type APIConfig = {
  url: string;
};

export type WalletConfig = {
  pollingInterval: number;
};

export type FeatureFlagsConfig = {
  reputableSubmissionEnabled: boolean;
};

export type ApplicationConfig = {
  govrn: ContractConfig;
  reputable: ContractConfig;
  api: APIConfig;
  wallet: WalletConfig;
  featureFlags: FeatureFlagsConfig;
};

export const govrn: ContractConfig = {
  network: networkChainIds[GOVRN_NETWORK || DEFAULT_GOVRN_NETWORK],
  address: GOVRN_CONTRACT_ADDRESS || DEFAULT_GOVRN_CONTRACT_ADDRESS,
  abi: JSON.stringify(govrnAbi),
};

export const reputable: ContractConfig = {
  network: networkChainIds[REPUTABLE_NETWORK || DEFAULT_REPUTABLE_NETWORK],
  address: REPUTABLE_CONTRACT_ADDRESS || DEFAULT_REPUTABLE_CONTRACT_ADDRESS,
  abi: JSON.stringify(reputableAbi),
};

export const api: APIConfig = {
  url: API_URL || DEFAULT_API_URL,
};

export const featureFlags: FeatureFlagsConfig = {
  reputableSubmissionEnabled:
    REPUTABLE_SUBMISSION_ENABLED === "1" ||
    DEFAULT_REPUTABLE_SUBMISSION_ENABLED,
};

export const wallet: WalletConfig = {
  pollingInterval: WALLET_POLLING_INTERVAL
    ? Number(WALLET_POLLING_INTERVAL)
    : DEFAULT_WALLET_POLLING_INTERVAL,
};

const Config = {
  govrn,
  reputable,
  api,
  wallet,
  featureFlags,
};

export default Config;
