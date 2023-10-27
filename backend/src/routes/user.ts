
import express, { Router } from 'express';
import { getUserbyId, getUserByName, createUserProfile, editUserProfile } from '../controllers/user';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - contactInfo
 *         - skills
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         contactInfo:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: email of the user
 *             github:
 *               type: string
 *               description: github of the user
 *         skills:
 *           type: object
 *           properties:
 *             Frameworks:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Frameworks of the user
 *             Languages:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Languages of the user
 *         connections:
 *           type: array
 *           items:
 *             type: string
 *             description: connections of the user
 *         groups:
 *           type: array
 *           items:
 *             type: string
 *             description: groups of the user
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         contactInfo:
 *           email: johndoe@gmail.com
 *           github: johndoe
 *         skills:
 *           Frameworks: [React, Angular]
 *           Languages: [Javascript, Typescript]
 *         connections: [123, 456]
 *         groups: [123, 456]
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /user/search/{name}:
 *   get:
 *     summary: Get user by name
 *     description: Retrieve a user by their name
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: First name of the user to retrieve
 *     responses:
 *       '200':
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *       '404':
 *         description: User not found
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get("/search/:name", getUserByName);


/**
 * @swagger
 * /user/createProfile:
 *   post:
 *     summary: Create a new user profile
 *     description: Create a new user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       '200':
 *         description: User profile created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/createProfile", createUserProfile);

// Get user ID route
router.get('/get/:id', getUserbyId);

// Edit profile route
router.post('/editProfile', editUserProfile);

export default router;
