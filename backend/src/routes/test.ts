// Example Code
import express, { Router } from 'express';
import { getTestHome, verifyAuthTest } from '../controllers/test';
import { getUserbyId } from '../controllers/user';

// Create a new router instance
const router: Router = express.Router();

// Home page route.
router.get('/', getTestHome);

// About page route.
router.get('/verifyAuth', verifyAuthTest);

export default router;
