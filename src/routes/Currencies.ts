import { Router } from 'express';
import CurrencyController from '../controllers/CurrencyController';
import { adminMiddleware, authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', CurrencyController.find);
router.get('/value', CurrencyController.getValueOf);
router.get('/:id', CurrencyController.findById);
router.post('/', [adminMiddleware], CurrencyController.create);
router.put('/:id', [adminMiddleware], CurrencyController.update);
router.delete('/:id', [adminMiddleware], CurrencyController.remove);

export default router;
