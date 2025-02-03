import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { siteConfig } from '@/config/site';

interface TokenData {
  priceUsd: number;
  marketCap: number;
  buys: number;
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
}

interface TokenDataContextType {
  fearData: TokenData;
  greedData: TokenData;
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
    buys: 0,
    priceChange: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
  });
  const [greedData, setGreedData] = useState<TokenData>({
    priceUsd: 0,
    marketCap: 0,
    buys: 0,
    priceChange: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
  });

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        return data.pair;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return null;
      }
    };

    const fetchFearData = async () => {
      const fearPair = await fetchData(siteConfig.links.fearPair);

      if (fearPair) {
        setFearData({
          priceUsd: fearPair.priceUsd,
          marketCap: fearPair.marketCap,
          buys: fearPair.txns.h6.buys,
          priceChange: {
            h24: fearPair.priceChange.h24,
            h6: fearPair.priceChange.h6,
            h1: fearPair.priceChange.h1,
            m5: fearPair.priceChange.m5,
          },
        });
      }
    };

    const fetchGreedData = async () => {
      const greedPair = await fetchData(siteConfig.links.greedPair);

      if (greedPair) {
        setGreedData({
          priceUsd: greedPair.priceUsd,
          marketCap: greedPair.marketCap,
          buys: greedPair.txns.h6.buys,
          priceChange: {
            h24: greedPair.priceChange.h24,
            h6: greedPair.priceChange.h6,
            h1: greedPair.priceChange.h1,
            m5: greedPair.priceChange.m5,
          },
        });
      }
    };

    const intervalId = setInterval(() => {
      fetchFearData();
      fetchGreedData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TokenDataContext.Provider value={{ fearData, greedData }}>
      {children}
    </TokenDataContext.Provider>
  );
};
