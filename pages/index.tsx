'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Gauge } from '@/components/gauge';
import { subtitle, title } from '@/components/primitives';
import { TokenCard } from '@/components/token-card';
import { siteConfig } from '@/config/site';
import { useTokenData } from '@/context/TokenDataContext';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const { fearData, greedData } = useTokenData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let index = 0;

    if (fearData && greedData) {
      const absFearChange = Math.abs(fearData.priceChange.h6 ?? 0);
      const absGreedChange = Math.abs(greedData.priceChange.h6 ?? 0);
      const totalChange = absFearChange + absGreedChange;

      if (absGreedChange !== 0 && totalChange !== 0) {
        index = (absGreedChange / totalChange) * 100;
      } else {
        index = 0; // Handle case where both changes are zero to avoid NaN
      }
    }

    setIndex(index);
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
                `text-${
                  index > 75
                    ? 'extremeGreed' // Extreme Greed
                    : index > 50
                      ? 'greed' // Greed
                      : index > 25
                        ? 'fear' // Fear
                        : 'extremeFear'
                }`,
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

        <div className="mt-10 flex">
          <Gauge index={index} />
        </div>

        <div className="mt-8 flex flex-row flex-wrap gap-4">
          <TokenCard
            buyLink={siteConfig.links.buyFear}
            color="danger"
            tokenAddress={siteConfig.fearToken}
            tokenData={fearData}
            tokenName="$FEAR"
          />

          <TokenCard
            buyLink={siteConfig.links.buyGreed}
            color="success"
            tokenAddress={siteConfig.greedToken}
            tokenData={greedData}
            tokenName="$GREED"
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
