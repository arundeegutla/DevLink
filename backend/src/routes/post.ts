import express, { Router } from "express";
import { createInitialPost, editExistingPost, deleteExistingPost } from "../controllers/post";

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
 *   post:
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
 *                 required: true
 *               body:
 *                 type: string
 *                 required: true
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

/**
 * @swagger
 * /user/deletePost:
 *   delete:
 *     summary: Delete a post
 *     description: Delete a post
 *     requestBody:
 *       description: Post object to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 required: true
 *             example:
 *               postId: a1b2c3
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.delete("/deletePost", deleteExistingPost);

export default router;
