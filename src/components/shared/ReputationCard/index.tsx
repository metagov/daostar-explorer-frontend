import ActivityCard from "~/components/shared/ActivityCard";

export default function ReputationCard() {
  // TODO: Remove hard-coded data
  const title = "Reputable Score";
  const content = "10/10 - Based on 10 reviews";
  const seed = BigInt(1000);

  return (
    <ActivityCard
      title={title}
      content={content}
      seed={seed}
      style="alternative"
    />
  );
}
