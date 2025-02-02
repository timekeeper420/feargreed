import { Code } from '@heroui/code';
import { Snippet } from '@heroui/snippet';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { subtitle, title } from '@/components/primitives';
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
          ? '#1eaa59' // Extreme Greed
          : index > 50
            ? '#9baa1e' // Greed
            : index > 25
              ? '#f1c40f' // Fear
              : '#e84c3d'; // Extreme Fear
    }
  };

  useEffect(() => {
    const totalMarketCap = fearData.marketCap + greedData.marketCap;
    const greedMarketCap = greedData.marketCap;
    const index = (greedMarketCap / totalMarketCap) * 100;

    setIndex(index);
    updateNeedlePosition(index);
  }, [fearData, greedData]);

  return (
    <DefaultLayout>
      <section className="flex h-full w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex w-full flex-wrap justify-center text-center">
          <span className={title()}>The&nbsp;</span>
          <span className={title({ color: 'red' })}>$FEAR&nbsp;</span>
          <span className={title()}>and&nbsp;</span>
          <span className={title({ color: 'green' })}>$GREED&nbsp;</span>
          <span className={title()}>index</span>
          <div className={subtitle({ class: 'mt-4' })}>
            Track the dominance of $FEAR and $GREED.
          </div>
          <div className="inline-block w-full justify-center text-center">
            <span className="text-lg">Now:&nbsp;</span>
            <span
              className={clsx(
                'text-lg',
                index > 50 ? 'text-success' : 'text-danger',
              )}
            >
              {index > 50 ? '$GREED' : '$FEAR'}
            </span>
          </div>
        </div>

        <div className="mt-8 flex">
          <div className="gauge">
            <div className="sliceColors" />
            <div className="gaugeCenter" />
            <div ref={needleRef} className="needle">
              <div ref={numberRef} className="number" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Snippet
            hideSymbol
            codeString="9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump"
            variant="bordered"
          >
            <span>
              $FEAR:{' '}
              <Code className="bg-danger/50 hidden sm:inline-block" color="danger">
              9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump
              </Code>
              <Code className="bg-danger/50 inline-block sm:hidden" color="danger">
                9L9km...pump
              </Code>
            </span>
          </Snippet>
          <Snippet
            hideSymbol
            codeString="FDjkhUeXHiGVDsieUyyKjXSnKDdBvtmGrjg4ZZ5QmAAk"
            variant="bordered"
          >
            <span>
              $GREED:{' '}
              <Code className="bg-success/50 hidden sm:inline-block" color="success">
                FDjkhUeXHiGVDsieUyyKjXSnKDdBvtmGrjg4ZZ5QmAAk
              </Code>
              <Code className="bg-success/50 inline-block sm:hidden" color="success">
                DdtbT...pump
              </Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
