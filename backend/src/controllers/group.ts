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
  const group: Group = { name, description, members: [], posts: []};

  // Validates request body
  try {
    validateNewGroup(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  const uid: string = res.locals.user.uid;
  try {
    await createGroup(group, uid);
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
  const { name, description }: Group = req.body;

  // Checks for undefined and inserts them into user object
  const group: Partial<Group> = {
    ...(name && { name }),
    ...(description && { description }),
  };
  try {
    validateEdit(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  const uid: string = res.locals.user.uid;
  try {
    await editGroup(group, uid);
    res.send({ message: "Group edited!" });
  } catch (error) {
    next(error);
  }
};
