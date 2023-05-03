import { expect, assert } from 'chai';
import { createUserController, deleteUserController, getAllUsersController, getUserControllerByUsername } from '../controllers/userController.js';
import { addProductController, getProductByIdController, getProductsController, deleteProductByIdController } from '../controllers/productController.js';
import mongoose from 'mongoose';

describe('User controller', () => {
        
        // it('should return empty array if no user is added', async () => {
        //     const result = await getAllUsersController();
        //     expect(result).to.be.an('array').that.is.empty;
            
        // });

        // it('should return array of users', async ()=> {
        //     const result = await getAllUsersController();
        //     console.log(result)
        //     expect(result).to.be.an('array')
        // });
                // it('should add a user', async () => {
                //         const user = {
                //                 email: 'pepe@mail.com ',
                //                 name: 'pepe',
                //                 username: 'pepe',
                //                 password: '123',
                //                 age: 22,
                //                 address: 'asdad',
                //                 avatar: 'aasdasdasd',
                //                 cart: [],
                //         }
                //         const result = await createUserController(user)
                //         console.log(result)
                // })

                // it('should delete user by id', async () => {
                //         const users = await getAllUsersController();
                //         const id = users[0]._id;
                      
                //         const usersBeforeDeletion = await getAllUsersController();
                      
                //         const result = await deleteUserController(id);
                      
                //         const usersAfterDeletion = await getAllUsersController();
                      
                //         expect(usersAfterDeletion.length).to.equal(usersBeforeDeletion.length - 1);
                //       });
        // it('should return user by username', async () => {
        //         const username = 'pedro';
        //         const result = await getUserControllerByUsername(username);
        //         console.log(result)
        //         expect(result.username).to.be.equal(username);
        // })

  });

      describe('product controller', () => {
//         it('should return empty array if no product is added', async () => {
//            const result = await getProductsController();
//            expect(result).to.be.an('array').that.is.empty;

//         });
    
//     it('should return a product added', async () => {
//         const productToAdd = {
//             title: 'manzana',
//             description: 'lorem ipsum dolor sit am',
//             code: 1,
//             price: 100,
//             stock: 10,
//             thumbnail: 'fruit.jpg'
//         };
//         await addProductController(productToAdd);
//         const result = await getProductsController();
//         expect(result).to.be.an('array').length(1)


//      });

   // it('should return a product by id', async () => {
        //mongo
                // const id = '6449b2af4a3d816ce9765a91';
                // const idObj = new mongoose.Types.ObjectId(id);
                // const result = await getProductByIdController(id);
                // expect(result._id.toString()).to.equal(id);
        //memory
               // const id = '2b72f212-1965-486d-8c78-8bc0820a0b12';
               // const result = await getProductByIdController(id)
               // console.log(result)
               // expect(result._id.toString()).to.equal(id);

    //});

    // it('should delete product by id', async () => {
    //     const id = '6449b2af4a3d816ce9765a91';
    //     const idObj = new mongoose.Types.ObjectId(id);
    //     const productsBeforeDeletion = await getProductsController();
    //     const result = await deleteProductByIdController(idObj);
    //     const productsAfterDeletion = await getProductsController();
        
    //     expect(productsBeforeDeletion.length).to.equal(productsAfterDeletion.length + 1);

    // })
});