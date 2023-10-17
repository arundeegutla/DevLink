// Example Code
import express, { Router } from 'express';
import { getTestHome, getAbout } from '../controllers/test';

// Create a new router instance
const router: Router = express.Router();

// Home page route.
router.get('/', getTestHome);

// About page route.
router.get('/about', getAbout);

export default router;
