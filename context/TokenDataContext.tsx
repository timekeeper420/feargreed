import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

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
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching', fetching);
        if (fetching) return;
        setFetching(true);
        const response = await fetch('/api/data');
        const jsonData = await response.json();

        if (jsonData && jsonData.fearData) {
          setFearData(jsonData.fearData);
        }

        if (jsonData && jsonData.greedData) {
          setGreedData(jsonData.greedData);
        }

        if (jsonData && jsonData.index) {
          setIndex(jsonData.index);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setFetching(false);
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
