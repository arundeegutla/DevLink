import { Group } from "../models/db";

export const validateNewGroup = (group: Group) => {
    // Checks values for group fields
    const { name, description } = group;
    if (name === undefined || name === "" || typeof name !== "string")
        throw new Error("Name bad request!");
    if (description === undefined || description === "" || typeof description !== "string")
        throw new Error("Description bad request!");
};

export const validateEdit = (group: Partial<Group>) => {
    // Checks types for group fields
    const { name, description } = group;
    if (name !== undefined && typeof name !== "string")
        throw new Error("Name must be a string!");
    if (description !== undefined && typeof description !== "string")
        throw new Error("Description must be a string!");
};
