import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Code } from '@heroui/code';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import clsx from 'clsx';

import Counter from '@/components/counter';
import { TokenData } from '@/context/TokenDataContext';

interface TokenCardProps {
  /**
   * The key of the token.
   */
  key: string;
  /**
   * The index of the token.
   */
  index: number;
  /**
   * The name of the token.
   */
  tokenName: string;
  /**
   * The data of the token.
   */
  tokenData: TokenData;
  /**
   * The address of the token.
   */
  tokenAddress: string;
  /**
   * The link to buy the token.
   */
  buyLink: string;
  /**
   * The link to swap the token.
   */
  swapLink: string;
  /**
   * The color of the token.

   */
  color: 'danger' | 'success';
}

/**
 * A card component that displays information about a token.
 */
export const TokenCard = ({
  key,
  index,
  tokenName,
  tokenData,
  tokenAddress,
  buyLink,
  swapLink,
  color,
}: TokenCardProps) => (
  <Card
    key={key}
    className={clsx(index === 0 ? 'lg:ml-auto' : 'lg:mr-auto', 'mb-4')}
    shadow="sm"
  >
    <CardHeader className="flex gap-3">
      <Snippet
        hideSymbol
        classNames={{
          base: 'flex items-center justify-between p-0 bg-transparent w-full',
          pre: 'min-w-0 flex-1 truncate',
          copyButton: 'min-w-8 w-8 shrink-0',
          content: 'flex items-center gap-1 min-w-0 flex-1',
        }}
        codeString={tokenAddress}
        variant="flat"
      >
        <span className="flex w-full min-w-0 items-center gap-2">
          <span className="shrink-0 whitespace-nowrap text-default-500">
            {tokenName}:
          </span>
          <Code
            className={`bg-${color}/50 min-w-0 max-w-[calc(100%-3rem)] overflow-hidden truncate text-ellipsis whitespace-nowrap font-mono sm:max-w-none`}
            color={color}
          >
            {tokenAddress}
          </Code>
        </span>
      </Snippet>
    </CardHeader>
    <Divider />
    <CardBody className="flex flex-row items-center justify-evenly gap-2">
      <span className="text-mono flex-1 text-center text-sm">
        <span className="text-default-500">Mkt Cap</span>
        <br />
        <span className="font-bold text-default-700">
          <Counter
            options={{
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
            }}
            value={tokenData.marketCap ?? 0}
          />
        </span>
      </span>

      <span className="text-mono flex-1 text-center text-sm">
        <span className="text-default-500">Price</span>
        <br />
        <span className="font-bold text-default-700">
          <Counter
            options={{
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
            }}
            value={tokenData.priceUsd ?? 0}
          />
        </span>
      </span>

      <span className="text-mono flex-1 text-center text-sm">
        <span className="text-default-500">24h Vol</span>
        <br />
        <span className="font-bold text-default-700">
          <Counter
            options={{
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
            }}
            value={tokenData.volume24Hr ?? 0}
          />
        </span>
      </span>

      <span className="text-mono flex-1 text-center text-sm">
        <span className="text-default-500">Liq</span>
        <br />
        <span className="font-bold text-default-700">
          <Counter
            options={{
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
            }}
            value={tokenData.liquidity ?? 0}
          />
        </span>
      </span>
    </CardBody>
    <Divider />
    <CardBody className="flex flex-row justify-between gap-2">
      <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
        <span className="text-default-500">5m</span>
        <br />
        <span
          className={clsx(
            'font-bold',
            tokenData.priceChange.m5 && tokenData.priceChange.m5 > 0.01
              ? 'text-success'
              : tokenData.priceChange.m5 && tokenData.priceChange.m5 < -0.01
                ? 'text-danger'
                : 'text-default-700',
          )}
        >
          <Counter
            options={{ maximumFractionDigits: 2 }}
            value={tokenData.priceChange.m5 ?? 0}
          />
          %
        </span>
      </span>
      <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
        <span className="text-default-500">1h</span>
        <br />
        <span
          className={clsx(
            'font-bold',
            tokenData.priceChange.h1 && tokenData.priceChange.h1 > 0.01
              ? 'text-success'
              : tokenData.priceChange.h1 && tokenData.priceChange.h1 < -0.01
                ? 'text-danger'
                : 'text-default-700',
          )}
        >
          <Counter
            options={{ maximumFractionDigits: 2 }}
            value={tokenData.priceChange.h1 ?? 0}
          />
          %
        </span>
      </span>
      <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
        <span className="text-default-500">6h</span>
        <br />
        <span
          className={clsx(
            'font-bold',
            tokenData.priceChange.h6 && tokenData.priceChange.h6 > 0.01
              ? 'text-success'
              : tokenData.priceChange.h6 && tokenData.priceChange.h6 < -0.01
                ? 'text-danger'
                : 'text-default-700',
          )}
        >
          <Counter
            options={{ maximumFractionDigits: 2 }}
            value={tokenData.priceChange.h6 ?? 0}
          />
          %
        </span>
      </span>

      <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
        <span className="text-default-500">24h</span>
        <br />
        <span
          className={clsx(
            'font-bold',
            tokenData.priceChange.h24 && tokenData.priceChange.h24 > 0.01
              ? 'text-success'
              : tokenData.priceChange.h24 && tokenData.priceChange.h24 < -0.01
                ? 'text-danger'
                : 'text-default-700',
          )}
        >
          <Counter
            options={{ maximumFractionDigits: 2 }}
            value={tokenData.priceChange.h24 ?? 0}
          />
          %
        </span>
      </span>
    </CardBody>
    <Divider />
    <CardFooter className="flex justify-between">
      <Link
        isExternal
        showAnchorIcon
        className={`text-sm text-${color}`}
        href={swapLink}
      >
        Swap {tokenName}
      </Link>

      <Link
        isExternal
        showAnchorIcon
        className={`text-sm text-${color}`}
        href={buyLink}
      >
        Buy {tokenName}
      </Link>
    </CardFooter>
  </Card>
);
