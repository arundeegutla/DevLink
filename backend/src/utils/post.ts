import { Post } from "../models/db";

export const validateNewPost = (post: Post) => {
    // Checks values for group fields
    const { title, body } = post;
    if (title === undefined || title === "" || typeof title !== "string")
        throw new Error("Title bad request!");
    if (body === undefined || body === "" || typeof body !== "string")
        throw new Error("Body bad request!");
};

export const validateEdit = (post: Partial<Post>) => {
    // Checks types for group fields
    const { title, body } = post;
    if (title !== undefined && typeof title !== "string")
        throw new Error("Title must be a string!");
    if (body !== undefined && typeof body !== "string")
        throw new Error("Body must be a string!");
};
