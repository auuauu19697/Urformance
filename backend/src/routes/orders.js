'use strict';

const { Router } = require('express');
const upload = require('../middleware/upload');
const { createOrder } = require('../controllers/orderController');

const router = Router();

/**
 * POST /api/orders
 * Accepts multipart/form-data: slip (image) + order (JSON string)
 */
router.post('/', upload.single('slip'), createOrder);

module.exports = router;
