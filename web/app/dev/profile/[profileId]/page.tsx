'use client';
/**
 * Shows someone else's profile. Contact information and the other person's
 * current projects will be hidden.
 */

// External Components
import Loading from '@components/common/Loading';
import UserProfile from '@components/common/UserProfile';

// Auth
import { useFBUser } from '@context/FBUserContext';

import { useEffect, useState } from 'react';
import { User } from '@/hooks/models';
import { getUser } from '@/hooks/users';
import Error from '@components/common/Error';

export default function Profile({ params }: { params: { profileId: string } }) {
  const profileId = params.profileId;
  const { fbuser } = useFBUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUser(fbuser, profileId);
      if (!u) setError(true);
      else setUser(u);
      setLoading(false);
    };
    fetchUser();
  }, [fbuser, profileId]);

  if (loading) return <Loading />;
  else if (error || !user) return <Error message={`Can't find user`} />;

  console.log(user);
  return <UserProfile user={user} id={profileId} />;
}
