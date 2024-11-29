import { NextApiRequest, NextApiResponse } from 'next';
import {
  createInitialPostHandler,
  deleteExistingPostHandler,
  editExistingPostHandler,
  retreivePostDataHandler,
  searchExistingPostHandler,
} from '@/server/src/controllers/post';

// Utility function for consistent error handling
const handleError = (res: NextApiResponse, error: any) => {
  console.error(error);
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
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
      case 'createPost':
        if (method === 'POST') {
          await createInitialPostHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'editPost':
        if (method === 'PUT') {
          await editExistingPostHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'deletePost':
        if (method === 'POST') {
          await deleteExistingPostHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'get':
        if (method === 'GET') {
          await retreivePostDataHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'search':
        if (method === 'GET') {
          await searchExistingPostHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      default:
        res.status(404).json({ error: `Route '${slug}' not found` });
    }
  } catch (error) {
    handleError(res, error);
  }
}
