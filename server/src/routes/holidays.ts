import express from 'express';
import * as holidaysController from '../controllers/holidaysController';

const router = express.Router();

router.get('/', holidaysController.getAllHolidays);
router.get('/:id', holidaysController.getById);
router.get('/update/:id', holidaysController.updateHoliday);
router.get('/company/:companyName', holidaysController.getByCompany);

export default router;
