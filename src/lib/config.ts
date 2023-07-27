import govrnAbi from "~/lib/wallet/abis/govrn.json";
import reputableAbi from "~/lib/wallet/abis/reputable.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOVRN_NETWORK = process.env.NEXT_PUBLIC_GOVRN_NETWORK;
const GOVRN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GOVRN_CONTRACT_ADDRESS;
const REPUTABLE_NETWORK = process.env.NEXT_PUBLIC_REPUTABLE_NETWORK;
const REPUTABLE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_REPUTABLE_CONTRACT_ADDRESS;
const WALLET_POLLING_INTERVAL = process.env.NEXT_PUBLIC_WALLET_POLLING_INTERVAL;
const REPUTABLE_SUBMISSION_ENABLED =
  process.env.NEXT_PUBLIC_REPUTABLE_SUBMISSION_ENABLED;

const DEFAULT_GOVRN_NETWORK = "goerli";
const DEFAULT_REPUTABLE_NETWORK = "goerli";
const DEFAULT_GOVRN_CONTRACT_ADDRESS =
  "0x44fa8E6588e7a9ad869837d09621Cc663539D753";
const DEFAULT_REPUTABLE_CONTRACT_ADDRESS =
  "0xDafdC2Ae8ceEB8c4F70c8010Bcd7aD6853CeF532";
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

export type IntegrationConfig = {
  api: APIConfig;
  contract: ContractConfig;
};

export type WalletConfig = {
  pollingInterval: number;
};

export type FeatureFlagsConfig = {
  reputableSubmissionEnabled: boolean;
};

export type ApplicationConfig = {
  govrn: IntegrationConfig;
  reputable: IntegrationConfig;
  api: APIConfig;
  wallet: WalletConfig;
  featureFlags: FeatureFlagsConfig;
};

export const govrn: IntegrationConfig = {
  api: {
    url: "https://voyager-identity-api-staging.govrn.app/api",
  },
  contract: {
    network: networkChainIds[GOVRN_NETWORK || DEFAULT_GOVRN_NETWORK],
    address: GOVRN_CONTRACT_ADDRESS || DEFAULT_GOVRN_CONTRACT_ADDRESS,
    abi: JSON.stringify(govrnAbi),
  },
};

export const reputable: IntegrationConfig = {
  api: {
    url: "https://reputable-swagger-api.onrender.com/",
  },
  contract: {
    network: networkChainIds[REPUTABLE_NETWORK || DEFAULT_REPUTABLE_NETWORK],
    address: REPUTABLE_CONTRACT_ADDRESS || DEFAULT_REPUTABLE_CONTRACT_ADDRESS,
    abi: JSON.stringify(reputableAbi),
  },
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
