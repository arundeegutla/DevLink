import { Request, Response, NextFunction } from 'express';
//import { logger } from '../utils/logger';

// TODO: Set up error logger
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
};
