import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';
import { isEmail } from 'validator';
import config from '../config/config';
import { User } from '../entity/User';

export default class UserController {
  static allowedUpdateKeys = ['name', 'lang'];

  static register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, lang } = req.body;
    if (!(name && email && password && password.length > 5 && isEmail(email))) {
      res.status(400).json({ message: res.__('USER_INVALID') });
    }

    let user: User = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.lang = lang || 'en-US';

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({ message: res.__('USER_INVALID') });
      return;
    }

    try {
      const userRepository = getRepository(User);
      await userRepository.save(user);
    } catch (error) {
      res.status(409).json({ message: res.__('EMAIL_INUSE') });
      return;
    }

    // Sing JWT, valid for 7 days
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    res.status(201).json({ token, user: classToPlain(user) });
  };

  static updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.id;

    const userRepository = getRepository(User);

    // Get user from the database
    let user: User;
    try {
      user = await UserController.getUserById(id, userRepository);
    } catch (error) {
      return res.status(401).json({ message: res.__('USER_NOT_FOUND') });
    }

    let somethingChange = false;
    const body = { ...req.body };

    await Promise.all(
      Object.keys(body).map(async key => {
        if (
          UserController.allowedUpdateKeys.indexOf(key) !== -1 &&
          user[key] !== body[key]
        ) {
          user[key] = body[key];
          somethingChange = true;
        }
      })
    );

    if (somethingChange) {
      try {
        await userRepository.save(user);
      } catch (error) {
        return res.status(400).json({ message: res.__('INTERNAL_ERROR') });
      }
      user = await UserController.getUserById(id, userRepository);
    }

    res.status(200).json({ user: classToPlain(user) });
  };

  static getUserById = async (
    id: number,
    userRepository?: Repository<User>
  ): Promise<User> => {
    if (!userRepository) userRepository = getRepository(User);

    return await userRepository.findOneOrFail(id, {
      where: { isActive: true },
    });
  };
}
