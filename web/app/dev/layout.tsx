'use client';
import NavBar from '@components/common/NavBar';
import React from 'react';
import { UserProvider } from '@context/UserContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-row h-screen bg-[#151515] overflow-hidden">
      <UserProvider>
        <NavBar />
        <div className="flex-grow h-[100vh] overflow-scroll">{children}</div>
      </UserProvider>
      <div className="absolute -top-6 -left-6 w-60 h-60 opacity-30 filter blur-[70px] rounded-full bg-[#4b45fc]"></div>
    </div>
  );
}
