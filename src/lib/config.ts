import govrnAbi from "~/lib/wallet/abis/govrn.json";
import reputableAbi from "~/lib/wallet/abis/reputable.json";

const {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_GOVRN_NETWORK,
  NEXT_PUBLIC_GOVRN_CONTRACT_ADDRESS,
  NEXT_PUBLIC_REPUTABLE_NETWORK,
  NEXT_PUBLIC_REPUTABLE_CONTRACT_ADDRESS,
  NEXT_PUBLIC_WALLET_POLLING_INTERVAL,
  NEXT_PUBLIC_REPUTABLE_SUBMISSION_ENABLED,
} = process.env;

const DEFAULT_GOVRN_NETWORK = "goerli";
const DEFAULT_REPUTABLE_NETWORK = "sepolia";
const DEFAULT_GOVRN_CONTRACT_ADDRESS =
  "0x44fa8E6588e7a9ad869837d09621Cc663539D753";
const DEFAULT_REPUTABLE_CONTRACT_ADDRESS =
  "0xfEb6Cf237c031a2d6c97E8E415064A3d1126232A";
const DEFAULT_API_URL = "https://daostar-explorer-api.gigalixirapp.com";
const DEFAULT_WALLET_POLLING_INTERVAL = 5000;
const DEFAULT_REPUTABLE_SUBMISSION_ENABLED = true;

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
  network: networkChainIds[NEXT_PUBLIC_GOVRN_NETWORK || DEFAULT_GOVRN_NETWORK],
  address: NEXT_PUBLIC_GOVRN_CONTRACT_ADDRESS || DEFAULT_GOVRN_CONTRACT_ADDRESS,
  abi: JSON.stringify(govrnAbi),
};

export const reputable: ContractConfig = {
  network:
    networkChainIds[NEXT_PUBLIC_REPUTABLE_NETWORK || DEFAULT_REPUTABLE_NETWORK],
  address:
    NEXT_PUBLIC_REPUTABLE_CONTRACT_ADDRESS ||
    DEFAULT_REPUTABLE_CONTRACT_ADDRESS,
  abi: JSON.stringify(reputableAbi),
};

export const api: APIConfig = {
  url: NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
};

export const featureFlags: FeatureFlagsConfig = {
  reputableSubmissionEnabled:
    NEXT_PUBLIC_REPUTABLE_SUBMISSION_ENABLED === "1" ||
    DEFAULT_REPUTABLE_SUBMISSION_ENABLED,
};

export const wallet: WalletConfig = {
  pollingInterval: NEXT_PUBLIC_WALLET_POLLING_INTERVAL
    ? Number(NEXT_PUBLIC_WALLET_POLLING_INTERVAL)
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
