/* eslint-disable no-console */
import reputableAbi from "~/lib/wallet/abis/reputable.json";
import { ethers } from "ethers";
import { api } from "./config";
import { postReputationScore } from "./api";
import { Users } from "~/lib/wallet/reputable/users";

const contractAddress = "0xDafdC2Ae8ceEB8c4F70c8010Bcd7aD6853CeF532";

async function detectContractCalls(ethAddress: string) {
  const provider = new ethers.JsonRpcProvider(api.url);
  const sellerId = Users[ethAddress.toLowerCase()];

  const contract = new ethers.Contract(contractAddress, reputableAbi, provider);

  try {
    const latestBlock = await provider.getBlockNumber();

    const eventFilter = contract.filters.ScoreAdded(sellerId, null, null);

    const events = await contract.queryFilter(eventFilter, latestBlock);

    const numEvents = events.length;

    let numRequests = 0;

    const startTime = Date.now();

    for (const event of events) {
      const fetchedSellerId = event["args"].sellerId;

      if (fetchedSellerId === sellerId) {
        postReputationScore(ethAddress);
        numRequests++;
      }
    }

    const endTime = Date.now();

    const totalTime = endTime - startTime;

    const averageTimePerEvent = totalTime / numEvents;

    const requestsPerMinute = (60 * 1000) / averageTimePerEvent;

    console.log(`Number of requests made: ${numRequests}`);

    console.log(
      `Number of requests per minute: ${requestsPerMinute.toFixed(2)}`,
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

// Call the function with the specific seller ID you want to filter
export default detectContractCalls;
