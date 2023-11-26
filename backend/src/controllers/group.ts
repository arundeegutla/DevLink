import { Request, Response, NextFunction } from "express";
import { createGroup, editGroup, getGroupOwner, requestGroupJoin, acceptUser, rejectUser, getGroupById } from "../services/group";
import { Group } from "../models/db";
import { validateNewGroup, validateEdit } from "../utils/group";
import { DocumentReference } from "@google-cloud/firestore";
import { error } from "console";
import { addGrouptoUser } from "../services/user";

export const createInitialGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name = "", description = "", color = "#FFFFFF" }: Group = req.body;
  
  const userDoc: DocumentReference | undefined = res.locals.userRef;
  if (userDoc === undefined) {
    res.status(403).send({ error: "User profile not created" });
    return;
  }

  const group: Group = { name, description, members: [res.locals.userRef], posts: [], owner: res.locals.userRef, userQueue: [], color};

  // Validates request body
  try {
    validateNewGroup(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }
  try {
    const newGrop = await createGroup(group);
    console.log("GROUPID",newGrop);
    await addGrouptoUser(newGrop, res.locals.user.uid);
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
  const { name, description, color }: Group = req.body;
  const { groupId } = req.body;

  // Checks for undefined and inserts them into user object
  const groupOwner: string = await getGroupOwner(groupId);
  if (res.locals.user.uid !== groupOwner) {
    res.status(403).send({ error: "User is not owner of group" });
    return;
  }

  const group: Partial<Group> = {
    ...(name && { name }),
    ...(description && { description }),
    ...(color && { color })
  };
  try {
    validateEdit(group);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }
  try {
    await editGroup(group, groupId);
    res.send({ message: "Group edited!" });
  } catch (error) {
    next(error);
  }
};

export const requestToJoinGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.body;

  const groupOwner: string = await getGroupOwner(groupId);
  if (res.locals.user.uid === groupOwner) {
    res.status(403).send({ error: "User is owner of group" });
    return;
  }
  if (res.locals.userRef === undefined) {
    res.status(403).send({ error: "User profile not created" });
    return;
  }

  try {
    const errMsg: string = await requestGroupJoin(groupId, res.locals.userRef);
    if (errMsg !== "") {
      res.status(400).send({ error: errMsg });
      return;
    }
    res.send({ message: "Request sent!" });
  } catch (error) {
    next(error);
  }
};

export const handleGroupJoinRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupId, requestedUserId, accept } = req.body;

  const groupOwner: string = await getGroupOwner(groupId);
  if (res.locals.user.uid !== groupOwner) {
    console.log("userID", res.locals.user.uid);
    console.log("groupOwner", groupOwner);
    res.status(403).send({ error: "User is not owner of group" });
    return;
  }

  if (accept === true) {
    try {
      await acceptUser(requestedUserId, groupId);
      res.send({ message: "User accepted" });
    } catch (error) {
      next(error);
    }
  }
  else if (accept === false) {
    try {
      await rejectUser(requestedUserId, groupId);
      res.send({ message: "User rejected" });
    } catch (error) {
      next(error);
    }
  }
  else {
    res.status(400).send({ error: "Invalid request" });
  }
};

export const retreiveGroupData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const groupId: string = req.params.id;

  try {
    const groupData = await getGroupById(groupId);
    res.send(groupData);
  } catch (error) {
    next(error);
  }
};
