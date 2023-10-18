import { Request, Response, NextFunction } from "express";
import { queryUserbyId } from "../services/user";
import { User } from "../models/db";

export const getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    const queryID: string = req.params.id;
    console.log("SLUG", queryID);
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

