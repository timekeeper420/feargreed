import { NextApiRequest, NextApiResponse } from 'next';

import { siteConfig } from '@/config/site';
import { TokenData } from '@/context/TokenDataContext';

let cachedData: {
  fearData?: TokenData;
  greedData?: TokenData;
  index?: number;
} = {};

const transactionsCache: Record<string, any[]> = {};

async function getTransactions(address: string): Promise<any[]> {
  // Four hours ago in Unix timestamp
  const fourHoursAgo = Math.floor(Date.now() / 1000) - 4 * 60 * 60;

  // Initialize the cache if it doesn't exist
  if (!transactionsCache[address]) {
    transactionsCache[address] = [];
  }

  const apiKeyIndex = Math.floor(Math.random() * 4) + 1;
  const apiKey = process.env[`HELIUS_API_KEY_${apiKeyIndex}`];
  const url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${apiKey}`;

  try {
    const response = await fetch(url);
    const transactions = await response.json();

    if (transactions.error) {
      return transactionsCache[address];
    }

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return transactionsCache[address];
    }

    // Filter out transactions that are already in the cache
    const recentTransactions = transactions.filter(
      (transaction: any) =>
        !transactionsCache[address].some(
          (cachedTransaction: any) =>
            cachedTransaction.signature === transaction.signature,
        ),
    );

    // Add new transactions to the cache
    transactionsCache[address].push(...recentTransactions);

    // Sort transactions by timestamp in descending order
    transactionsCache[address].sort(
      (a: any, b: any) => b.timestamp - a.timestamp,
    );

    // Filter out transactions that are older than 4 hours
    transactionsCache[address] = transactionsCache[address].filter(
      (transaction: any) => transaction.timestamp > fourHoursAgo,
    );

    // Return the updated cache
    return transactionsCache[address];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return transactionsCache[address];
  }
}

async function getTokenBuysCostInSOL(tokenAddress: string) {
  let buysCostInSOL = 0;

  // Get transactions for the token address
  const transactions = await getTransactions(tokenAddress);

  // If no transactions are found, return 0
  if (transactions.length === 0) return 0;

  // Loop through the transactions and add the buy cost to the total
  for (const transaction of transactions) {
    if (!transaction.tokenTransfers || transaction.tokenTransfers.length === 0)
      continue; // Skip if no token transfers

    const tokenTransfers = transaction.tokenTransfers;

    // Get the mint of the last token transfer
    const tokenOutputMint = tokenTransfers[tokenTransfers.length - 1].mint;

    if (tokenOutputMint !== tokenAddress) continue; // Skip if the token is not the token being analyzed

    // Find the SOL input (if it exists) and is not at the end of the token transfers
    const solInput = tokenTransfers.find(
      (input: any, index: number) =>
        input.mint === 'So11111111111111111111111111111111111111112' &&
        index !== tokenTransfers.length - 1,
    );

    if (solInput) {
      try {
        const solAmount = parseFloat(solInput.tokenAmount);

        buysCostInSOL += solAmount;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {}
    }
  }

  return buysCostInSOL;
}

async function getIndex() {
  // Get the buys cost in SOL for the $FEAR token
  const fear = await getTokenBuysCostInSOL(
    '9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump',
  );

  // Wait for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get the buys cost in SOL for the $GREED token
  const greed = await getTokenBuysCostInSOL(
    'DdtbTZmi6sSXCMeSWrMFPJxBeLvb86apEwmdxumcpump',
  );

  // If both the $FEAR and $GREED token buys cost in SOL are 0, return 0
  if (fear === 0 && greed === 0) return 0;

  // Calculate the index
  const index = (greed / (fear + greed)) * 100;

  // Return the index rounded to the nearest integer
  return Math.round(index);
}

async function fetchTokenData(url: string) {
  try {
    const response = await fetch(url);

    return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null;
  }
}

let indexInitialized = false;
let tokensInitialized = false;

async function initIndex() {
  const index = await getIndex();

  cachedData = {
    index,
  };

  await new Promise(resolve => setTimeout(resolve, 5000));

  initIndex();
}

if (!indexInitialized) {
  indexInitialized = true;
  initIndex();
}

async function initTokens() {
  const tokensData = await fetchTokenData(
    `${siteConfig.links.dexscreenerTokens}/${siteConfig.fearToken},${siteConfig.greedToken}`,
  );

  const fearData: TokenData = tokensData &&
    tokensData.length > 0 && {
      priceUsd: tokensData[0].priceUsd ?? 0,
      marketCap: tokensData[0].marketCap ?? 0,
      volume24Hr: tokensData[0].volume.h24 ?? 0,
      liquidity: tokensData[0].liquidity.usd ?? 0,
      priceChange: tokensData[0].priceChange,
      txns: tokensData[0].txns,
      volume: tokensData[0].volume,
    };

  const greedData: TokenData = tokensData &&
    tokensData.length > 1 && {
      priceUsd: tokensData[1].priceUsd ?? 0,
      marketCap: tokensData[1].marketCap ?? 0,
      volume24Hr: tokensData[1].volume.h24 ?? 0,
      liquidity: tokensData[1].liquidity.usd ?? 0,
      priceChange: tokensData[1].priceChange,
      txns: tokensData[1].txns,
      volume: tokensData[1].volume,
    };

  cachedData = {
    fearData,
    greedData,
  };

  await new Promise(resolve => setTimeout(resolve, 1_000));

  initTokens();
}

if (!tokensInitialized) {
  tokensInitialized = true;
  initTokens();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(cachedData);
}

export const runtime = 'edge';