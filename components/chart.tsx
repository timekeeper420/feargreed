import { Card, CardBody } from '@heroui/card';
import { Tab, Tabs } from '@heroui/tabs';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import tokens from '@/config/tokens';

/**
 * A chart component that displays a price chart for a token.
 */
export default function Chart() {
  const [selected, setSelected] = useState('light');
  const [isLoadingFear, setIsLoadingFear] = useState(true);
  const [isLoadingGreed, setIsLoadingGreed] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Chart Theme"
        classNames={{
          base: 'mb-4',
        }}
        selectedKey={selected}
        onSelectionChange={key => {
          key === 'fear' ? setIsLoadingFear(true) : setIsLoadingGreed(true);

          return setSelected(key as string);
        }}
      >
        <Tab key="fear" title="$FEAR">
          <Card>
            <CardBody className="overflow-hidden p-0">
              {isLoadingFear && (
                <div className="flex h-[500px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-fear" />
                </div>
              )}

              {hasError && (
                <div className="flex h-[500px] items-center justify-center bg-gray-800/30">
                  <div className="text-gray-400">Error loading chart</div>
                </div>
              )}
              <iframe
                className={`h-[500px] w-full border-0 ${
                  isLoadingFear ? 'hidden' : 'block'
                }`}
                src={`https://www.gmgn.cc/kline/sol/${tokens.fear}?theme=${theme}`}
                title="Fear Price Chart"
                onError={() => {
                  setIsLoadingFear(false);
                  setHasError(true);
                }}
                onLoad={() => setIsLoadingFear(false)}
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="greed" title="$GREED">
          <Card>
            <CardBody className="overflow-hidden p-0">
              {isLoadingGreed && (
                <div className="flex h-[500px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-greed" />
                </div>
              )}
              {hasError && (
                <div className="flex h-[500px] items-center justify-center bg-gray-800/30">
                  <div className="text-gray-400">Error loading chart</div>
                </div>
              )}
              <iframe
                className={`h-[500px] w-full border-0 ${
                  isLoadingGreed ? 'hidden' : 'block'
                }`}
                src={`https://www.gmgn.cc/kline/sol/${tokens.greed}?theme=${theme}`}
                title="Greed Price Chart"
                onError={() => {
                  setIsLoadingGreed(false);
                  setHasError(true);
                }}
                onLoad={() => setIsLoadingGreed(false)}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
