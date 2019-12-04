import { Router } from 'express';
import CountryController from '../controllers/CountryController';
import { adminMiddleware, authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', CountryController.find);
router.get('/:id', CountryController.findById);
router.post('/', [adminMiddleware], CountryController.create);
router.put('/:id', [adminMiddleware], CountryController.update);
router.delete('/:id', [adminMiddleware], CountryController.remove);

export default router;
