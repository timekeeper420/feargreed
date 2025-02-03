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
   * The color of the token.
   */
  color: 'danger' | 'success';
}

/**
 * A card component that displays information about a token.
 */
export const TokenCard = ({
  tokenName,
  tokenData,
  tokenAddress,
  buyLink,
  color,
}: TokenCardProps) => {
    return (
      <Card className="w-full sm:w-fit" shadow="sm">
        <CardHeader className="flex gap-3">
          <Snippet
            hideSymbol
            classNames={{
              base: 'p-0 bg-transparent',
            }}
            codeString={tokenAddress}
            variant="flat"
          >
            <span>
              {tokenName}:{' '}
              <Code
                className={`hidden bg-${color}/50 sm:inline-block`}
                color={color}
              >
                {tokenAddress}
              </Code>
              <Code
                className={`inline-block bg-${color}/50 sm:hidden`}
                color={color}
              >
                {tokenAddress.slice(0, 5)}...{tokenAddress.slice(-4)}
              </Code>
            </span>
          </Snippet>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <span className="text-mono text-center text-sm">
            <span className="text-default-500">Mkt Cap</span>
            <br />
            <span className="font-bold text-default-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(tokenData.marketCap ?? 0)}
            </span>
          </span>
          <span className="text-mono text-center text-sm">
            <span className="text-default-500">Price</span>
            <br />
            <span className="font-bold text-default-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 10,
              }).format(tokenData.priceUsd ?? 0)}
            </span>
          </span>

          <span className="text-mono text-center text-sm">
            <span className="text-default-500">24h Vol</span>
            <br />
            <span className="font-bold text-default-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 10,
              }).format(tokenData.volume24Hr ?? 0)}
            </span>
          </span>

          <span className="text-mono text-center text-sm">
            <span className="text-default-500">Liq</span>
            <br />
            <span className="font-bold text-default-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 10,
              }).format(tokenData.liquidity ?? 0)}
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
                    : 'text-default-700'
              )}
            >
              <Counter decimalPlaces={2} value={tokenData.priceChange.m5 ?? 0} />%
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
                    : 'text-default-700'
              )}
            >
              <Counter decimalPlaces={2} value={tokenData.priceChange.h1 ?? 0} />%
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
                    : 'text-default-700'
              )}
            >
              <Counter decimalPlaces={2} value={tokenData.priceChange.h6 ?? 0} />%
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
                    : 'text-default-700'
              )}
            >
              <Counter decimalPlaces={2} value={tokenData.priceChange.h24 ?? 0} />%
            </span>
          </span>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
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
  };
