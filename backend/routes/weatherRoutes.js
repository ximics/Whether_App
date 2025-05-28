import express from 'express';
import { getWeatherByCity } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/:city', getWeatherByCity);

export default router;
