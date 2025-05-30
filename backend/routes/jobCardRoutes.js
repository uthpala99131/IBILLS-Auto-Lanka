import express from 'express';
import {
  createJobCard,
  getAllJobCards,
  getJobCardById,
  updateJobCard,
  updateServiceStatus,
  generateBill,
  addReview,
  getAnalytics
} from '../controllers/jobCardController.js';

const router = express.Router();

router.post('/', createJobCard);
router.get('/', getAllJobCards);
router.get('/analytics', getAnalytics);
router.get('/:id', getJobCardById);
router.put('/:id', updateJobCard);
router.put('/:id/generate-bill', generateBill);
router.post('/update-service-status', updateServiceStatus);
router.post('/add-review', addReview);

export default router;