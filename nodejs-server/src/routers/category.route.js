const express = require('express');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', categoryController.index);
router.get('/:id', categoryController.detail);
router.get('/:id/product', categoryController.productDetail);

module.exports = router;