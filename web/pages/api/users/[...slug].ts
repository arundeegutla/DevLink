import { NextApiRequest, NextApiResponse } from 'next';
import {
  editUserProfileHandler,
  createUserProfileHandler,
  getUserByIdHandler,
  getUserByNameHandler,
} from '@/server/src/controllers/user';

// Utility function for consistent error handling
const handleError = (res: NextApiResponse, error: any) => {
  console.error(error);
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// API Route Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { slug } = req.query;
  const method = req.method;

  try {
    switch (slug[0]) {
      case 'get':
        if (method === 'GET') {
          return await getUserByIdHandler(req, res);
        } else {
          return res.status(405).json({ error: 'Method not allowed' });
        }

      case 'search':
        if (method === 'GET') {
          return await getUserByNameHandler(req, res);
        } else {
          return res.status(405).json({ error: 'Method not allowed' });
        }

      case 'createProfile':
        if (method === 'POST') {
          return await createUserProfileHandler(req, res);
        } else {
          return res.status(405).json({ error: 'Method not allowed' });
        }

      case 'editProfile':
        if (method === 'PUT') {
          return await editUserProfileHandler(req, res);
        } else {
          return res.status(405).json({ error: 'Method not allowed' });
        }

      default:
        return res.status(404).json({ error: `Route '${slug}' not found` });
    }
  } catch (error) {
    return handleError(res, error);
  }
}
