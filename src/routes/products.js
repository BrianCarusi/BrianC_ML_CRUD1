// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const upload = require('../middleware/upload')

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/', upload.single('image'), productsController.store);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/', productsController.update);


/*** DELETE ONE PRODUCT***/
router.delete('/:id', productsController.destroy);


module.exports = router;
