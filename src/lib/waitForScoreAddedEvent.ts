/* eslint-disable no-console */
import { useWallet } from "~/hooks/useWallet";
import { postReputationScore } from "./api";
import { Users } from "~/lib/wallet/reputable/users";

async function WaitForScoreAddedEvent(ethAddress: string) {
  const wallet = useWallet();
  const contract = await wallet.reputable._instantiateContract;
  const sellerId = Users[ethAddress.toLowerCase()];

  if (contract) {
    const isScoreAdded = await wallet.reputable._listenToScoreAdded(sellerId);

    if (isScoreAdded) {
      postReputationScore(ethAddress);
    } else {
      console.error("Reputation not submitted");
    }
  }
}

export default WaitForScoreAddedEvent;
