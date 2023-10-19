import express, { Router } from 'express';
import { getUserbyId, getUserByName, createUserProfile } from '../controllers/user';

// Create a new router instance
const router: Router = express.Router();

// Login Route
// router.post('/login', userLogin);

// Get user ID route

// Get user name route
router.get('/search/:name', getUserByName);

router.post('/createProfile', createUserProfile);

router.get('/get/:id', getUserbyId);
export default router;
