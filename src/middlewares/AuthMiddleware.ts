import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  Get the jwt token from the head
  const token = <string>req.headers['authorization'];
  let jwtPayload;

  //  Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;

    res.locals.logged = await getRepository(User).findOneOrFail(
      res.locals.jwtPayload.id,
      {
        where: { isActive: true },
      }
    );
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //  Call the next middleware or controller
  next();
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  Get the jwt token from the head
  const token = <string>req.headers['authorization'];
  let jwtPayload;

  //  Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;

    res.locals.logged = await getRepository(User).findOneOrFail(
      res.locals.jwtPayload.id,
      {
        where: { isActive: true, typeUser: 'admin' },
      }
    );
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //  Call the next middleware or controller
  next();
};
