import type { Reputation } from "~/lib/types";

import { toEpoch } from "~/lib/date";

import ActivityCard, { LabelColor } from "~/components/shared/ActivityCard";

export default function ReputationCard({
  id,
  issuer,
  score,
  expiration,
}: Reputation) {
  const title = `${issuer} Score`;
  const content = `Aggregate Reputation Score: ${score}`;
  const seed = BigInt(id);
  const now = new Date();
  const isExpired = expiration ? toEpoch(now) - toEpoch(expiration) > 0 : false;

  const label = isExpired
    ? { color: "gray" as LabelColor, content: "expired" }
    : { color: "green" as LabelColor, content: "active" };

  return (
    <ActivityCard
      title={title}
      content={content}
      seed={seed}
      label={label}
      style="alternative"
    />
  );
}
