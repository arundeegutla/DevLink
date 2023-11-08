import express, { Router } from "express";
import { createInitialPost, editExistingPost } from "../controllers/post";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the post
 *         body:
 *           type: string
 *           description: Body of the post
 *         owner:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               description:
 *                 type: string
 *                 description: Description of the group
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Members of the group
 *               posts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Posts by the group 
 *         skillsWanted:
 *           type: array
 *           description: Wanted skills from the post
 *       example:
 *         title: DevLink Post
 *         body: This is our post
 *         owner: [{ id: "123", firstName: "John", lastName: "Smith", email: "johnsmith@gmail.com", github: "github.com", skills: [JavaScript] }]
 *         skillsWanted: [Python]
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /user/createPost:
 *   put:
 *     summary: Create a new post
 *     description: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the post
 *               body:
 *                 type: string
 *                 description: The body of the post
 *             example:
 *               title: DevLink Post
 *               body: This is our post
 *     responses:
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Post created
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/createPost", createInitialPost);

/**
 * @swagger
 * /user/editPost:
 *   put:
 *     summary: Edit a post
 *     description: Edit a post's information, only pass the post's fields you want to update
 *     requestBody:
 *       description: Post object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: false
 *               body:
 *                 type: string
 *                 required: false
 *             example:
 *               title: DevLink Post
 *               body: This is our post
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.put("/editPost", editExistingPost);

export default router;
