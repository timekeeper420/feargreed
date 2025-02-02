import { Head } from './head';

import { Navbar } from '@/components/navbar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="flex flex-col items-center gap-1 text-current">
          <span className="text-default-600">$FEAR & $GREED</span>
          <span className="text-default-600">2025 - All rights reserved</span>
        </p>
      </footer>
    </div>
  );
}
