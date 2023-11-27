'use client';
/**
 * Displays the logged in user's profile. Pfp, contact information, linked platforms,
 * current posts, current projects, and skills.
 */

// External Components
import Loading from '@components/common/Loading';
import UserProfile from '@components/common/UserProfile';

// Auth
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDLUser } from '@context/DLUserContext';

export default function Account() {
  const router = useRouter();
  const { user } = useDLUser();
  return <UserProfile user={user} />;
}
