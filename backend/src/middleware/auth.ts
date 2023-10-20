import { Request, Response, NextFunction } from 'express';
import { fb } from "../config/firebaseInit";

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const idToken = authHeader.split(" ")[1];
      fb
        .auth()
        .verifyIdToken(idToken)
        .then(function (decodedToken) {
            res.locals.user = decodedToken;
          return next();
        })
        .catch(function (error) {
          console.log(error);
          return res.sendStatus(403);
        });
    } else {
      res.sendStatus(401);
    }
  };
