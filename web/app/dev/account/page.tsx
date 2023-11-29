'use client';

/**
 * Displays the logged in user's profile. Pfp, contact information, linked platforms,
 * current posts, current projects, and skills.
 */

// External Components
import UserProfile from '@components/common/UserProfile';

// Auth
import { useRouter } from 'next/navigation';
import { useDLUser } from '@context/DLUserContext';
import { useFBUser } from '@context/FBUserContext';

export default function Account() {
  const { fbuser } = useFBUser();
  const { user } = useDLUser();
  return <UserProfile user={user} id={fbuser.uid} />;
}
