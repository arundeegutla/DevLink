import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPost,
  editPost,
  deletePost,
  getPostUserOwner,
  getPostByFilter,
  getPostById,
} from '@/server/src/services/post';
import { validateNewPost, validateEdit } from '@/server/src/utils/post';
import { groupWithIdExists, getGroupOwner } from '@/server/src/services/group';
import { Post } from '@/server/src/models/db';

// Utility function for error handling
const handleError = (res: NextApiResponse, error: any) => {
  console.error(error);
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Handler for creating a post
export async function createInitialPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = '', body = '', groupId = '', skillsWanted = [] } = req.body;

  if (!groupId) {
    res.status(403).json({ error: 'Not assigned group' });
    return;
  }

  try {
    const groupExists = await groupWithIdExists(groupId);
    if (!groupExists) {
      res.status(404).json({ error: 'Group does not exist' });
      return;
    }

    const groupOwner = await getGroupOwner(groupId);
    const userUid = req.user.uid;
    if (userUid !== groupOwner) {
      res.status(403).json({ error: 'User is not owner of group' });
      return;
    }

    const post: Partial<Post> = { title, body, skillsWanted };
    validateNewPost(post);
    await createPost(post, groupId);
    res.status(201).json({ message: 'Post created!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for editing a post
export async function editExistingPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, body, skillsWanted, postId } = req.body;

  const post: Partial<Post> = {
    ...(title && { title }),
    ...(body && { body }),
    ...(skillsWanted && { skillsWanted }),
  };

  try {
    validateEdit(post);
    await editPost(post, postId);
    res.status(200).json({ message: 'Post edited!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for deleting a post
export async function deleteExistingPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.body;

  if (!postId) {
    res.status(400).json({ error: 'Post ID is required' });
    return;
  }

  try {
    const userUid = req.user.uid;
    const postOwner = await getPostUserOwner(postId);

    if (userUid !== postOwner) {
      res.status(403).json({ error: 'User is not owner of post' });
      return;
    }

    await deletePost(postId);
    res.status(200).json({ message: 'Post deleted!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for retrieving post data
export async function retreivePostDataHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.slug[1];

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Invalid post ID' });
    return;
  }

  try {
    const post = await getPostById(id as string);
    res.status(200).json(post);
  } catch (error: any) {
    if (error.message === 'Post does not exist') {
      res.status(404).json({ error: error.message });
    } else {
      handleError(res, error);
    }
  }
}

// Handler for searching posts
export async function searchExistingPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filter } = req.query;

  if (!filter) {
    res.status(400).json({ error: 'Filter parameter is required' });
    return;
  }

  const filterArray = Array.isArray(filter) ? filter : [filter];

  try {
    const postResult = await getPostByFilter(filterArray as string[]);
    res.status(200).json(postResult);
  } catch (error) {
    handleError(res, error);
  }
}
