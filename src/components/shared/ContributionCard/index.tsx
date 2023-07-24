import type { Contribution, ContributionStatus } from "~/lib/types";

import ActivityCard, { LabelColor } from "~/components/shared/ActivityCard";

const LabelColors: Record<ContributionStatus, LabelColor> = {
  imported: "blue",
  minted: "green",
  minting: "purple",
  unminted: "gray",
};

export default function ContributionCard({
  id,
  title,
  description,
  status,
}: Contribution) {
  return (
    <ActivityCard
      label={{ color: LabelColors[status], content: status }}
      title={title}
      content={description}
      seed={BigInt(id)}
    />
  );
}
