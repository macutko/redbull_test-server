import express from 'express';
import {rate} from './rate.controller';


import {topTen} from "./topten.controller";
import {getAverageRating} from "./getAverageRating.controller";
import {getUserRating} from "./getUserRating.controller";

const router = express.Router();

// routes
router.post('/rate', rate);
router.get('/topTen', topTen);
router.get('/average', getAverageRating);
router.get('/user', getUserRating);

export default router;
