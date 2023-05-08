import {addProductController, getAllProductsController, getProductByIdController, deleteProductByIdController } from '../controllers/productController.js';
import passport from 'koa-passport';
import '../DB/config/auth.js';

import Router from '@koa/router';
const prodRouter =  new Router({ prefix: '/products'});

prodRouter.use(passport.initialize());
prodRouter.use(passport.session());


//get all products
prodRouter.get('/', async ( ctx ) => {
    const allProducts = await getAllProductsController();
    ctx.body = allProducts;
});

//get products by id
prodRouter.get('/:id', async (ctx) => {
    const id = req.params.id;
    const product = await getProductByIdController(id);
    product ? ctx.body = product
    : ctx.status = 404  ;

});

//post product
prodRouter.post('/productos', async (ctx) => {
    const productToAdd = await ctx.request.body;
    await addProductController(productToAdd);
    ctx.body = productToAdd;

  });

//update product
prodRouter.put('/:id', async ( ctx) => {
    const id = ctx.params.id;
    const  replace  = ctx.body;
    const productToReplace = await getProductByIdController(id)

    if(productToReplace) {
      await addProductController( id )
        ctx.body = replace;
      } else {
        ctx.status = 404
      };
    
});

//delete product
prodRouter.delete('/:id', async ( ctx ) => {
    const { id } = ctx.params;

    if (await deleteProductByIdController(id)) {
        ctx.body = 'product deleted'
      } else {
        ctx.status = 404
      };
});

export default prodRouter;