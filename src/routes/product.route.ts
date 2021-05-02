import { Router } from 'express';
const router = Router();

// Middleware to validate the request
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verifyToken';
import { checkAdmin } from '../middleware/checkAdmin';

// Controllers
import { getProducts, createProduct, getProduct, deleteProduct, updateProduct } from '../controllers/product.controller';

router.route('/')
    .get(getProducts)
    .post([
        body('id').optional().not().exists().withMessage('Invalid request'),
        body('name').isLength({ min: 1 }).withMessage('You must indicate a name'),
        body('brand').isLength({ min: 1 }).withMessage('You must indicate a brand'),
        body('description').isLength({ min: 1 }).withMessage('You must indicate a description'),
        body('size').isLength({ min: 1 }).withMessage('You must indicate a size'),
        body('color').isLength({ min: 1 }).withMessage('You must indicate a color'),
        body('price').isFloat().withMessage('You must indicate a price'),
        body('quantity').isInt({ min: 1 }).withMessage('You must indicate a quantity'),
    ], verifyToken, checkAdmin, createProduct);

router.route('/:productId')
    .get(getProduct)
    .delete(verifyToken, checkAdmin, deleteProduct)
    .put([
        body('id').optional().not().exists().withMessage('Invalid request'),
        body('item_id').optional().not().exists().withMessage('Invalid request'),
        body('name').isLength({ min: 1 }).withMessage('You must indicate a name'),
        body('brand').isLength({ min: 1 }).withMessage('You must indicate a brand'),
        body('description').optional().isLength({ min: 1 }).withMessage('You must indicate a description'),
        body('size').isLength({ min: 1 }).withMessage('You must indicate a size'),
        body('color').isLength({ min: 1 }).withMessage('You must indicate a color'),
        body('price').optional().isFloat().withMessage('You must indicate a price'),
        body('quantity').optional().isInt().withMessage('You must indicate a quantity'),
    ], verifyToken, checkAdmin, updateProduct);

export default router;