import { Request, Response, NextFunction } from "express";
import { queryUserbyId, queryUserbyName } from "../services/user";
import { User } from "../models/db";

export const getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    const queryID = req.params.slug;
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