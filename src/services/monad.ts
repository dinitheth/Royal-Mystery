'use server';

import { createWalletClient, http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { monadTestnet } from 'viem/chains';

const contractABI = [
  {
    "type": "function",
    "name": "updatePlayerData",
    "inputs": [
      { "name": "player", "type": "address", "internalType": "address" },
      { "name": "scoreAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "transactionAmount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const privateKey = process.env.WALLET_PRIVATE_KEY as `0x${string}`;

if (!privateKey) {
  throw new Error('WALLET_PRIVATE_KEY is not set in the environment variables.');
}
if (!contractAddress) {
    throw new Error('NEXT_PUBLIC_CONTRACT_ADDRESS is not set in the environment variables.');
}

const account = privateKeyToAccount(privateKey);

const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

const walletClient = createWalletClient({
  account,
  chain: monadTestnet,
  transport: http(),
});

export async function submitScore(playerAddress: string, score: number) {
  try {
    const { request } = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi: contractABI,
      functionName: 'updatePlayerData',
      args: [playerAddress as `0x${string}`, BigInt(score), BigInt(1)],
    });

    const hash = await walletClient.writeContract(request);
    console.log(`Transaction sent with hash: ${hash}`);
    return { success: true, hash };
  } catch (error) {
    console.error('Failed to submit score to blockchain:', error);
    return { success: false, error: 'Failed to submit score.' };
  }
}
