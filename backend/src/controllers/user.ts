import { Request, Response, NextFunction } from "express";
import { queryUserbyId, queryUserbyName, createProfile, editProfile } from "../services/user";
import { User, contactInfo } from "../models/db";
import { validateNewUser, validateEdit } from "../utils/user";

export const getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    const queryID: string = req.params.id;
    try {
        const userResult: (User|undefined) = await queryUserbyId(queryID);
        if (userResult === undefined)
            res.status(404).send({error: "User not found!"});
        else
            res.send(userResult);
    } catch (error) {
        next(error);
    }
  };

export const getUserByName = async (req: Request, res: Response, next: NextFunction) => {
    const queryName = req.params.name;
    try {
        const userResult: (User[]) = await queryUserbyName(queryName);
        res.send(userResult);
    } catch (error) {
        next(error);
    }
  };

export const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {firstName = "", lastName = "", contactInfo, skills = []}: User = req.body;
    const {email = "", github = ""} = contactInfo;
    const user: User = { firstName, lastName, contactInfo: {email, github}, skills, groups: [] };

    // Validates request body
    try {
        validateNewUser(user);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    const uid: string = res.locals.user.uid;
    try {
        await createProfile(user, uid);
        res.send({message: "User profile created!"});
    } catch (error) {
        next(error);
    }
}

export const editUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, contactInfo, skills}: User = req.body;
    const {email, github} = contactInfo;

    // Checks for undefined and inserts them into user object
    const user: Partial<User> = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        contactInfo: ({ ...(email && { email }), ...(github && { github })}),
        ...(skills && { skills }),
    };
    try {
        validateEdit(user);
    } catch (error) {
        res.status(400).send({error: error.message});
    }

    const uid: string = res.locals.user.uid;
    try {
        await editProfile(user, uid);
        res.send({message: "User profile edited!"});
    } catch (error) {
        next(error);
    }
}
