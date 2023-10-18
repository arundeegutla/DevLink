import express, { Router } from 'express';
import { getUserbyId } from '../controllers/user';

// Create a new router instance
const router: Router = express.Router();

// Login Route
// router.post('/login', userLogin);

// User Route
router.get('/:id', getUserbyId);

export default router;
