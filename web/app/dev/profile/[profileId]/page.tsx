'use client';
/**
 * Shows someone else's profile. Contact information and the other person's
 * current projects will be hidden.
 */

// External Components
import Loading from '@components/common/Loading';
import UserProfile from '@components/common/UserProfile';

// Auth
import { auth } from '@/firebase/clientApp';
import { useFBUser } from '@context/FBUserContext';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDLUser } from '@context/DLUserContext';

export default function Profile() {
  const router = useRouter();

  const { user } = useDLUser();

  return <UserProfile user={user!} />;
}
