import express, { Router } from "express";
import { createInitialPost, editExistingPost, deleteExistingPost, retreivePostData } from "../controllers/post";

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
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Group Id
 *             name:
 *               type: string
 *               description: Name of the group
 *             description:
 *               type: string
 *               description: Description of the group
 *             color:
 *               type: string
 *               description: Color of the group
 *         skillsWanted:
 *           type: array
 *           description: Wanted skills from the post
 *       example:
 *         title: DevLink Post
 *         body: This is our post
 *         owner:
 *           id: "123"
 *           name: "John Smith"
 *           description: "Group description"
 *           color: "#FF0000"
 *         skillsWanted:
 *           - Python
 */

// Create a new router instance
const router: Router = express.Router();

/**
 * @swagger
 * /posts/createPost:
 *   post:
 *     summary: Create a new post
 *     tags:
 *      - Posts
 *     description: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: Group Id
 *               title:
 *                 type: string
 *                 description: Name of the post
 *               body:
 *                 type: string
 *                 description: The body of the post
 *               skillsWanted:
 *                 type: array
 *                 description: Array of wanted skills
 *             example:
 *               groupId: "123"
 *               title: DevLink Post
 *               body: This is our post
 *               skillsWanted:
 *                 - Python
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
 * /posts/editPost:
 *   put:
 *     summary: Edit a post
 *     tags:
 *      - Posts
 *     description: Edit a post's information, only pass the post's fields you want to update
 *     requestBody:
 *       description: Post object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 required: true
 *               title:
 *                 type: string
 *                 required: false
 *               body:
 *                 type: string
 *                 required: false
 *               skillsWanted:
 *                 type: array
 *                 required: false
 *             example:
 *               title: DevLink Post
 *               body: This is our post
 *               postId: ab18duh429lk
 *               skillsWanted:
 *                 - Python
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
 * /posts/deletePost:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *      - Posts
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

/**
 * @swagger
 * /posts/get/{id}:
 *   get:
 *     summary: Get a post by id
 *     tags:
 *      - Posts
 *     description: Get a post by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get("/get/:id", retreivePostData);

export default router;
