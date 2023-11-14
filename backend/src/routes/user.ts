
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
 *         email:
 *          type: string
 *          description: Email of the user
 *         github:
 *          type: string
 *          description: Github username of the user
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *             description: Skills of the user
 *         groups:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the group
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               description:
 *                 type: string
 *                 description: Description of the group
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@gmail.com
 *         github: johndoe
 *         skills: [React, Angular, Javascript, Typescript]
 *         groups: [{ id: "123", name: "My Group", description: "A cool group!" }]
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /users/search/{name}:
 *   get:
 *     summary: Get user by name
 *     tags:
 *      - Users
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
 * /users/createProfile:
 *   post:
 *     summary: Create a new user profile
 *     tags:
 *      - Users
 *     description: Create a new user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               github:
 *                 type: string
 *                 description: Github username of the user
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Skills of the user
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@gmail.com
 *               github: johndoe
 *               skills: [React, Angular, Javascript, Typescript]
 *     responses:
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: User profile created
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/createProfile", createUserProfile);

// Get user ID route
/**
 * @swagger
 * /users/get/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *      - Users
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get('/get/:id', getUserbyId);

/**
 * @swagger
 * /users/editProfile:
 *   put:
 *     summary: Edit user profile
 *     tags:
 *      - Users
 *     description: Edit a user's profile information, only pass the user's fields you want to update
 *     requestBody:
 *       description: User object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: false
 *               lastName:
 *                 type: string
 *                 required: false
 *               email:
 *                 type: string
 *                 required: false
 *               github:
 *                 type: string
 *                 required: false
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 required: false
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@gmail.com
 *               github: johndoe
 *               skills: [React, Angular, JavaScript, TypeScript]
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.put('/editProfile', editUserProfile);

export default router;
