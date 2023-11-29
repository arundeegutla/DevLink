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
        <DLUserProvider>{<Stack>
        <Stack.Screen name="(/dev/home)" options={{ headerShown: false }} />
      </Stack>}</DLUserProvider>
      </FBUserProvider>
    </QueryClientProvider>
  );
}
