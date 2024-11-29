import { NextApiRequest, NextApiResponse } from 'next';
import {
  createGroup,
  editGroup,
  getGroupOwner,
  requestGroupJoin,
  acceptUser,
  rejectUser,
  getGroupById,
} from '@/server/src/services/group';
import { addGrouptoUser } from '@/server/src/services/user';
import { validateNewGroup, validateEdit } from '@/server/src/utils/group';
import { Group } from '@/server/src/models/db';
import { DocumentReference } from '@google-cloud/firestore';

// Utility function for error handling
const handleError = (res: NextApiResponse, error: any) => {
  console.error(error);
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Handler for creating a group
export async function createInitialGroupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name = '', description = '', color = '#FFFFFF' }: Group = req.body;

  const userDoc: DocumentReference | undefined = req.userRef;
  if (!userDoc) {
    res.status(403).json({ error: 'User profile not created' });
    return;
  }

  const group: Group = {
    name,
    description,
    members: [userDoc as any],
    posts: [],
    owner: userDoc as any,
    userQueue: [],
    color,
  };

  try {
    validateNewGroup(group);
    const newGroup = await createGroup(group);
    await addGrouptoUser(newGroup, req.user.uid);
    res.status(201).json({ message: 'Group created!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for editing a group
export async function editExistingGroupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    description,
    color,
    groupId,
  }: Partial<Group & { groupId: string }> = req.body;

  try {
    const groupOwner = await getGroupOwner(groupId!);
    if (req.user.uid !== groupOwner) {
      res.status(403).json({ error: 'User is not owner of group' });
      return;
    }

    const group: Partial<Group> = {
      ...(name && { name }),
      ...(description && { description }),
      ...(color && { color }),
    };

    validateEdit(group);
    await editGroup(group, groupId!);
    res.status(200).json({ message: 'Group edited!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for requesting to join a group
export async function requestToJoinGroupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { groupId }: { groupId: string } = req.body;

  try {
    const groupOwner = await getGroupOwner(groupId);
    if (req.user.uid === groupOwner) {
      res.status(403).json({ error: 'User is owner of group' });
      return;
    }

    const userRef = req.userRef;
    if (!userRef) {
      res.status(403).json({ error: 'User profile not created' });
      return;
    }

    const errMsg = await requestGroupJoin(groupId, userRef as any);
    if (errMsg) {
      res.status(400).json({ error: errMsg });
    } else {
      res.status(200).json({ message: 'Request sent!' });
    }
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for accepting or rejecting a group join request
export async function handleGroupJoinRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    groupId,
    requestedUserId,
    accept,
  }: { groupId: string; requestedUserId: string; accept: boolean } = req.body;

  try {
    const groupOwner = await getGroupOwner(groupId);
    if (req.user.uid !== groupOwner) {
      res.status(403).json({ error: 'User is not owner of group' });
      return;
    }

    if (accept) {
      await acceptUser(requestedUserId, groupId);
      res.status(200).json({ message: 'User accepted' });
    } else {
      await rejectUser(requestedUserId, groupId);
      res.status(200).json({ message: 'User rejected' });
    }
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for retrieving group data
export async function retrieveGroupDataHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.slug[1];

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Invalid group ID' });
    return;
  }

  try {
    const groupData = await getGroupById(id as string);
    res.status(200).json(groupData);
  } catch (error: any) {
    if (error.message === 'Group does not exist') {
      res.status(404).json({ error: error.message });
    } else {
      handleError(res, error);
    }
  }
}
