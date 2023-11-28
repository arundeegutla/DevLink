import { useMutation, useQuery } from '@tanstack/react-query';
import { User as FirebaseUser } from 'firebase/auth';

import * as models from '@/hooks/models';
import { http, generateRequestConfig } from '@/hooks/default';

export async function searchUser(user: FirebaseUser, searchQuery: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/search/${encodeURIComponent(searchQuery)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }

      return res.data as models.User;
    })
    .catch((err) => {
      return null;
    });
}

export function useSearchUser(user: FirebaseUser, searchQuery: string) {
  return useQuery({
    queryKey: ['searchUser', searchQuery],
    queryFn: () => searchUser(user, searchQuery),
  });
}

export async function getUser(user: FirebaseUser, userId: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/get/${encodeURIComponent(userId)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }

      return res.data as models.User;
    })
    .catch((err) => {
      return null;
    });
}

export function useGetUser(user: FirebaseUser, userId: string) {
  return useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => getUser(user, userId),
  });
}

export async function createProfile(
  user: FirebaseUser,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post('/users/createProfile', profile, config)
    .then((res) => {
      if (res.status !== 200) {
        return false;
      }

      return true;
    })
    .catch((err) => {
      return false;
    });
}

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      profile: {
        firstName: string;
        lastName: string;
        email: string;
        github: string;
        linkedin: string;
        skills: string[];
      };
    }) => createProfile(data.user, data.profile),
  });
}

export async function editProfile(
  user: FirebaseUser,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .put('/users/editProfile', profile, config)
    .then((res) => {
      if (res.status !== 200) {
        return false;
      }

      return true;
    })
    .catch((err) => {
      return false;
    });
}

export function useEditProfile() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      profile: {
        firstName: string;
        lastName: string;
        email: string;
        github: string;
        linkedin: string;
        skills: string[];
      };
    }) => editProfile(data.user, data.profile),
  });
}

// export function useGetPhotoURL(user: models.User) {
//   const [url, setUrl] = useState('');

//   const fileRef = ref(fstorage,  + '.png');
//   setUrl(await getDownloadURL(fileRef));
//   return url;
// }
