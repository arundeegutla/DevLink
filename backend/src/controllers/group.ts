import { Request, Response, NextFunction } from "express";
import { createGroup, editGroup } from "../services/group";
import { Group } from "../models/db";
import { validateNewGroup, validateEdit } from "../utils/group";

export const createInitialGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name = "", description = "" }: Group = req.body;
  const group: Group = { name, description, groupId: "", members: [], posts: []};

  // Validates request body
  try {
    validateNewGroup(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  try {
    await createGroup(group);
    res.send({ message: "Group created!" });
  } catch (error) {
    next(error);
  }
};

export const editExistingGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, groupId }: Group = req.body;

  // Checks for undefined and inserts them into user object
  const group: Partial<Group> = {
    ...(name && { name }),
    ...(description && { description }),
    ...(groupId && { groupId }),
  };
  try {
    validateEdit(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  try {
    await editGroup(group, groupId);
    res.send({ message: "Group edited!" });
  } catch (error) {
    next(error);
  }
};
