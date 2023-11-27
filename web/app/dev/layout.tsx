'use client';
import NavBar from '@components/common/NavBar';
import React from 'react';
import { DLUserProvider } from '@context/DLUserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FBUserProvider } from '@context/FBUserContext';

/*
  POSSIBLE FIX FOR REACT HYDRATION WARNING:
  import dynamic from 'next/dynamic';
  const NavBar = dynamic(() => import('@components/common/NavBar'), { ssr: false });
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <div className="relative flex flex-row h-screen bg-[#151515] overflow-hidden">
      <FBUserProvider>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <DLUserProvider>
            <div className="flex-grow overflow-scroll">{children}</div>
          </DLUserProvider>
        </QueryClientProvider>
      </FBUserProvider>
      <div className="absolute -top-6 -left-6 w-60 h-60 opacity-30 filter blur-[70px] rounded-full bg-[#4b45fc]"></div>
    </div>
  );
}
