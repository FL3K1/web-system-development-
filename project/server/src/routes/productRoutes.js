import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js'; 
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Cualquiera puede ver (Público)
router.get('/', getAllProducts);

// Solo Admin puede tocar los datos
router.post('/', verifyToken, verifyAdmin, upload.array('images', 5), createProduct);
router.put('/:id', verifyToken, verifyAdmin, upload.array('images', 5), updateProduct); 
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;