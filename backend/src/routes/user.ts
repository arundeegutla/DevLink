import express, { Router } from 'express';
import { getUserbyId, getUserByName, createUserProfile, editUserProfile } from '../controllers/user';

// Create a new router instance
const router: Router = express.Router();

// Login Route
// router.post('/login', userLogin);

// Get user ID route
router.get('/get/:id', getUserbyId);

// Get user name route
router.get('/search/:name', getUserByName);

// Create profile route
router.post('/createProfile', createUserProfile);

// Edit profile route
router.post('/editProfile', editUserProfile);
export default router;
