import express, { Router } from 'express';
import { getUserbyId, getUserByName } from '../controllers/user';

// Create a new router instance
const router: Router = express.Router();

// Login Route
// router.post('/login', userLogin);

// Get user ID route
router.get('/:id', getUserbyId);

// Get user name route
router.get('/search/:name', getUserByName);

export default router;
