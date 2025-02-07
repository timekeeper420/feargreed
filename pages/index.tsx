'use client';

import clsx from 'clsx';

import Chart from '@/components/chart';
import { Gauge } from '@/components/gauge';
import { subtitle, title } from '@/components/primitives';
import { TokenCard } from '@/components/token-card';
import links from '@/config/links';
import tokens from '@/config/tokens';
import { useTokenData } from '@/context/token-data';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const { fearData, greedData, index } = useTokenData();

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
          <div className="inline-flex w-full items-center justify-center text-center">
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

        <Gauge index={index} />

        <div className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <TokenCard
            key="fear"
            buyLink={links.buy.fear}
            color="danger"
            index={0}
            swapLink={links.swap.fear}
            tokenAddress={tokens.fear}
            tokenData={fearData}
            tokenKey="fear"
            tokenName="$FEAR"
          />
          <TokenCard
            key="greed"
            buyLink={links.buy.greed}
            color="success"
            index={1}
            swapLink={links.swap.greed}
            tokenAddress={tokens.greed}
            tokenData={greedData}
            tokenKey="greed"
            tokenName="$GREED"
          />
        </div>

        <div className="mt-0 w-full grid-cols-1">
          <Chart />
        </div>
      </div>
    </DefaultLayout>
  );
}
