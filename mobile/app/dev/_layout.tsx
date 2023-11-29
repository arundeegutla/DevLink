import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DLUserProvider } from '../context/DLUserContext';
import { FBUserProvider } from '../context/FBUserContext';
import { Stack } from 'expo-router';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FBUserProvider>
        <DLUserProvider>
          <RootLayoutNav />
          {children}
        </DLUserProvider>
      </FBUserProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
