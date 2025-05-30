const express = require('express');
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.route('/')
  .get(serviceController.getServices);

// Protected admin routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/')
  .post(serviceController.createService);

router.route('/:id')
  .put(serviceController.updateService)
  .delete(serviceController.deleteService);

router.post('/seed', serviceController.seedServices);

module.exports = router;