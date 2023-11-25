'use client';
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

import { useUser } from '@context/UserContext';
import { useRouter } from 'next/navigation';

export default function Inbox() {
  const router = useRouter();
  const { fbuser } = useUser();

  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="bg-black p-10 rounded-xl m-4 max-w-lg">
        <h1 className="text-2xl">TODO: Inbox View</h1>
      </div>
    </div>
  );
}
