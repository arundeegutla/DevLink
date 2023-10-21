
import express, { Router } from 'express';
import { getUserbyId, getUserByName, createUserProfile, editUserProfile } from '../controllers/user';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - ContactInfo
 *         - Skills
 *       properties:
 *         FirstName:
 *           type: string
 *           description: First name of the user
 *         LastName:
 *           type: string
 *           description: Last name of the user
 *         ContactInfo:
 *           type: object
 *           properties:
 *             Email:
 *               type: string
 *               description: Email of the user
 *             Github:
 *               type: string
 *               description: Github of the user
 *         Skills:
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
 *         Connections:
 *           type: array
 *           items:
 *             type: string
 *             description: Connections of the user
 *         Groups:
 *           type: array
 *           items:
 *             type: string
 *             description: Groups of the user
 *       example:
 *         FirstName: John
 *         LastName: Doe
 *         ContactInfo:
 *           Email: johndoe@gmail.com
 *           Github: johndoe
 *         Skills:
 *           Frameworks: [React, Angular]
 *           Languages: [Javascript, Typescript]
 *         Connections: [123, 456]
 *         Groups: [123, 456]
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

router.get("/get/:id", getUserbyId);

// Edit profile route
router.post('/editProfile', editUserProfile);


export default router;
