import { Router } from 'express';
const router = Router();

// Middleware to validate the request
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verifyToken';
import { checkAdmin } from '../middleware/checkAdmin';

// Controllers
import { getReview, createReview, deleteReview, updateReview } from '../controllers/review.controller';

router.route('/')
    .get(getReview)
    .post([
        body('id').optional().not().exists().withMessage('Invalid request'),
        body('start').isInt({ min: 1 }).withMessage('You must indicate stars'),
        body('review').isLength({ min: 1 }).withMessage('You must indicate review'),
    ], verifyToken, checkAdmin, createReview);

router.route('/:reviewId')
    .get(getReview)
    .delete(verifyToken, checkAdmin, deleteReview)
    .put([
        body('id').optional().not().exists().withMessage('Invalid request'),
        body('start').isInt({ min: 1 }).withMessage('You must indicate stars'),
        body('review').isLength({ min: 1 }).withMessage('You must indicate review'),
    ], verifyToken, checkAdmin, updateReview);

export default router;