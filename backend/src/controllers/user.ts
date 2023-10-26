import { Request, Response, NextFunction } from "express";
import { queryUserbyId, queryUserbyName, createProfile, editProfile } from "../services/user";
import { User } from "../models/db";

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
    const {FirstName = "", LastName = "", ContactInfo = {Email: "", Github: ""}, Skills = []}: User = req.body;
    const user: User = { FirstName, LastName, ContactInfo, Skills, Connections: [], Groups: [] };
    const uid: string = res.locals.user.uid;
    try {
        await createProfile(user, uid);
        res.send({message: "User profile created!"});
    } catch (error) {
        next(error);
    }
}

export const editUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {FirstName, LastName, ContactInfo, Skills}: User = req.body;
    const user: Partial<User> = {};
    
    if (FirstName !== undefined) {
        user.FirstName = FirstName;
    }
    if (LastName !== undefined) {
        user.LastName = LastName;
    }
    if (ContactInfo !== undefined) {
        user.ContactInfo = ContactInfo;
    }
    if (Skills !== undefined) {
        user.Skills = Skills;
    }
    const uid: string = res.locals.user.uid;
    try {
        await editProfile(user, uid);
        res.send({message: "User profile edited!"});
    } catch (error) {
        next(error);
    }
}
