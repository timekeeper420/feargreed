import { Avatar } from '@heroui/avatar';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Code } from '@heroui/code';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import clsx from 'clsx';

import Counter from '@/components/counter';
import links from '@/config/links';
import { TokenData } from '@/context/token-data';

interface TokenCardProps {
  /**
   * The key of the component.
   */
  key: string;
  /**
   * The key of the token.
   */
  tokenKey: 'fear' | 'greed';
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
  tokenKey,
  tokenName,
  tokenData,
  tokenAddress,
  buyLink,
  swapLink,
  color,
}: TokenCardProps) => (
  <Card key={key} className={clsx('mb-4')} shadow="sm">
    <CardHeader className="flex flex-col gap-1">
      <Snippet
        hideSymbol
        classNames={{
          base: 'flex items-center justify-start p-0 bg-transparent w-full',
          pre: 'min-w-0 truncate',
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
            className={`bg-${color}/50 min-w-0 max-w-[calc(100%-3rem)] overflow-hidden truncate text-ellipsis whitespace-nowrap bg-transparent px-0 font-mono sm:max-w-none`}
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
    <CardBody className="flex flex-col justify-between gap-2">
      <span className="mb-1 flex w-full min-w-0 items-center gap-2 font-mono text-sm">
        {links.analysis.map((analysis, index) => (
          <Link
            key={`analysis-${analysis.name}-${index}`}
            isExternal
            href={analysis[tokenKey]}
          >
            <Chip
              avatar={
                <Avatar
                  classNames={{
                    base: 'bg-transparent',
                  }}
                  name={analysis.name}
                  size="sm"
                  src={analysis.image}
                />
              }
              classNames={{
                content: 'hidden sm:inline',
              }}
              size="sm"
              variant="flat"
            >
              {analysis.name}
            </Chip>
          </Link>
        ))}
      </span>
      <span className="mb-1 flex w-full min-w-0 items-center gap-2 font-mono text-sm">
        {links.price.map((price, index) => (
          <Link
            key={`price-${price.name}-${index}`}
            isExternal
            href={price[tokenKey]}
          >
            <Chip
              avatar={
                <Avatar
                  classNames={{
                    base: 'bg-transparent',
                  }}
                  name={price.name}
                  size="sm"
                  src={price.image}
                />
              }
              classNames={{
                content: 'hidden sm:inline',
              }}
              size="sm"
              variant="flat"
            >
              {price.name}
            </Chip>
          </Link>
        ))}
      </span>
      <span className="flex w-full min-w-0 items-center gap-2 font-mono text-sm">
        {links.bots.map((bot, index) => (
          <Link
            key={`bot-${bot.name}-${index}`}
            isExternal
            href={bot[tokenKey]}
          >
            <Chip
              avatar={
                <Avatar
                  classNames={{
                    base: 'bg-transparent',
                  }}
                  name={bot.name}
                  size="sm"
                  src={bot.image}
                />
              }
              classNames={{
                content: 'hidden sm:inline',
              }}
              size="sm"
              variant="flat"
            >
              {bot.name}
            </Chip>
          </Link>
        ))}
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
