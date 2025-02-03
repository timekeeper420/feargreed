import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { siteConfig } from '@/config/site';

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
    volume24Hr: 0,
    liquidity: 0,
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
    volume24Hr: 0,
    liquidity: 0,
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

        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return null;
      }
    };

    const fetchTokensData = async () => {
      const tokensData = await fetchData(
        `${siteConfig.links.dexscreenerTokens}/${siteConfig.fearToken},${siteConfig.greedToken}`,
      );

      if (tokensData && tokensData.length > 0) {
        setFearData({
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
        });
      }

      if (tokensData && tokensData.length > 1) {
        setGreedData({
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
        });
      }
    };

    const intervalId = setInterval(() => {
      fetchTokensData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TokenDataContext.Provider value={{ fearData, greedData }}>
      {children}
    </TokenDataContext.Provider>
  );
};
