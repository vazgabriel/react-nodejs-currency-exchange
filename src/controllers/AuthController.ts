import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { isEmail } from 'validator';
import config from '../config/config';
import { User } from '../entity/User';
import UserController from './UserController';

class AuthController {
  static login = async (req: Request, res: Response) => {
    // Get user from database
    let user: User;
    try {
      let { email, password } = req.body;
      if (!(email && password && password.length > 5 && isEmail(email))) {
        throw new Error();
      }

      const userRepository = getRepository(User);
      user = await userRepository.findOneOrFail({
        where: { email, isActive: true },
      });
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        throw new Error();
      }
    } catch (error) {
      return res.status(401).json({ message: res.__('AUTH_FAIL') });
    }

    // Sing JWT, valid for 7 days
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    res.json({ token, user: classToPlain(user) });
  };

  static changePassword = async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.id;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (
      !(
        oldPassword &&
        newPassword &&
        oldPassword.length > 5 &&
        newPassword.length > 5
      )
    ) {
      res.status(400).json({ message: res.__('PASS_LESS_6') });
    }

    const userRepository = getRepository(User);

    // Get user from the database
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id, {
        where: { isActive: true },
      });
    } catch (error) {
      return res.status(401).json({ message: res.__('USER_NOT_FOUND') });
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      return res.status(401).json({ message: res.__('OLD_PASS_NOT_VALID') });
    }

    // Hash the new password and save
    user.password = newPassword;
    user.hashPassword();
    await userRepository.save(user);

    res.json({ message: res.__('PASS_UPDATED') });
  };

  static renewToken = async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.id;

    // Get user from the database
    let user: User;
    try {
      user = await UserController.getUserById(id, null);
    } catch (error) {
      return res.status(401).json({ message: res.__('USER_NOT_FOUND') });
    }

    // Sing JWT, valid for 7 days
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    res.json({ token, user: classToPlain(user) });
  };
}

export default AuthController;
