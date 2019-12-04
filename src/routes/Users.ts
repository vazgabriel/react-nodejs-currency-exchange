import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.patch('/update-profile', [authMiddleware], UserController.updateProfile);

export default router;
