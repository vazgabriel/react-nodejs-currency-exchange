import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/login', AuthController.login);
router.patch(
  '/change-password',
  [authMiddleware],
  AuthController.changePassword
);
router.get('/renew-token', [authMiddleware], AuthController.renewToken);

export default router;
