import type { Contribution } from "~/lib/types";

import ActivityCard from "~/components/shared/ActivityCard";

export default function ContributionCard({
  id,
  title,
  description,
}: Contribution) {
  return <ActivityCard title={title} content={description} seed={BigInt(id)} />;
}
