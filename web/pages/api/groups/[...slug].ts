import { NextApiRequest, NextApiResponse } from 'next';
import {
  createInitialGroupHandler,
  editExistingGroupHandler,
  handleGroupJoinRequestHandler,
  requestToJoinGroupHandler,
  retrieveGroupDataHandler,
} from '@/server/src/controllers/group';

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
  const test = Array.isArray(slug) ? slug[0] : slug;

  try {
    switch (test) {
      case 'createGroup':
        if (method === 'POST') {
          await createInitialGroupHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'editGroup':
        if (method === 'PUT') {
          await editExistingGroupHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'joinRequest':
        if (method === 'POST') {
          await requestToJoinGroupHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'handleJoinRequest':
        if (method === 'POST') {
          await handleGroupJoinRequestHandler(req, res);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'get':
        if (method === 'GET') {
          await retrieveGroupDataHandler(req, res);
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
