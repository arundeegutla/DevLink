// Example Code
import { Request, Response, NextFunction } from "express";
import { throwError } from "../services/test";

export const getTestHome = (req: Request, res: Response, next: NextFunction) => {
  res.send("Test home page");
};

export const verifyAuthTest = (req: Request, res: Response, next: NextFunction) => {
        res.send({ message: "User is logged in", user: res.locals.user});
};

// export const registerUser = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userName = req.body.username;
//         const userPass = req.body.password;
//         await registerNewUser(userName, userPass);
//         res.send("User registered");
//     } catch (err) {
//         next(err);
//     }
// }
