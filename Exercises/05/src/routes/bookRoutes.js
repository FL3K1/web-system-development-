import { Router } from 'express';
import { getBooks, createBook, getBookById, deleteBook } from '../controllers/bookController.js';

const router = Router();

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);

export default router;