export type ContributionStatus = "unminted" | "minting" | "minted" | "imported";

export type Contribution = {
  id: string;
  issuer: string;
  issuer_uid: string;
  issuer_uri: string;
  version: string;
  title: string;
  description: string;
  category: string;
  date_of_engagement: string;
  contributors: string[];
  contributor_signatures: string[];
  metadata: object;
  metadata_uri: string;
  status: ContributionStatus;
};

export type Reputation = {
  id: string;
  issuer: string;
  issuer_uid: string;
  issuer_uri: string;
  version: string;
  score: number;
  proof: string;
  expiration: string;
};
