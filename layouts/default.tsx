import { Head } from './head';
import { Alert } from '@heroui/alert';
import { Link } from '@heroui/link';

import { TwitterIcon } from '@/components/icons';
import { TelegramIcon } from '@/components/icons';
import { Navbar } from '@/components/navbar';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Head />
      <Alert
        hideIcon
        isClosable
        classNames={{
          base: 'flex-grow-0 flex-shrink bg-fear text-white px-8 sm:px-3 py-3 relative',
          mainWrapper: 'flex-grow-0 flex-shrink min-h-full w-full',
          description: 'flex-grow-0 flex-shrink text-title text-md w-full text-center',
          closeButton: "absolute top-1/2 -translate-y-1/2 right-4 text-white"
        }}
        color="warning"
        description={
          <>
            Giving away $FEAR and $GREED
            <Link
              isExternal
              className="text-title ml-1 underline"
              href="https://x.com/memeclock420/status/1886934402938065208"
            >
              Join the giveaway
            </Link>
          </>
        }
        radius="none"
        variant="flat"
      />
      <Navbar />
      <main className="container mx-auto flex flex-grow items-center justify-center overflow-y-auto px-6 py-16">
        <section className="flex w-full flex-col items-center justify-center">
          {children}
        </section>
      </main>
      <footer className="mt-auto flex w-full items-center justify-center py-3">
        <p className="flex flex-col items-center gap-1 text-current">
          <span className="mb-1 flex items-center gap-2 text-default-600 sm:hidden">
            <Link isExternal href={siteConfig.links.twitter} title="Twitter">
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link isExternal href={siteConfig.links.telegram} title="Telegram">
              <TelegramIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </span>
          <span className="text-default-600">$FEAR & $GREED</span>
          <span className="text-default-600">2025 - All rights reserved</span>
        </p>
      </footer>
    </div>
  );
}
