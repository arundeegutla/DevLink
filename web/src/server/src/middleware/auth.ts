import { NextApiRequest, NextApiResponse } from 'next';
import { fb } from '../config/firebaseInit';
import { getUserDoc } from '../services/user';

export const authenticateJWT = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const idToken = authHeader.split(' ')[1];

    try {
      const decodedToken = await fb.auth().verifyIdToken(idToken);
      (req as any).user = decodedToken;
      (req as any).userRef = await getUserDoc(decodedToken.uid);

      next(); // Proceed to the next handler.
    } catch (error) {
      console.error('JWT Authentication Error:', error);
      return res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
