import { expect, assert } from 'chai';
import { createUserController, deleteUserController, getUserController } from '../controllers/userController.js';
import { addProductController, getProductByIdController, getProductsController, deleteProductByIdController } from '../controllers/productController.js';
import mongoose from 'mongoose';

//describe('User controller', () => {
        
        // it('should return empty array if no user is added', async () => {
        //     const result = await getUserController();
        //     expect(result).to.be.an('array').that.is.empty;
            
        // });

        // it('should return array of users', async ()=> {
        //     const email = 'test123456@mail.com';
        //     const username = 'test';
        //     const password = '123456';
        //     const user = await createUserController(username,password, email,);
        //     console.log('user:', user)
        //     const result = await getUserController();
        //     assert.equal(result.length, 1);
        //     expect(result).to.be.an('array').length(1)
        // });

        // it('should delete user by id', async () => {
        //     const username =  'test';
        //     const password = '123456';
        //     const usersBeforeDeletion = await getUserController();
        //     const result = await deleteUserController({username, password});
        //     const usersAfterDeletion = await getUserController();
        //     expect(usersAfterDeletion).to.be.an('array').that.is.empty;
        //     expect(usersBeforeDeletion.length).to.equal(usersAfterDeletion.length + 1);
        // });

// });

     describe('product controller', () => {
    //     it('should return empty array if no product is added', async () => {
    //        const result = await getProductsController();
    //        expect(result).to.be.an('array').that.is.empty;

    //     });
    
    // it('should return a product added', async () => {
    //     const productToAdd = {
    //         title: 'manzana',
    //         description: 'lorem ipsum dolor sit am',
    //         code: 1,
    //         price: 100,
    //         stock: 10,
    //         thumbnail: 'fruit.jpg'
    //     };
    //     const result = await addProductController(productToAdd);
    //     //const result = await getProductsController();
    //     assert.equal('true');

    // });

    // it('should return a product by id', async () => {
    //     const id = '6449b2af4a3d816ce9765a91';
    //     const idObj = new mongoose.Types.ObjectId(id);
    //     const result = await getProductByIdController(idObj);
    //     expect(result._id.toString()).to.equal(id);

    // })

    // it('should delete product by id', async () => {
    //     const id = '6449b2af4a3d816ce9765a91';
    //     const idObj = new mongoose.Types.ObjectId(id);
    //     const productsBeforeDeletion = await getProductsController();
    //     const result = await deleteProductByIdController(idObj);
    //     const productsAfterDeletion = await getProductsController();
        
    //     expect(productsBeforeDeletion.length).to.equal(productsAfterDeletion.length + 1);

    // })
});