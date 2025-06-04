// routes/sparePartRoutes.js
const express = require('express');
const sparePartController = require('../controllers/sparePartController');

const router = express.Router();



// Admin-only routes
router.route('/').post( sparePartController.createSparePart);
router.route('/:id')
  .put( sparePartController.updateSparePart)
  .delete( sparePartController.deleteSparePart);

// Public routes
router.route('/').get(sparePartController.getSpareParts);
router.route('/:id').get(sparePartController.getSparePart);

module.exports = router;