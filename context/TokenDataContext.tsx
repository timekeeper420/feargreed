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
  });
  const [greedData, setGreedData] = useState<TokenData>({
    priceUsd: 0,
    marketCap: 0,
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
        });
      }
    };

    const fetchGreedData = async () => {
      const greedPair = await fetchData(siteConfig.links.greedPair);

      if (greedPair) {
        setGreedData({
          priceUsd: greedPair.priceUsd,
          marketCap: greedPair.marketCap,
        });
      }
    };

    fetchFearData();
    fetchGreedData();
  }, []);

  return (
    <TokenDataContext.Provider value={{ fearData, greedData }}>
      {children}
    </TokenDataContext.Provider>
  );
};
