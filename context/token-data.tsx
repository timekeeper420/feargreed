import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '@/config/api';
import tokens from '@/config/tokens';

export interface TokenData {
  priceUsd: number;
  marketCap: number;
  volume24Hr: number;
  liquidity: number;
  priceChange: {
    h24?: number;
    h6?: number;
    h1?: number;
    m5?: number;
  };
  txns: {
    h24?: {
      buys: number;
      sells: number;
    };
    h6?: {
      buys: number;
      sells: number;
    };
    h1?: {
      buys: number;
      sells: number;
    };
    m5?: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
}

interface TokenDataContextType {
  fearData: TokenData;
  greedData: TokenData;
  index: number;
}

const TokenDataContext = createContext<TokenDataContextType | undefined>(
  undefined,
);

export const useTokenData = () => {
  const context = useContext(TokenDataContext);

  if (!context) {
    throw new Error('useTokenData must be used within a TokenDataProvider');
  }

  return context;
};

interface TokenDataProviderProps {
  children: ReactNode;
}

export const TokenDataProvider = ({ children }: TokenDataProviderProps) => {
  const [fearData, setFearData] = useState<TokenData>({
    priceUsd: 0,
    marketCap: 0,
    volume24Hr: 0,
    liquidity: 0,
    priceChange: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
    txns: {
      h24: {
        buys: 0,
        sells: 0,
      },
      h6: {
        buys: 0,
        sells: 0,
      },
      h1: {
        buys: 0,
        sells: 0,
      },
      m5: {
        buys: 0,
        sells: 0,
      },
    },
    volume: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
  });
  const [greedData, setGreedData] = useState<TokenData>({
    priceUsd: 0,
    marketCap: 0,
    volume24Hr: 0,
    liquidity: 0,
    priceChange: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
    txns: {
      h24: {
        buys: 0,
        sells: 0,
      },
      h6: {
        buys: 0,
        sells: 0,
      },
      h1: {
        buys: 0,
        sells: 0,
      },
      m5: {
        buys: 0,
        sells: 0,
      },
    },
    volume: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
  });
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calculateIndex = useCallback(
    (fearData: TokenData, greedData: TokenData): number => {
      // Calculate the Approximate Value of Buys for FEAR (6 hours):
      const fearBuysH6 = fearData.txns.h6?.buys ?? 0;
      const fearSellsH6 = fearData.txns.h6?.sells ?? 0;
      const fearVolumeH6 = fearData.volume.h6 ?? 0;

      if (
        fearBuysH6 === null ||
        fearSellsH6 === null ||
        fearVolumeH6 === null
      ) {
        return 0; // Handle cases where data is missing
      }

      const fearTotalTransactionsH6 = fearBuysH6 + fearSellsH6;
      const fearValueBuysH6 =
        fearTotalTransactionsH6 === 0
          ? 0
          : (fearBuysH6 / fearTotalTransactionsH6) * fearVolumeH6;

      // Calculate the Approximate Value of Buys for GREED (6 hours):
      const greedBuysH6 = greedData.txns.h6?.buys ?? 0;
      const greedSellsH6 = greedData.txns.h6?.sells ?? 0;
      const greedVolumeH6 = greedData.volume.h6 ?? 0;

      if (
        greedBuysH6 === null ||
        greedSellsH6 === null ||
        greedVolumeH6 === null
      ) {
        return 0; // Handle cases where data is missing
      }

      const greedTotalTransactionsH6 = greedBuysH6 + greedSellsH6;
      const greedValueBuysH6 =
        greedTotalTransactionsH6 === 0
          ? 0
          : (greedBuysH6 / greedTotalTransactionsH6) * greedVolumeH6;

      // Calculate the Index:
      const totalValueBuysH6 = fearValueBuysH6 + greedValueBuysH6;

      if (totalValueBuysH6 === 0) {
        return 0; // Avoid division by zero if no buys for both tokens
      }

      const indexH6 = (greedValueBuysH6 / totalValueBuysH6) * 100;

      return indexH6;
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api.dexscreener.tokens}/${tokens.fear},${tokens.greed}`,
        );

        const tokensData = await response.json();

        const fearTokenData = tokensData &&
          tokensData.length > 0 && {
            priceUsd: tokensData[0].priceUsd ?? 0,
            marketCap: tokensData[0].marketCap ?? 0,
            volume24Hr: tokensData[0].volume.h24 ?? 0,
            liquidity: tokensData[0].liquidity.usd ?? 0,
            priceChange: {
              h24: tokensData[0].priceChange.h24 ?? 0,
              h6: tokensData[0].priceChange.h6 ?? 0,
              h1: tokensData[0].priceChange.h1 ?? 0,
              m5: tokensData[0].priceChange.m5 ?? 0,
            },
            txns: {
              h24: {
                buys: tokensData[0].txns.h24.buys ?? 0,
                sells: tokensData[0].txns.h24.sells ?? 0,
              },
              h6: {
                buys: tokensData[0].txns.h6.buys ?? 0,
                sells: tokensData[0].txns.h6.sells ?? 0,
              },
              h1: {
                buys: tokensData[0].txns.h1.buys ?? 0,
                sells: tokensData[0].txns.h1.sells ?? 0,
              },
              m5: {
                buys: tokensData[0].txns.m5.buys ?? 0,
                sells: tokensData[0].txns.m5.sells ?? 0,
              },
            },
            volume: {
              h24: tokensData[0].volume.h24 ?? 0,
              h6: tokensData[0].volume.h6 ?? 0,
              h1: tokensData[0].volume.h1 ?? 0,
              m5: tokensData[0].volume.m5 ?? 0,
            },
          };

        const greedTokenData = tokensData &&
          tokensData.length > 1 && {
            priceUsd: tokensData[1].priceUsd ?? 0,
            marketCap: tokensData[1].marketCap ?? 0,
            volume24Hr: tokensData[1].volume.h24 ?? 0,
            liquidity: tokensData[1].liquidity.usd ?? 0,
            priceChange: {
              h24: tokensData[1].priceChange.h24 ?? 0,
              h6: tokensData[1].priceChange.h6 ?? 0,
              h1: tokensData[1].priceChange.h1 ?? 0,
              m5: tokensData[1].priceChange.m5 ?? 0,
            },
            txns: {
              h24: {
                buys: tokensData[1].txns.h24.buys ?? 0,
                sells: tokensData[1].txns.h24.sells ?? 0,
              },
              h6: {
                buys: tokensData[1].txns.h6.buys ?? 0,
                sells: tokensData[1].txns.h6.sells ?? 0,
              },
              h1: {
                buys: tokensData[1].txns.h1.buys ?? 0,
                sells: tokensData[1].txns.h1.sells ?? 0,
              },
              m5: {
                buys: tokensData[1].txns.m5.buys ?? 0,
                sells: tokensData[1].txns.m5.sells ?? 0,
              },
            },
            volume: {
              h24: tokensData[1].volume.h24 ?? 0,
              h6: tokensData[1].volume.h6 ?? 0,
              h1: tokensData[1].volume.h1 ?? 0,
              m5: tokensData[1].volume.m5 ?? 0,
            },
          };

        setFearData(fearTokenData);
        setGreedData(greedTokenData);
        setIndex(calculateIndex(fearTokenData, greedTokenData));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TokenDataContext.Provider value={{ fearData, greedData, index }}>
      {isLoading ? undefined : children}
    </TokenDataContext.Provider>
  );
};
