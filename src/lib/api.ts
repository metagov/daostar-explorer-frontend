import { api } from "~/lib/config";
import { get, post, put } from "~/lib/client";

export type ContributionInput = {
  title: string;
  description?: string;
  category?: string;
  dateOfEngagement: string;
  external?: object;
};

export type UpdateContributionInput = {
  txHash: string;
  issuerUid: string;
};

export const getContributions = (ethAddress: string) => {
  return get(`${api.url}/${ethAddress}`);
};

export const createContribution = (
  signature: string,
  contribution: ContributionInput,
) => {
  return post(`${api.url}/contributions`, {
    signature,
    contribution: {
      date_of_engagement: contribution.dateOfEngagement,
      ...contribution,
    },
  });
};

export const updateContribution = (
  id: number,
  signature: string,
  params: UpdateContributionInput,
) => {
  return put(`${api.url}/contributions`, {
    id,
    signature,
    contribution: {
      tx_hash: params.txHash,
      issuer_uid: params.issuerUid,
    },
  });
};
