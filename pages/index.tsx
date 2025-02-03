import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Code } from '@heroui/code';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { subtitle, title } from '@/components/primitives';
import { siteConfig } from '@/config/site';
import { useTokenData } from '@/context/TokenDataContext';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const { fearData, greedData } = useTokenData();
  const [index, setIndex] = useState(0);
  const needleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the needle's position on the gauge based on the given index.
   * The needle rotates from 0 to 180 degrees, where 0 represents 0 and 180 represents 100.
   * The number at the end of the needle displays the index value and changes color based on the index range.
   *
   * @param index - The index value, ranging from 0 to 100.
   */
  const updateNeedlePosition = (index: number) => {
    if (!fearData || !greedData) return;

    if (needleRef.current && numberRef.current) {
      const maxRotation = 180; // Maximum needle rotation (degrees)
      // Calculate rotation based on index (0-100 maps to 0-180 degrees)
      const rotation = (index / 100) * maxRotation;

      needleRef.current.style.transform = `rotate(${rotation}deg)`;

      // Position the number at the end of the needle
      numberRef.current.style.transform = `rotate(-${rotation}deg)`;
      numberRef.current.textContent = index.toFixed(0);
      numberRef.current.style.backgroundColor =
        index > 75
          ? '#87d85f' // Extreme Greed
          : index > 50
            ? '#b9d85a' // Greed
            : index > 25
              ? '#daaf5a' // Fear
              : '#da805a'; // Extreme Fear
    }
  };

  useEffect(() => {
    if (numberRef.current) {
      numberRef.current.textContent = '0';
    }

    if (!fearData || !greedData) return;

    const totalBuyVolume = fearData.buys + greedData.buys;
    const index = (greedData.buys / totalBuyVolume) * 100;

    setIndex(index);
    updateNeedlePosition(index);
  }, [fearData, greedData]);

  return (
    <DefaultLayout>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-wrap justify-center text-center">
          <span className={title({ color: 'red' })}>$FEAR&nbsp;</span>
          <span className={title()}>and&nbsp;</span>
          <span className={title({ color: 'green' })}>$GREED&nbsp;</span>
          <span className={title()}>Index</span>
          <div className={subtitle({ class: 'mt-4' })}>
            Multifactorial Memecoin Market Sentiment Analysis
          </div>
          <div className="inline-block w-full justify-center text-center">
            <span className="text-lg">Now:&nbsp;</span>
            <span
              className={clsx(
                'text-lg',
                index > 50 ? 'text-success' : 'text-danger',
              )}
            >
              {index <= 25
                ? 'Extreme $FEAR'
                : index <= 50
                  ? '$FEAR'
                  : index <= 75
                    ? '$GREED'
                    : 'Extreme $GREED'}
            </span>
          </div>
        </div>

        <div className="mt-8 flex">
          <div className="gauge">
            <div className="gaugeCenter" />
            <div ref={needleRef} className="needle">
              <div ref={numberRef} className="number">
                0
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-row flex-wrap gap-4">
          <Card className="w-full sm:w-fit" shadow="sm">
            <CardHeader className="flex gap-3">
              <Snippet
                hideSymbol
                classNames={{
                  base: 'p-0 bg-transparent',
                }}
                codeString={siteConfig.fearToken}
                variant="flat"
              >
                <span>
                  $FEAR:{' '}
                  <Code
                    className="hidden bg-danger/50 sm:inline-block"
                    color="danger"
                  >
                    {siteConfig.fearToken}
                  </Code>
                  <Code
                    className="inline-block bg-danger/50 sm:hidden"
                    color="danger"
                  >
                    {siteConfig.fearToken.slice(0, 5)}...
                    {siteConfig.fearToken.slice(-4)}
                  </Code>
                </span>
              </Snippet>
            </CardHeader>
            <Divider />
            <CardBody>
              <span className="text-mono text-sm text-default-700">
                Market Cap:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(fearData.marketCap)}
              </span>
              <span className="text-mono text-sm text-default-700">
                Price:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 10,
                }).format(fearData.priceUsd)}
              </span>
            </CardBody>
            <Divider />
            <CardBody className="flex flex-row justify-between gap-2">
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">5m</span>
                <br />
                <span
                  className={clsx(
                    fearData.priceChange.m5 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {fearData.priceChange.m5 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">1h</span>
                <br />
                <span
                  className={clsx(
                    fearData.priceChange.h1 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {fearData.priceChange.h1 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">6h</span>
                <br />
                <span
                  className={clsx(
                    fearData.priceChange.h6 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {fearData.priceChange.h6 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">24h</span>
                <br />
                <span
                  className={clsx(
                    fearData.priceChange.h24 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {fearData.priceChange.h24 ?? 0}%
                </span>
              </span>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <Link
                isExternal
                showAnchorIcon
                className="text-sm text-danger"
                href={siteConfig.links.buyFear}
              >
                Buy $FEAR
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full sm:w-fit" shadow="sm">
            <CardHeader className="flex gap-3">
              <Snippet
                hideSymbol
                classNames={{
                  base: 'p-0 bg-transparent',
                }}
                codeString={siteConfig.greedToken}
                variant="flat"
              >
                <span>
                  $GREED:{' '}
                  <Code
                    className="hidden bg-success/50 sm:inline-block"
                    color="success"
                  >
                    {siteConfig.greedToken}
                  </Code>
                  <Code
                    className="inline-block bg-success/50 sm:hidden"
                    color="success"
                  >
                    {siteConfig.greedToken.slice(0, 5)}...
                    {siteConfig.greedToken.slice(-4)}
                  </Code>
                </span>
              </Snippet>
            </CardHeader>
            <Divider />
            <CardBody>
              <span className="text-mono text-sm text-default-700">
                Market Cap:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(greedData.marketCap)}
              </span>
              <span className="text-mono text-sm text-default-700">
                Price:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 10,
                }).format(greedData.priceUsd)}
              </span>
            </CardBody>
            <Divider />
            <CardBody className="flex flex-row justify-between gap-2">
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">5m</span>
                <br />
                <span
                  className={clsx(
                    greedData.priceChange.m5 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {greedData.priceChange.m5 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">1h</span>
                <br />
                <span
                  className={clsx(
                    greedData.priceChange.h1 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {greedData.priceChange.h1 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">6h</span>
                <br />
                <span
                  className={clsx(
                    greedData.priceChange.h6 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {greedData.priceChange.h6 ?? 0}%
                </span>
              </span>
              <span className="text-mono flex-1 border-r border-divider text-center text-sm text-default-700 last:border-r-0">
                <span className="text-mono text-default-700">24h</span>
                <br />
                <span
                  className={clsx(
                    greedData.priceChange.h24 >= 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {greedData.priceChange.h24 ?? 0}%
                </span>
              </span>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <Link
                isExternal
                showAnchorIcon
                className="text-sm text-success"
                href={siteConfig.links.buyGreed}
              >
                Buy $GREED
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
