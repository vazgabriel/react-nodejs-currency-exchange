import { Router } from 'express';
import CurrencyController from '../controllers/CurrencyController';
import { adminMiddleware } from '../middlewares/AuthMiddleware';
import { withCache } from '../middlewares/WithCache';

const router = Router();

router.get('/', CurrencyController.find);
router.get('/value', [withCache], CurrencyController.getValueOf);
router.get('/:id', CurrencyController.findById);
router.post('/', [adminMiddleware], CurrencyController.create);
router.put('/:id', [adminMiddleware], CurrencyController.update);
router.delete('/:id', [adminMiddleware], CurrencyController.remove);

export default router;
