const express = require( 'express' );
const {addProductController, getProductsController, getProductByIdController, deleteProductController } = require('../controllers/productController');
const { faker } = require('@faker-js/faker');
const { mockProducts } = require('../class/mockClass');
faker.locate = 'es';
const { Router } = express;
const passport = require('passport');
require('../DB/config/auth');
const prodRouter = Router();
const { fork } = require('child_process');
const logger = require('../logger/logger');

prodRouter.use(passport.initialize());
prodRouter.use(passport.session());


//get all products
prodRouter.get('/', async ( req, res ) => {
    const allProducts = await getProductsController();
    res.render('form', {product: allProducts, productExist: true});

});

//get products by id
prodRouter.get('/:id', async ( req, res ) => {
    const id = req.params.id;
    const product = await getProductByIdController(id);
    product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})  ;

});

//post product
prodRouter.post('/productos', async (req, res) => {
    const productToAdd = await req.body;
    await addProductController(productToAdd);
    res.redirect('/');
  });

//update product
prodRouter.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const  replace  = req.body;

    if(await addProductController( id )){
        res.send({ message: 'producto modificado', product: replace});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
    
});

//delete product
prodRouter.delete('/:id', async ( req, res ) => {
    const { id } = req.params;

    if (await deleteProductController(id)) {
        res.send({ message: 'producto borrado'});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
});

prodRouter.get('/productos-test', (req, res) => {
  const products = mockProducts.getArray();
  logger.info(products);
  res.json(products);
});

/* apirandoms */

prodRouter.get('/api/randoms', (req, res) => {
  const cant = req.query.cant || 100000000;
  const child = fork('./randoms.js');
  child.send(cant);
  child.on('message', (data) => {
    res.json(data);
  });
});


module.exports = prodRouter;